// Utility untuk transform ATP ke struktur ModulAjar sesuai backend schema

interface LangkahPembelajaran {
  pertemuan_ke: number;
  kegiatan_awal: string[];
  kegiatan_inti: string[];
  kegiatan_penutup: string[];
}

interface ModulAjarData {
  identitas_modul: {
    satuan_pendidikan: string;
    fase_kelas: string;
    mata_pelajaran: string;
    alokasi_waktu: string;
  };
  langkah_pembelajaran: LangkahPembelajaran[];
  asesmen: {
    formatif: string[];
    rubrik: string[];
  };
  lampiran_lkpd: string[];
}

export function transformATPToModul(
  atp: any[],
  identitas: {
    satuan_pendidikan: string;
    fase_kelas: string;
    mata_pelajaran: string;
    alokasi_waktu: string;
  },
): ModulAjarData {
  const langkahPembelajaran: LangkahPembelajaran[] = atp.map(
    (pertemuan, idx) => ({
      pertemuan_ke: idx + 1,
      kegiatan_awal: [
        `Guru membuka pembelajaran dengan salam dan doa`,
        `Guru menyampaikan tujuan pembelajaran ${pertemuan.materi_pokok || "materi"}`,
        `Apersepsi: menghubungkan pengalaman siswa dengan materi`,
      ],
      kegiatan_inti: [
        `Siswa mempelajari ${pertemuan.materi_pokok || "materi"}`,
        pertemuan.tujuan_pembelajaran
          ? `Mencapai tujuan: ${pertemuan.tujuan_pembelajaran[0]}`
          : "Kegiatan inti pembelajaran",
        `Interaksi dan diskusi mendalam tentang topik`,
      ],
      kegiatan_penutup: [
        `Refleksi pembelajaran tentang pemahaman materi`,
        `Penyimpulan bersama dan penguatan konsep`,
        `Tugas mandiri dan pengumuman untuk pertemuan selanjutnya`,
      ],
    }),
  );

  return {
    identitas_modul: identitas,
    langkah_pembelajaran: langkahPembelajaran,
    asesmen: {
      formatif: [
        "Observasi perilaku selama pembelajaran",
        "Tanya jawab lisan tentang pemahaman",
        "Aktivitas praktik/diskusi kelompok",
      ],
      rubrik: [
        "Pemahaman Konsep (0-25)",
        "Keterampilan Aplikasi (0-25)",
        "Kolaborasi & Sikap (0-25)",
        "Komunikasi & Presentasi (0-25)",
      ],
    },
    lampiran_lkpd: [
      `Lembar Kerja Peserta Didik untuk memperdalam pemahaman ${identitas.mata_pelajaran}`,
      `Panduan observasi lapangan (jika diperlukan)`,
      `Rubrik penilaian performa siswa`,
      `Lembar catatan refleksi pembelajaran`,
    ],
  };
}
