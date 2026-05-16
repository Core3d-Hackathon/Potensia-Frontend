"use client";

import { Sparkles } from "lucide-react";

interface StudioFooterProps {
  step: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  isGenerating?: boolean;
}

export function StudioFooter({
  step,
  onPrevClick,
  onNextClick,
  isGenerating = false,
}: StudioFooterProps) {
  return (
    <div className="pt-8 mt-auto border-t border-zinc-100 flex items-center justify-between">
      {step > 1 ? (
        <button
          onClick={onPrevClick}
          disabled={isGenerating}
          className="bg-[#e8faf4] hover:bg-[#d1f4e6] text-[#00a870] px-8 py-3.5 rounded-xl font-bold transition-all text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
      ) : (
        <div></div> /* Placeholder to push Next button to right */
      )}

      {step < 4 && (
        <button
          onClick={onNextClick}
          disabled={isGenerating}
          className="bg-[#00a870] hover:bg-[#009260] text-white px-12 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md shadow-teal-500/20 text-sm tracking-wide disabled:opacity-80 disabled:cursor-wait"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              Memproses...
            </>
          ) : (
            "Lanjut"
          )}
        </button>
      )}
    </div>
  );
}
