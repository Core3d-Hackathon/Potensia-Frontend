"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface SaveModuleResponse {
  success: boolean;
  message: string;
  data?: {
    id?: string;
    [key: string]: unknown;
  };
}

export interface ModuleSaveMetadata {
  jenjang?: string;
  faseKelas?: string;
  mapel?: string;
  materi?: string;
  kategoriWilayah?: string;
  asalSekolah?: string;
  alokasiWaktu?: string;
}

interface ModuleData {
  identitas_modul?: {
    satuan_pendidikan?: string;
    fase_kelas?: string;
    mata_pelajaran?: string;
    alokasi_waktu?: string;
  };
  langkah_pembelajaran?: Array<{
    pertemuan_ke?: number;
    kegiatan_awal?: string[];
    kegiatan_inti?: string[];
    kegiatan_penutup?: string[];
    materi_pokok?: string;
  }>;
  asesmen?: {
    formatif?: string[];
    rubrik?: string[];
  };
  lampiran_lkpd?: string[];
}

interface SaveModuleApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  data?: unknown;
}

export function useSaveModule() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const saveModule = async (
    moduleData: ModuleData,
    options: {
      status?: "DRAFT" | "PUBLISHED";
      metadata?: ModuleSaveMetadata;
    } = {},
  ): Promise<SaveModuleResponse> => {
    const { status = "DRAFT", metadata = {} } = options;

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

      const normalizedModuleData = {
        ...moduleData,
        identitas_modul: {
          ...moduleData?.identitas_modul,
          satuan_pendidikan:
            metadata.asalSekolah ||
            moduleData?.identitas_modul?.satuan_pendidikan ||
            "Sekolah Dasar",
          fase_kelas:
            metadata.faseKelas || moduleData?.identitas_modul?.fase_kelas || "Umum",
          mata_pelajaran:
            metadata.mapel ||
            moduleData?.identitas_modul?.mata_pelajaran ||
            "Mata Pelajaran",
          alokasi_waktu:
            metadata.alokasiWaktu ||
            moduleData?.identitas_modul?.alokasi_waktu ||
            "-",
        },
      };
      const firstLearningStep = normalizedModuleData?.langkah_pembelajaran?.[0];
      const derivedMateri =
        metadata.materi ||
        firstLearningStep?.materi_pokok ||
        firstLearningStep?.kegiatan_inti?.[0] ||
        firstLearningStep?.kegiatan_awal?.[0] ||
        normalizedModuleData.identitas_modul?.mata_pelajaran ||
        "Materi Umum";

      const payload = {
        judul_modul: `Modul Ajar: ${metadata.mapel || normalizedModuleData.identitas_modul?.mata_pelajaran || "Pembelajaran"}${metadata.materi ? ` - ${metadata.materi}` : ""}`,
        jenjang: metadata.jenjang || "Umum",
        fase_kelas: metadata.faseKelas || normalizedModuleData.identitas_modul?.fase_kelas || "Umum",
        mapel:
          metadata.mapel ||
          normalizedModuleData.identitas_modul?.mata_pelajaran ||
          "Mata Pelajaran",
        materi:
          derivedMateri,
        kategori_wilayah: metadata.kategoriWilayah || "Umum",
        content_json: normalizedModuleData,

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

      let json: SaveModuleApiResponse;
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
        data:
          json.data && typeof json.data === "object"
            ? (json.data as SaveModuleResponse["data"])
            : undefined,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
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
