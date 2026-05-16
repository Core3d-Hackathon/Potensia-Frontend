// app/hooks/useCurriculum.ts
import { useState, useEffect } from "react";

export interface Jenjang {
  key: string;
  label: string;
  faseCodes: string[];
  grades: string[];
}

export interface Fase {
  code: string;
  label: string;
  jenjangKey: string;
  jenjangLabel: string;
  grades: string[];
  subjects: string[];
}

export interface CapaianSubject {
  name: string;
  capaianKeys: string[];
  capaian: Record<string, string>;
}

export const useCurriculum = () => {
  const [jenjangList, setJenjangList] = useState<Jenjang[]>([]);
  const [faseList, setFaseList] = useState<Fase[]>([]);
  const [subjectList, setSubjectList] = useState<string[]>([]);
  const [capaianData, setCapaianData] = useState<CapaianSubject | null>(null);

  // State untuk menyimpan pilihan aktif dari dropdown UI
  const [selectedJenjang, setSelectedJenjang] = useState<string>("");
  const [selectedFase, setSelectedFase] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  // 1. Ambil list seluruh jenjang saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchJenjang = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/v1/curriculum/jenjang`);
        const json = await res.json();
        if (json.success) setJenjangList(json.data.jenjang);
      } catch (err) {
        console.error("Gagal memuat data jenjang:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJenjang();
  }, [baseUrl]);

  // 2. Ambil list Fase otomatis ketika Jenjang dipilih/berubah
  useEffect(() => {
    if (!selectedJenjang) {
      setFaseList([]);
      return;
    }
    const fetchFase = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${baseUrl}/v1/curriculum/jenjang/${selectedJenjang}/fase`,
        );
        const json = await res.json();
        if (json.success) setFaseList(json.data.fase);
      } catch (err) {
        console.error("Gagal memuat data fase:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFase();
    // Reset dropdown anak-anaknya agar tidak menyimpan sisa pilihan sebelumnya
    setSelectedFase("");
    setSubjectList([]);
    setSelectedSubject("");
    setCapaianData(null);
  }, [selectedJenjang, baseUrl]);

  // 3. Ambil list Mata Pelajaran otomatis ketika Fase dipilih/berubah
  useEffect(() => {
    if (!selectedFase) {
      setSubjectList([]);
      return;
    }
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${baseUrl}/v1/curriculum/fase/${selectedFase}/subjects`,
        );
        const json = await res.json();
        if (json.success) setSubjectList(json.data.subjects);
      } catch (err) {
        console.error("Gagal memuat data mata pelajaran:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
    setSelectedSubject("");
    setCapaianData(null);
  }, [selectedFase, baseUrl]);

  // 4. Ambil Elemen Capaian Pembelajaran ketika Mata Pelajaran dipilih
  useEffect(() => {
    if (!selectedFase || !selectedSubject) {
      setCapaianData(null);
      return;
    }
    const fetchCapaian = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${baseUrl}/v1/curriculum/fase/${selectedFase}/subjects/${encodeURIComponent(selectedSubject)}/capaian`,
        );
        const json = await res.json();
        if (json.success) setCapaianData(json.data.subject);
      } catch (err) {
        console.error("Gagal memuat data capaian:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCapaian();
  }, [selectedFase, selectedSubject, baseUrl]);

  return {
    jenjangList,
    faseList,
    subjectList,
    capaianData,
    selectedJenjang,
    setSelectedJenjang,
    selectedFase,
    setSelectedFase,
    selectedSubject,
    setSelectedSubject,
    isLoadingCurriculum: isLoading,
  };
};
