import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Tentukan rute mana saja yang HARUS login (dilindungi)
// Tanda (.*) artinya melindungi halaman tersebut beserta semua sub-halamannya
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  // '/profile(.*)', // <- Kamu bisa tambah rute lain di sini nanti
]);

// 2. Jalankan middleware
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Jika user mencoba akses rute yang dilindungi dan belum login,
    // Clerk otomatis melempar mereka kembali ke halaman login.
    await auth.protect();
  }
});

// 3. Konfigurasi file mana saja yang akan dicek oleh middleware ini
export const config = {
  matcher: [
    // Skip Next.js internals dan file statis (gambar, css, js, dll)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Selalu jalankan middleware untuk rute API
    "/(api|trpc)(.*)",
  ],
};
