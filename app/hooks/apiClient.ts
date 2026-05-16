// app/hooks/apiClient.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/v1";

interface FetchOptions extends RequestInit {
  token?: string | null;
}

/**
 * Kurir API Pintar untuk Potensia
 * Otomatis menambahkan Base URL /v1 dan Header Content-Type
 */
export const apiClient = async (endpoint: string, options: FetchOptions = {}) => {
  const { token, headers, ...customOptions } = options;

  // 1. Bersihkan garing miring di awal endpoint jika user tidak sengaja mengetiknya
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const fullUrl = `${BASE_URL}/${cleanEndpoint}`;

  // 2. Susun default headers
  const authHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 3. Jika komponen mengirimkan token Clerk, masukkan otomatis sebagai Bearer token
  if (token) {
    authHeaders["Authorization"] = `Bearer ${token}`;
  }

  // 4. Eksekusi pengiriman data
  const response = await fetch(fullUrl, {
    ...customOptions,
    headers: {
      ...authHeaders,
      ...headers,
    },
  });

  // 5. Standarisasi penanganan error sesuai dokumentasi backend umum
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Gagal mengeksekusi request: ${response.status}`);
  }

  // 6. Kembalikan data JSON mentah jika sukses
  return response.json();
};