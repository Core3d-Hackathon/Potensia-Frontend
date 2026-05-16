"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface SaveModuleResponse {
  success: boolean;
  message: string;
  data?: any;
}

export function useSaveModule() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const saveModule = async (
    moduleData: any,
    options: { status?: "DRAFT" | "PUBLISHED"; shareCommunity?: boolean } = {},
  ): Promise<SaveModuleResponse> => {
    const { status = "DRAFT", shareCommunity = false } = options;

    try {
      setIsSaving(true);
      setError(null);

      if (!moduleData) {
        throw new Error("Data modul kosong");
      }

      const token = await getToken();
      if (!token) {
        throw new Error("Token autentikasi tidak ditemukan. Coba login ulang.");
      }

      const payload = {
        judul_modul: `Modul Ajar: ${moduleData?.identitas_modul?.mata_pelajaran || "Pembelajaran"}`,
        jenjang: moduleData?.identitas_modul?.satuan_pendidikan || "Umum",
        fase_kelas: moduleData?.identitas_modul?.fase_kelas || "Umum",
        mapel: moduleData?.identitas_modul?.mata_pelajaran || "Mata Pelajaran",
        materi: moduleData?.identitas_modul?.mata_pelajaran || "Materi Umum",
        kategori_wilayah: "Umum",
        content_json: moduleData,

        // Status selalu mengikuti parameter dari caller
        // Jangan pernah override jadi PUBLISHED otomatis
        status,
      };

      console.log("[useSaveModule] Payload:", JSON.stringify(payload, null, 2));

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const response = await fetch(`${baseUrl}/v1/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("[useSaveModule] Response status:", response.status);

      let json;
      try {
        json = await response.json();
      } catch {
        throw new Error(
          `Server mengembalikan non-JSON (status ${response.status})`,
        );
      }

      console.log("[useSaveModule] Response body:", json);

      if (!response.ok || !json.success) {
        const message =
          json?.message || json?.error || `HTTP ${response.status}`;
        throw new Error(message);
      }

      return {
        success: true,
        message: "✅ Modul berhasil disimpan ke database!",
        data: json.data,
      };
    } catch (err: any) {
      const errorMessage = err?.message || "Terjadi kesalahan saat menyimpan";
      setError(errorMessage);

      console.error("[useSaveModule] Error:", err);

      return {
        success: false,
        message: `❌ Gagal menyimpan: ${errorMessage}`,
      };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    saveModule,
    isSaving,
    error,
  };
}
