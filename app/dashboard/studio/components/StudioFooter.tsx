"use client";

interface StudioFooterProps {
  step: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export function StudioFooter({
  step,
  onPrevClick,
  onNextClick,
}: StudioFooterProps) {
  return (
    <div className="pt-8 border-t border-zinc-100 flex items-center justify-between">
      {step > 1 ? (
        <button
          onClick={onPrevClick}
          className="bg-[#e8faf4] hover:bg-[#d1f4e6] text-[#00a870] px-8 py-3.5 rounded-xl font-bold transition-all text-sm tracking-wide"
        >
          Sebelumnya
        </button>
      ) : (
        <div></div>
      )}

      {step < 4 && (
        <button
          onClick={onNextClick}
          className="bg-[#00a870] hover:bg-[#009260] text-white px-12 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md shadow-teal-500/20 text-sm tracking-wide"
        >
          Lanjut
        </button>
      )}
    </div>
  );
}
