"use client";

interface StudioStepperProps {
  currentStep: number;
}

const STEPS = [
  { number: 1, label: "Informasi Umum" },
  { number: 2, label: "Tujuan Pembelajaran (TP)" },
  { number: 3, label: "Alur Tujuan Pembelajaran (ATP)" },
  { number: 4, label: "Modul Ajar" },
];

export function StudioStepper({ currentStep }: StudioStepperProps) {
  return (
    <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider relative overflow-x-auto hide-scrollbar">
      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-100 -z-10"></div>

      {STEPS.map((step) => (
        <div
          key={step.number}
          className="flex items-center gap-2 bg-white px-4 first:pr-4 first:pl-0 last:pl-4 last:pr-0"
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
              currentStep >= step.number
                ? "bg-[#00a870]"
                : "bg-zinc-100 text-zinc-400"
            }`}
          >
            {step.number}
          </div>
          <span
            className={
              currentStep >= step.number ? "text-zinc-900" : "text-zinc-400"
            }
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
