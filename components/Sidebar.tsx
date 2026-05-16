"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, Users, Folder, Crown, Plus, X, User } from "lucide-react";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", isActive: pathname === "/dashboard" },
    { name: "Studio Ai", icon: Sparkles, href: "/dashboard/studio", isActive: pathname.includes("/dashboard/studio") },
    { name: "Ruang Komunitas", icon: Users, href: "/dashboard/community", isActive: pathname.includes("/dashboard/community") },
    { name: "Arsip", icon: Folder, href: "/dashboard/archive", isActive: pathname.includes("/dashboard/archive") },
    { name: "Leaderboard", icon: Crown, href: "/dashboard/leaderboard", isActive: pathname.includes("/dashboard/leaderboard") },
    { name: "Profil Saya", icon: User, href: "/dashboard/profile", isActive: pathname.includes("/dashboard/profile") },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-zinc-100 flex flex-col shrink-0">
      {/* Brand & Logo */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <Image
            src="/images/Logo potensia2 .png"
            alt="Logo Potensia"
            width={40}
            height={40}
            className="w-10 h-10 object-contain shrink-0"
            priority
          />
          <div className="flex flex-col">
            <span className="text-[1.1rem] font-bold text-[#00a870] leading-none">Potensia</span>
            <span className="text-[0.65rem] text-slate-500 mt-1">AI untuk Pendidik</span>
          </div>
        </Link>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden p-1.5 -mr-2 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Action Button */}
      <div className="px-6 mb-6">
        <Link href="/dashboard/studio" className="w-full flex items-center justify-center gap-2 bg-[#00a870] hover:bg-[#009260] transition-colors text-white text-sm font-medium py-2.5 rounded-lg">
          <Plus className="w-4 h-4" />
          Buat RPP Baru
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.isActive
                  ? "bg-[#e8faf4] text-[#00a870] border-l-4 border-[#00a870] -ml-4 pl-7"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
