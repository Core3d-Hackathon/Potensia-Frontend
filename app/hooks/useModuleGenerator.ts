import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export const useModuleGenerator = () => {
  const { getToken } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTP, setGeneratedTP] = useState<any[]>([]);
  const [generatedATP, setGeneratedATP] = useState<any[]>([]);
  const [generatedModul, setGeneratedModul] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const generateTP = async (payload: any) => {
    setIsGenerating(true);
    try {
      const token = await getToken();
      const res = await fetch(`${baseUrl}/v1/modules/generate/tp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) setGeneratedTP(json.data.tujuan_pembelajaran);
      return json.success;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateATP = async (payload: any) => {
    setIsGenerating(true);
    try {
      const token = await getToken();
      const res = await fetch(`${baseUrl}/v1/modules/generate/atp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) setGeneratedATP(json.data.alur_pertemuan);
      return json.success;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFullModul = async (payload: any) => {
    setIsGenerating(true);
    try {
      const token = await getToken();
      const res = await fetch(`${baseUrl}/v1/modules/generate/modul`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) setGeneratedModul(json.data);
      return json.success;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateTP,
    generateATP,
    generateFullModul,
    generatedTP,
    setGeneratedTP, // 🌟 EXPORT SETTER BARU
    generatedATP,
    setGeneratedATP, // 🌟 EXPORT SETTER BARU
    generatedModul,
  };
};
