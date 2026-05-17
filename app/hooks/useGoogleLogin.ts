import { useEffect, useRef, useState } from "react";
import { useClerk, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useGoogleLogin = () => {
  const clerk = useClerk();
  const { isLoaded: isAuthLoaded, userId, getToken } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Gunakan useRef sebagai jangkar pengunci agar tidak terjadi pemanggilan ganda.
  const hasSynced = useRef(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const wait = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

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
    if (hasSynced.current) return;
    hasSynced.current = true;

    try {
      let token: string | null = null;

      // Clerk kadang belum langsung mengeluarkan token setelah redirect OAuth.
      for (let attempt = 0; attempt < 3; attempt += 1) {
        token = await getToken();
        if (token) break;
        await wait(300 * (attempt + 1));
      }

      if (!token) {
        throw new Error("Token autentikasi belum tersedia. Silakan coba lagi.");
      }

      const response = await fetch(`${baseUrl}/v1/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let backendMessage = "";

        try {
          const errorBody = (await response.json()) as { message?: string };
          backendMessage = errorBody.message ?? "";
        } catch {
          // Abaikan jika backend tidak mengirim JSON.
        }

        throw new Error(
          backendMessage ||
            `Sinkronisasi backend gagal (${response.status} ${response.statusText})`,
        );
      }

      setSyncMessage(null);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Backend sync error:", error);
      setSyncMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memuat data.",
      );
      setIsLoading(false);

      // Buka kembali kuncian agar user bisa mencoba sinkronisasi lagi.
      hasSynced.current = false;
    }
  };

  // 3. Logout murni sisi frontend.
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      console.log("Memulai proses logout murni dari frontend...");

      console.log("Membersihkan sesi Clerk...");
      await clerk.signOut();

      hasSynced.current = false;

      console.log("Logout berhasil, memaksa pengalihan halaman secara bersih.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal melakukan proses logout lokal:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthLoaded && userId && !hasSynced.current) {
      setTimeout(() => {
        setIsLoading(true);
        setSyncMessage("Menyiapkan ruang kerjamu...");
      }, 0);

      void syncUserToBackend();
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
