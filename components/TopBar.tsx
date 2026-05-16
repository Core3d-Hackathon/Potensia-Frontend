"use client";

import { Bell, Diamond, Menu, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Manfaatkan optimasi gambar bawaan Next.js
import { useGoogleLogin } from "@/app/hooks/useGoogleLogin";
// 1. Import hook profil baru kita
import { useProfile } from "@/app/hooks/useProfile";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { handleLogout, isLoading } = useGoogleLogin();

  // 2. Konsumsi data profil user dari backend
  const { user, isLoadingProfile } = useProfile();

  // Fungsi pembantu untuk membuat inisial nama jika foto profil kosong/error
  const getInitialName = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
          {/* Bagian Nama User dan Email Dinamis */}
          <div className="flex flex-col items-end max-w-[150px] sm:max-w-[200px]">
            <span className="text-zinc-900 font-bold text-sm truncate w-full text-right">
              {isLoadingProfile ? "Memuat..." : user?.name || "User Potensia"}
            </span>
            <span className="text-[0.68rem] text-zinc-500 lowercase tracking-normal font-medium truncate w-full text-right">
              {isLoadingProfile
                ? "Menghubungkan..."
                : user?.email || "guru@potensia.id"}
            </span>
          </div>

          <div className="relative group">
            {/* Bagian Render Foto Profil Dinamis */}
            <button className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden border-2 border-white shadow-sm shrink-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform group-hover:scale-105">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name || "Avatar"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Jika gambar dari Google OAuth gagal dimuat, fallback ke tampilan inisial teks
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                  {getInitialName(user?.name || "")}
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-zinc-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right group-hover:translate-y-0 translate-y-2">
              <div className="p-1.5 flex flex-col gap-0.5">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors font-medium"
                >
                  <User className="w-4 h-4" />
                  Profile Saya
                </Link>
                <div className="h-px bg-zinc-100 my-0.5 mx-2" />

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoading ? "Keluar..." : "Log out"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
