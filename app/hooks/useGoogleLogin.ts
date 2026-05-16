import { useEffect, useState, useRef } from "react";
import { useClerk, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useGoogleLogin = () => {
  const clerk = useClerk();
  const { isLoaded: isAuthLoaded, userId, getToken } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Gunakan useRef sebagai jangkar pengunci agar tidak terjadi pemanggilan ganda
  const hasSynced = useRef(false);

  // 1. Fungsi Login dengan Google
  const handleGoogleLogin = async () => {
    console.log("1. Tombol ditekan!");

    if (!clerk || !clerk.client) {
      console.warn("2. Clerk belum siap, harap tunggu sebentar.");
      return;
    }

    try {
      console.log("3. Clerk siap. Memulai redirect ke Google...");
      await clerk.client.signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
      console.log("4. Perintah redirect berhasil dikirim!");
    } catch (error) {
      console.error("X. Gagal melakukan redirect ke Google:", error);
    }
  };

  // 2. Fungsi Sinkronisasi Sesi ke Backend Express
  const syncUserToBackend = async () => {
    // Kunci di awal agar jika terpanggil dua kali, fungsi langsung berhenti
    if (hasSynced.current) return;
    hasSynced.current = true;

    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/v1/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Gagal terhubung ke server");

      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Backend sync error:", error);
      setSyncMessage("Terjadi kesalahan saat memuat data.");
      setIsLoading(false);

      // 🛠️ PERBAIKAN DI SINI: Buka kembali kuncian jika terjadi error!
      hasSynced.current = false;
    }
  };

  // 3. Fitur Logout Baru - Murni Sisi Frontend Saja! (Anti-Stuck Version)
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      console.log("Memulai proses logout murni dari frontend...");

      console.log("Membersihkan sesi Clerk...");
      // Jalankan signOut dari Clerk
      await clerk.signOut();

      // Reset status kunci ref agar jika login lagi tidak terkunci
      hasSynced.current = false;

      console.log("Logout berhasil, memaksa pengalihan halaman secara bersih.");

      // Ganti router.push dengan window.location.href untuk hard-reset state aplikasi
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal melakukan proses logout lokal:", error);
      setIsLoading(false); // Kembalikan tombol jika gagal agar tidak stuck
    }
  };
  useEffect(() => {
    if (isAuthLoaded && userId && !hasSynced.current) {
      // Hilangkan pemanggilan setState secara sinkron dengan membungkusnya di setTimeout
      setTimeout(() => {
        setIsLoading(true);
        setSyncMessage("Menyiapkan ruang kerjamu...");
      }, 0);

      syncUserToBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoaded, userId]);

  return {
    handleGoogleLogin,
    handleLogout,
    isLoading,
    syncMessage,
  };
};
