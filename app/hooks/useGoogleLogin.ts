import { useEffect, useState } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useGoogleLogin = () => {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { isLoaded: isAuthLoaded, userId, getToken } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Fungsi untuk trigger popup Google
  const handleGoogleLogin = () => {
    if (!isSignInLoaded) return;

    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  // Fungsi internal untuk sync ke backend
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

  // Otomatis jalan ketika Clerk mendeteksi user sudah login
  useEffect(() => {
    if (isAuthLoaded && userId) {
      syncUserToBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoaded, userId]);

  // Kembalikan data dan fungsi yang dibutuhkan oleh UI
  return {
    handleGoogleLogin,
    isLoading,
    syncMessage,
  };
};
