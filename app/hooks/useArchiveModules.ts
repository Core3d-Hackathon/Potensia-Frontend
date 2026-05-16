import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export interface Module {
  id: string;
  judul_modul: string;
  jenjang: string;
  fase_kelas: string;
  mapel: string;
  materi: string;
  kategori_wilayah: string;
  status: "DRAFT" | "PUBLISHED";
  content_json: {
    identitas_modul?: {
      satuan_pendidikan?: string;
      fase_kelas?: string;
      mata_pelajaran?: string;
      alokasi_waktu?: string;
    };
    langkah_pembelajaran?: Array<{
      pertemuan_ke: number;
      kegiatan_awal?: string[];
      kegiatan_inti?: string[];
      kegiatan_penutup?: string[];
    }>;
    asesmen?: {
      formatif?: string[];
      rubrik?: string[];
    };
    lampiran_lkpd?: string[];
  };
  created_at?: string;
  updated_at?: string;
  author?: {
    id: string;
    name: string;
    email: string;
    image_url?: string;
  };
}

export function useArchiveModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const fetchModules = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getToken();
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      const response = await fetch(`${baseUrl}/v1/modules`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch modules: ${response.status}`);
      }

      const result = await response.json();
      setModules(result.data || []);
    } catch (err: any) {
      console.error("[useArchiveModules] Error:", err);
      setError(err.message || "Failed to fetch modules");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return { modules, isLoading, error, refetch: fetchModules };
}

export async function fetchModuleById(id: string, token?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

    const response = await fetch(`${baseUrl}/v1/modules/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch module: ${response.status}`);
    }

    const result = await response.json();
    return result.data as Module;
  } catch (err: any) {
    console.error("[fetchModuleById] Error:", err);
    throw err;
  }
}
