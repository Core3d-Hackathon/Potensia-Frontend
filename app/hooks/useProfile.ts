// app/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  points: number;
}

export const useProfile = () => {
  const { isLoaded, userId, getToken } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !userId) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        setIsLoadingProfile(true);
        const token = await getToken();
        const response = await fetch(`${baseUrl}/v1/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();
        if (json.success && json.data.user) {
          setUser(json.data.user);
        }
      } catch (error) {
        console.error("Gagal memuat data profil dari backend:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserData();
  }, [isLoaded, userId, getToken, baseUrl]);

  return { user, isLoadingProfile };
};