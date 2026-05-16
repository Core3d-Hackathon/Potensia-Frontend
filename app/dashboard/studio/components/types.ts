// app/dashboard/studio/components/types.ts
import { Jenjang, Fase, CapaianSubject } from "@/app/hooks/useCurriculum";

export interface StudioState {
  activeTags: string[];
  facilities: {
    internet: boolean;
    projector: boolean;
    lab: boolean;
    electricity: boolean;
  };
  learningStyles: string[];
  assessments: string[];
  // Tambahan untuk Form API
  materi: string;
  isuLokal: string;
  alokasiWaktu: string;
  modelPembelajaran: string;
  satuanPendidikan: string;
}

export interface StudioHandlers {
  handleAddTag: (label: string) => void;
  handleRemoveTag: (tag: string) => void;
  toggleFacility: (key: keyof StudioState["facilities"]) => void;
  toggleLearningStyle: (style: string) => void;
  toggleAssessment: (type: string) => void;
  // Handler Input
  setMateri: (val: string) => void;
  setIsuLokal: (val: string) => void;
  setAlokasiWaktu: (val: string) => void;
  setModelPembelajaran: (val: string) => void;
  setSatuanPendidikan: (val: string) => void;
}

export type StepProps = StudioState &
  StudioHandlers & {
    onNext: () => void;
    onPrev: () => void;
    // Data Kurikulum
    jenjangList: Jenjang[];
    faseList: Fase[];
    subjectList: string[];
    capaianData: CapaianSubject | null;
    selectedJenjang: string;
    setSelectedJenjang: (v: string) => void;
    selectedFase: string;
    setSelectedFase: (v: string) => void;
    selectedSubject: string;
    setSelectedSubject: (v: string) => void;
    isLoadingCurriculum: boolean;
    // Data Hasil AI
    generatedData: any;
    isGenerating: boolean;
  };
