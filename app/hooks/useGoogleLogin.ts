import { useEffect, useState } from "react";
import { useClerk, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useGoogleLogin = () => {
  // KITA GANTI useSignIn() MENJADI useClerk()
  const clerk = useClerk();
  const { isLoaded: isAuthLoaded, userId, getToken } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    console.log("1. Tombol ditekan!");

    // Cek apakah mesin utama Clerk sudah siap
    if (!clerk || !clerk.client) {
      console.warn("2. Clerk belum siap, harap tunggu sebentar.");
      return;
    }

    try {
      console.log("3. Clerk siap. Memulai redirect ke Google...");

      // Menggunakan clerk.client.signIn adalah cara paling stabil dan langsung
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

  const syncUserToBackend = async () => {
    try {
      setIsLoading(true);
      setSyncMessage("Menyiapkan ruang kerjamu...");

      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/v1/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Gagal terhubung ke server");

      router.push("/dashboard");
    } catch (error) {
      console.error("Backend sync error:", error);
      setSyncMessage("Terjadi kesalahan saat memuat data.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthLoaded && userId) {
      syncUserToBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoaded, userId]);

  return {
    handleGoogleLogin,
    isLoading,
    syncMessage,
  };
};
