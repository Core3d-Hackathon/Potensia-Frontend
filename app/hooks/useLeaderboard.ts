import { useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

export interface LeaderboardUser {
  rank: number;
  id: string;
  clerkId: string;
  name: string;
  email: string;
  imageUrl: string | null;
  totalPoints: number;
  totalModules: number;
}

export interface MyRank {
  name: string;
  rank: number;
  totalPoints: number;
}

export const useLeaderboard = () => {
  const { getToken } = useAuth();
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [myRank, setMyRank] = useState<MyRank | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken();

      // Fetch Top 10 (Global)
      const resGlobal = await fetch(`${baseUrl}/v1/leaderboard`);
      if (resGlobal.ok) {
        const jsonGlobal = await resGlobal.json();
        setLeaders(jsonGlobal.data?.leaderboard || []);
      }

      // Fetch My Rank (Hanya jika ada token)
      if (token) {
        const resMe = await fetch(`${baseUrl}/v1/leaderboard/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resMe.ok) {
          const jsonMe = await resMe.json();
          setMyRank(jsonMe.data?.user || null);
        }
      }
    } catch (err) {
      console.error("Gagal fetch leaderboard:", err);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, getToken]);

  return { leaders, myRank, isLoading, fetchLeaderboard };
};