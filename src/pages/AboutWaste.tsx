import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MusicToggle from '@/components/MusicToggle';

const wasteCategories = [
  {
    name: "Sampah Organik",
    color: "bg-green-100 text-green-700",
    emoji: "🌱",
    description: "Bahan yang mudah terurai secara alami seperti sisa makanan, daun, ranting, atau kertas tanpa bahan kimia.",
    examples: "Sisa sayur, buah, daun kering, nasi basi.",
    handling: "Dapat dijadikan kompos atau pupuk alami dengan sistem pengomposan."
  },
  {
    name: "Sampah Anorganik",
    color: "bg-gray-100 text-gray-700",
    emoji: "♻️",
    description: "Bahan yang tidak mudah terurai dan kebanyakan bisa didaur ulang.",
    examples: "Plastik, kaleng, logam, botol kaca, styrofoam.",
    handling: "Kumpulkan & pilah, lalu bawa ke bank sampah untuk didaur ulang. Kurangi penggunaan plastik sekali pakai."
  },
  {
    name: "Limbah B3 (Bahan Berbahaya & Beracun)",
    color: "bg-red-100 text-red-700",
    emoji: "⚠️",
    description: "Sampah yang beracun atau berbahaya bagi lingkungan dan kesehatan.",
    examples: "Baterai bekas, lampu neon, obat kedaluwarsa, elektronik rusak.",
    handling: "Tidak boleh dibuang sembarangan. Serahkan ke pusat daur ulang khusus atau TPS B3."
  },
  {
    name: "Sampah Kertas",
    color: "bg-blue-100 text-blue-700",
    emoji: "📄",
    description: "Kertas, kardus, dan produk kertas lainnya.",
    examples: "Karton, koran, buku bekas, kardus.",
    handling: "Pisahkan dari sampah lain, keringkan, lalu daur ulang atau bawa ke bank sampah."
  },
];

const tips = [
  "Pilah sampah sejak dari rumah: organik, anorganik, B3, dan kertas.",
  "Kurangi penggunaan plastik, gunakan tas belanja/ wadah pakai ulang.",
  "Daur ulang atau berikan sampah anorganik/kertas ke bank sampah.",
  "Kelola limbah B3 secara khusus agar tidak mencemari lingkungan.",
  "Jadikan sisa organik sebagai kompos untuk pupuk tanaman.",
  "Biasakan membersihkan sampah sebelum dibuang (misal: bilas botol plastik).",
  "Ajak keluarga dan teman turut peduli memilah dan mengolah sampah.",
];

const AboutWaste: React.FC = () => {
  const navigate = useNavigate();
  const { playBackgroundMusic } = useBackgroundMusic();

  React.useEffect(() => {
    playBackgroundMusic('/boba-date.mp3');
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex flex-col items-center px-2 py-6">
        <div className="flex w-full justify-end mb-2"><MusicToggle defaultMusicSrc="/boba-date.mp3" /></div>
      <div className="max-w-2xl w-full mb-6">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl mb-2">🗑️ Tentang Pengelolaan Sampah</CardTitle>
          <CardDescription>
            Kenali jenis-jenis sampah & cara mengolahnya dengan cara yang baik untuk lingkungan!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-700">
            Sampah adalah sisa kegiatan sehari-hari manusia dan/atau proses alam yang berbentuk padat.
            Memilah dan mengelola sampah dengan benar sangat penting agar lingkungan tetap sehat dan lestari.
          </p>
        </CardContent>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full mb-8">
        {wasteCategories.map((cat, idx) => (
          <Card className={`h-full ${cat.color}`} key={idx}>
            <CardHeader>
              <span className="text-3xl" aria-hidden="true">{cat.emoji}</span>
              <CardTitle className="text-lg sm:text-xl mt-1">{cat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-base">{cat.description}</div>
              <div className="mb-2 text-sm"><strong>Contoh:</strong> {cat.examples}</div>
              <div className="text-xs"><span className="font-semibold">Pengelolaan:</span> {cat.handling}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl w-full mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-green-700">♻️ Tips Mengelola Sampah Sehari-hari</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-5 text-gray-800 text-sm space-y-1">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button variant="secondary" onClick={() => navigate("/")}>← Kembali ke Menu Utama</Button>
    </div>
  );
};

export default AboutWaste;
