"use client";

import Image from "next/image";
import { useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";

export default function LoginClient() {
  const { isLoaded, userId, getToken } = useAuth();
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [backendEmail, setBackendEmail] = useState<string | null>(null);

  const syncUserToBackend = async () => {
    if (!isLoaded || !userId) {
      setBackendMessage("Silakan login terlebih dahulu.");
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/v1/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message ?? "Gagal memverifikasi user");
      }

      const data = await response.json();
      setBackendEmail(data?.data?.user?.email ?? null);
      setBackendMessage("Sinkronisasi berhasil. Selamat datang!");
    } catch (error) {
      setBackendMessage(
        error instanceof Error ? error.message : "Gagal sinkronisasi",
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-zinc-950 font-sans overflow-hidden">
      {/* Left Column - Branding & Sneak Peek */}
      <div className="w-full lg:w-[55%] h-full relative overflow-hidden flex flex-col justify-center p-6 sm:p-10 lg:p-16 xl:p-20 bg-teal-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a4a44] via-teal-700 to-emerald-600 opacity-95" />
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-3xl mix-blend-overlay" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-teal-900/50 rounded-full blur-3xl mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto lg:mx-0 flex flex-col justify-center h-full gap-6 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/images/Logo potensia2 .png"
              alt="Logo Potensia"
              width={200}
              height={80}
              className="h-14 sm:h-20 w-auto object-contain brightness-0 invert"
              priority
            />
            <div className="flex flex-col text-white justify-center">
              <span className="text-xl sm:text-3xl font-bold tracking-widest leading-none">
                POTENSIA
              </span>
              <span className="text-[0.5rem] sm:text-[0.7rem] uppercase font-light tracking-[0.2em] text-teal-100 mt-1.5">
                Unleash Your Digital Potential
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Welcome to Potensia
            </h1>
            <p className="text-base sm:text-lg text-teal-50/90 max-w-xl leading-relaxed font-light">
              Platform AI terpadu untuk membantu para guru menghasilkan RPP
              kontekstual berbasis potensi daerah secara cepat dan akurat.
            </p>
          </div>

          <div className="relative w-full max-w-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 mt-2 transform transition-transform hover:-translate-y-1 duration-500">
            <Image
              src="/images/Untuk Tampilan Login .png"
              alt="Community Sneak Peek"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 sm:p-12 relative bg-slate-50 dark:bg-zinc-950">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-[420px] relative z-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 dark:border-zinc-800 p-8 sm:p-12">
          <div className="mb-10 text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Sign in
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Gunakan akun Google Anda untuk masuk
            </p>
          </div>

          <div className="space-y-8">
            <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 shadow-sm active:scale-[0.98]"
              >
                <GoogleIcon />
                Lanjutkan dengan Google
              </button>
            </SignInButton>

            {userId && (
              <button
                type="button"
                onClick={syncUserToBackend}
                className="w-full rounded-2xl bg-teal-700 text-white px-4 py-4 text-sm font-semibold hover:bg-teal-800 transition"
              >
                Sinkronkan ke Backend
              </button>
            )}

            {backendMessage ? (
              <p className="text-sm text-center text-zinc-600 dark:text-zinc-300">
                {backendMessage}
              </p>
            ) : null}

            {backendEmail ? (
              <p className="text-sm text-center text-teal-700 dark:text-teal-300">
                Login sebagai {backendEmail}
              </p>
            ) : null}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-400 tracking-wider">
                  Akses Terbatas
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed px-2">
              Aplikasi ini didedikasikan untuk mendukung guru-guru di seluruh
              Indonesia. Dengan masuk, Anda menyetujui Ketentuan Layanan kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);