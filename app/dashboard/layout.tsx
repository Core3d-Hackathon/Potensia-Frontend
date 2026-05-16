"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="h-screen w-full flex bg-[#f8fafc] overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`
        fixed md:relative z-50 h-full transition-all duration-300 ease-in-out overflow-hidden shrink-0
        ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:translate-x-0"}
      `}>
        <div className="w-64 h-full">
          <Sidebar onClose={() => isMobile && setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
