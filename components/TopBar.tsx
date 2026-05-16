import { Bell, Diamond, Menu } from "lucide-react";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-20 border-b border-zinc-200/60 bg-white flex items-center justify-between px-4 sm:px-8 shrink-0">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="text-zinc-400 hover:text-zinc-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-zinc-200" />
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-[#00a870] font-semibold text-sm">
              <Diamond className="w-3.5 h-3.5 fill-current" />
              <span>450 Poin</span>
            </div>
            <span className="text-[0.65rem] text-zinc-500 uppercase tracking-wider font-medium">Guru Inovator</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
            <div className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
              OJ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
