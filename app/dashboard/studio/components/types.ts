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
}

export interface StudioHandlers {
  handleAddTag: (label: string) => void;
  handleRemoveTag: (tag: string) => void;
  toggleFacility: (key: keyof StudioState["facilities"]) => void;
  toggleLearningStyle: (style: string) => void;
  toggleAssessment: (type: string) => void;
}

export type StepProps = StudioState &
  StudioHandlers & {
    onNext: () => void;
    onPrev: () => void;
  };
