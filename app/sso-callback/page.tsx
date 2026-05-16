import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  // Komponen ini akan memproses data dari Google di belakang layar
  // lalu otomatis melempar user ke halaman redirectUrlComplete (/dashboard)
  return <AuthenticateWithRedirectCallback />;
}
