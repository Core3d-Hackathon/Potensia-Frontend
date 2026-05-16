import { useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

export interface Author {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
}

export interface CommunityModule {
  id: string;
  judul_modul: string;
  jenjang: string;
  fase_kelas: string;
  mapel: string;
  kategori_wilayah: string;
  status?: string; // Bikin opsional
  upvote_count?: number; // 🌟 FIX: Sesuaikan dengan key JSON (upvote_count)
  author: Author;
  createdAt: string; // 🌟 FIX: Sesuaikan dengan key JSON (createdAt)
}

export const useCommunity = () => {
  const { getToken } = useAuth();
  const [modules, setModules] = useState<CommunityModule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  // Ambil daftar modul komunitas
  const fetchCommunityModules = useCallback(
    async (filters?: any) => {
      setIsLoading(true);
      setError(null);
      try {
        // Susun query parameter
        const queryParams = new URLSearchParams();
        if (filters?.search) queryParams.append("search", filters.search);
        if (filters?.mapel) queryParams.append("mapel", filters.mapel);
        if (filters?.fase_kelas)
          queryParams.append("fase_kelas", filters.fase_kelas);
        if (filters?.kategori_wilayah && filters.kategori_wilayah !== "Semua") {
          queryParams.append("kategori_wilayah", filters.kategori_wilayah);
        }

        const queryString = queryParams.toString();
        const url = `${baseUrl}/v1/community${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Gagal memuat data komunitas");
        }

        // 🌟 FIX: Ambil langsung dari json.data, tanpa perlu filter 'PUBLISHED' lagi karena endpoint /community sudah terfilter dari backend.
        const communityData = json.data || [];
        setModules(Array.isArray(communityData) ? communityData : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl],
  );

  // Fungsi Upvote
  const toggleUpvote = async (moduleId: string) => {
    try {
      const token = await getToken();
      if (!token) return alert("Silakan login untuk memberikan upvote.");

      const response = await fetch(
        `${baseUrl}/v1/community/${moduleId}/upvote`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        // Refresh data setelah upvote berhasil
        fetchCommunityModules();
      }
    } catch (err) {
      console.error("Gagal upvote:", err);
    }
  };

  return { modules, isLoading, error, fetchCommunityModules, toggleUpvote };
};
