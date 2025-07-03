export interface TrashItem {
  id: string;
  name: string;
  category: 'organic' | 'inorganic' | 'hazardous' | 'paper';
  image: string;
  educationalFact: string;
}

export interface Level {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
  items: TrashItem[];
}

// Hanya gunakan level dengan id dan nama yang TIDAK mengandung sd, smp, sma
export const gameLevels: Level[] = [
  // Example "generic" levels for each difficulty, no "sd"/"smp"/"sma"
  // EASY levels
  {
    id: 'easy-1',
    name: 'Level 1',
    difficulty: 'easy',
    timeLimit: 95,
    items: [
      {
        id: 'kulit-pisang',
        name: 'Kulit Pisang',
        category: 'organic',
        image: '/images/kulit-pisang.webp',
        educationalFact: 'Kulit pisang adalah sampah organik yang bisa dikompos menjadi pupuk tanah!'
      },
      {
        id: 'daun',
        name: 'Daun',
        category: 'organic',
        image: '/images/daun.webp',
        educationalFact: 'Daun adalah sampah organik alami yang dapat terurai dan menyuburkan tanah!'
      },
      {
        id: 'botol-plastik',
        name: 'Botol Plastik',
        category: 'inorganic',
        image: '/images/botol-plastik.webp',
        educationalFact: 'Botol plastik bisa didaur ulang menjadi produk baru seperti pakaian dan karpet!'
      }
    ]
  },
  {
    id: 'easy-2',
    name: 'Level 2',
    difficulty: 'easy',
    timeLimit: 90,
    items: [
      {
        id: 'kertas-gambar-bekas',
        name: 'Kertas Gambar Bekas',
        category: 'paper',
        image: '/images/kertas-gambar-bekas.webp',
        educationalFact: 'Kertas bisa didaur ulang hingga 7 kali untuk membuat produk kertas baru!'
      },
      {
        id: 'sisa-makanan',
        name: 'Sisa Makanan',
        category: 'organic',
        image: '/images/sisa-makanan.webp',
        educationalFact: 'Sisa makanan dapat terurai secara alami dan bisa memberi makan cacing di kompos!'
      },
      {
        id: 'kaleng-bekas',
        name: 'Kaleng Bekas',
        category: 'inorganic',
        image: '/images/kaleng-bekas.webp',
        educationalFact: 'Kaleng bekas bisa didaur ulang tanpa batas tanpa kehilangan kualitas!'
      }
    ]
  },
  {
    id: 'easy-3',
    name: 'Level 3',
    difficulty: 'easy',
    timeLimit: 85,
    items: [
      {
        id: 'buku-bekas',
        name: 'Buku Bekas',
        category: 'paper',
        image: '/images/buku-bekas.webp',
        educationalFact: 'Buku bekas bisa didaur ulang menjadi kertas baru atau dijual ke tukang loak!'
      },
      {
        id: 'buah-busuk',
        name: 'Buah Busuk',
        category: 'organic',
        image: '/images/buah-busuk.webp',
        educationalFact: 'Buah busuk sangat baik untuk kompos karena mengandung banyak nutrisi!'
      },
      {
        id: 'kantong-plastik',
        name: 'Kantong Plastik',
        category: 'inorganic',
        image: '/images/kantong-plastik.webp',
        educationalFact: 'Kantong plastik butuh ratusan tahun untuk terurai di alam!'
      },
      {
        id: 'botol-kaca',
        name: 'Botol Kaca',
        category: 'inorganic',
        image: '/images/botol-kaca.webp',
        educationalFact: 'Botol kaca bisa didaur ulang.'
      }
    ]
  },
  // Tambah level 4,5,6,7,8,9,10 untuk "easy"
  {
    id: 'easy-4',
    name: 'Level 4',
    difficulty: 'easy',
    timeLimit: 80,
    items: [
      {
        id: 'ranting-kecil',
        name: 'Ranting Kecil',
        category: 'organic',
        image: '/images/ranting-kecil.webp',
        educationalFact: 'Ranting kecil bisa dipotong dan dikompos bersama sampah organik lainnya!'
      },
      {
        id: 'mainan-rusak',
        name: 'Mainan Rusak',
        category: 'inorganic',
        image: '/images/mainan-rusak.webp',
        educationalFact: 'Mainan rusak bisa didaur ulang jika dibawa ke tempat daur ulang khusus!'
      },
      {
        id: 'tissue-bekas',
        name: 'Tissue Bekas',
        category: 'paper',
        image: '/images/tissue-bekas.webp',
        educationalFact: 'Tissue bekas tidak bisa didaur ulang karena sudah terkontaminasi!'
      },
      {
        id: 'apel-busuk',
        name: 'Apel Busuk',
        category: 'organic',
        image: '/images/apel-busuk.webp',
        educationalFact: 'Buah busuk adalah contoh sampah organik.'
      }
    ]
  },
  {
    id: 'easy-5',
    name: 'Level 5',
    difficulty: 'easy',
    timeLimit: 75,
    items: [
      {
        id: 'kulit-jeruk',
        name: 'Kulit Jeruk',
        category: 'organic',
        image: '/images/kulit-jeruk.webp',
        educationalFact: 'Kulit jeruk mengandung minyak alami yang baik untuk kompos!'
      },
      {
        id: 'kardus-bekas',
        name: 'Kardus Bekas',
        category: 'paper',
        image: '/images/kardus-bekas.webp',
        educationalFact: 'Kardus bekas harus dibersihkan dulu sebelum didaur ulang!'
      },
      {
        id: 'gelas-plastik',
        name: 'Gelas Plastik',
        category: 'inorganic',
        image: '/images/gelas-plastik.webp',
        educationalFact: 'Gelas plastik sekali pakai sebaiknya diganti dengan gelas yang bisa dipakai berulang!'
      },
      {
        id: 'kertas-hvs-bekas',
        name: 'Kertas HVS Bekas',
        category: 'paper',
        image: '/images/kertas-hvs-bekas.webp',
        educationalFact: 'Kertas HVS bekas bisa didaur ulang menjadi kertas baru!'
      },
      {
        id: 'mainan-rusak',
        name: 'Mainan Rusak',
        category: 'inorganic',
        image: '/images/mainan-rusak.webp',
        educationalFact: 'Mainan rusak bisa didaur ulang jika dibawa ke tempat daur ulang khusus!'
      }
    ]
  },
  {
    id: 'easy-6',
    name: 'Level 6',
    difficulty: 'easy',
    timeLimit: 70,
    items: [
      {
        id: 'buah-melon-busuk',
        name: 'Buah Melon Busuk',
        category: 'organic',
        image: '/images/buah-melon-busuk.webp',
        educationalFact: 'Buah melon busuk cocok untuk kompos.'
      },
      {
        id: 'buku-bekas',
        name: 'Buku Bekas',
        category: 'paper',
        image: '/images/buku-bekas.webp',
        educationalFact: 'Buku bekas dapat dikumpulkan di bank sampah.'
      },
      
      {
        id: 'kertas-koran-bekas',
        name: 'Kertas Koran Bekas',
        category: 'paper',
        image: '/images/kertas-koran-bekas.webp',
        educationalFact: 'Koran bekas mudah didaur ulang.'
      },
      {
        id: 'kulit-pisang',
        name: 'Kulit Pisang',
        category: 'organic',
        image: '/images/kulit-pisang.webp',
        educationalFact: 'Kulit pisang adalah sampah organik yang bisa dikompos menjadi pupuk tanah!'
      },
      {
        id: 'buah-busuk',
        name: 'Buah Busuk',
        category: 'organic',
        image: '/images/buah-busuk.webp',
        educationalFact: 'Buah busuk sangat baik untuk kompos karena mengandung banyak nutrisi!'
      }
    ]
  },
  {
    id: 'easy-7',
    name: 'Level 7',
    difficulty: 'easy',
    timeLimit: 65,
    items: [
      {
        id: 'ranting-kering',
        name: 'Ranting Kering',
        category: 'organic',
        image: '/images/ranting-kering.webp',
        educationalFact: 'Ranting Kering mudah terurai.'
      },
      {
        id: 'keranjang-plastik-bekas',
        name: 'Keranjang Plastik Bekas',
        category: 'inorganic',
        image: '/images/keranjang-plastik-bekas.webp',
        educationalFact: 'Keranjang plastik bekas bisa didaur ulang.'
      },
      {
        id: 'jeruk-busuk',
        name: 'Jeruk Busuk',
        category: 'organic',
        image: '/images/jeruk-busuk.webp',
        educationalFact: 'Jeruk busuk bisa masuk kompos.'
      },
      {
        id: 'kertas-gambar-bekas',
        name: 'Kertas Gambar Bekas',
        category: 'paper',
        image: '/images/kertas-gambar-bekas.webp',
        educationalFact: 'Kertas bisa didaur ulang hingga 7 kali untuk membuat produk kertas baru!'
      },
      {
        id: 'sisa-makanan',
        name: 'Sisa Makanan',
        category: 'organic',
        image: '/images/sisa-makanan.webp',
        educationalFact: 'Sisa makanan dapat terurai secara alami dan bisa memberi makan cacing di kompos!'
      },
      {
        id: 'kantong-plastik',
        name: 'Kantong Plastik',
        category: 'inorganic',
        image: '/images/kantong-plastik.webp',
        educationalFact: 'Kantong plastik butuh ratusan tahun untuk terurai di alam!'
      }
    ]
  },
  {
    id: 'easy-8',
    name: 'Level 8',
    difficulty: 'easy',
    timeLimit: 60,
    items: [
      {
        id: 'daun-kering',
        name: 'Daun Kering',
        category: 'organic',
        image: '/images/daun-kering.webp',
        educationalFact: 'Daun kering bisa langsung dikomposkan.'
      },
      {
        id: 'kardus-bekas',
        name: 'Kardus Bekas',
        category: 'paper',
        image: '/images/kardus-bekas.webp',
        educationalFact: 'Kardus bekas harus dilipat sebelum dikumpulkan.'
      },
      {
        id: 'sedotan-plastik',
        name: 'Sedotan Plastik',
        category: 'inorganic',
        image: '/images/sedotan-plastik.webp',
        educationalFact: 'Sedotan plastik sekali pakai membutuhkan waktu hingga 200 tahun untuk terurai di alam, namun hanya digunakan dalam waktu kurang dari 15 menit.'
      },
      {
        id: 'buku-bekas',
        name: 'Buku Bekas',
        category: 'paper',
        image: '/images/buku-bekas.webp',
        educationalFact: 'Buku bekas bisa didaur ulang menjadi kertas baru atau dijual ke tukang loak!'
      },
      {
        id: 'daun',
        name: 'Daun',
        category: 'organic',
        image: '/images/daun.webp',
        educationalFact: 'Daun adalah sampah organik alami yang dapat terurai dan menyuburkan tanah!'
      },
      {
        id: 'tissue-bekas',
        name: 'Tissue Bekas',
        category: 'paper',
        image: '/images/tissue-bekas.webp',
        educationalFact: 'Tissue bekas tidak bisa didaur ulang karena sudah terkontaminasi!'
      }
    ]
  },
  {
    id: 'easy-9',
    name: 'Level 9',
    difficulty: 'easy',
    timeLimit: 55,
    items: [
      {
        id: 'apel-busuk',
        name: 'Apel Busuk',
        category: 'organic',
        image: '/images/apel-busuk.webp',
        educationalFact: 'Buah busuk adalah contoh sampah organik.'
      },
      {
        id: 'kertas-catatan-bekas',
        name: 'Kertas Catatan Bekas',
        category: 'paper',
        image: '/images/kertas-catatan-bekas.webp',
        educationalFact: 'Kertas catatan bekas sebaiknya tidak basah agar mudah didaur ulang.'
      },
      {
        id: 'penutup-botol',
        name: 'Penutup Botol',
        category: 'inorganic',
        image: '/images/penutup-botol.webp',
        educationalFact: 'Penutup plastik dapat dikumpulkan terpisah.'
      },
      {
        id: 'ranting-kecil',
        name: 'Ranting Kecil',
        category: 'organic',
        image: '/images/ranting-kecil.webp',
        educationalFact: 'Ranting kecil bisa dipotong dan dikompos bersama sampah organik lainnya!'
      },
      {
        id: 'botol-plastik',
        name: 'Botol Plastik',
        category: 'inorganic',
        image: '/images/botol-plastik.webp',
        educationalFact: 'Botol plastik bisa didaur ulang menjadi produk baru seperti pakaian dan karpet!'
      },
      {
        id: 'gelas-plastik',
        name: 'Gelas Plastik',
        category: 'inorganic',
        image: '/images/gelas-plastik.webp',
        educationalFact: 'Gelas plastik sekali pakai sebaiknya diganti dengan gelas yang bisa dipakai berulang!'
      },
      {
        id: 'kertas-gambar-bekas',
        name: 'Kertas Gambar Bekas',
        category: 'paper',
        image: '/images/kertas-gambar-bekas.webp',
        educationalFact: 'Kertas bisa didaur ulang hingga 7 kali untuk membuat produk kertas baru!'
      }
    ]
  },
  {
    id: 'easy-10',
    name: 'Level 10',
    difficulty: 'easy',
    timeLimit: 50,
    items: [
      {
        id: 'jeruk-busuk',
        name: 'Jeruk Busuk',
        category: 'organic',
        image: '/images/jeruk-busuk.webp',
        educationalFact: 'Jeruk busuk bisa masuk kompos.'
      },
      {
        id: 'struk-belanja',
        name: 'Struk Belanja',
        category: 'paper',
        image: '/images/struk-belanja.webp',
        educationalFact: 'Beberapa jenis struk tidak bisa didaur ulang karena mengandung bahan kimia.'
      },
      {
        id: 'wadah-plastik',
        name: 'Wadah Plastik',
        category: 'inorganic',
        image: '/images/wadah-plastik.webp',
        educationalFact: 'Wadah plastik harus dibersihkan dulu sebelum didaur ulang.'
      },
      {
        id: 'kulit-jeruk',
        name: 'Kulit Jeruk',
        category: 'organic',
        image: '/images/kulit-jeruk.webp',
        educationalFact: 'Kulit jeruk mengandung minyak alami yang baik untuk kompos!'
      },
      {
        id: 'kaleng-bekas',
        name: 'Kaleng Bekas',
        category: 'inorganic',
        image: '/images/kaleng-bekas.webp',
        educationalFact: 'Kaleng bekas bisa didaur ulang tanpa batas tanpa kehilangan kualitas!'
      },
      {
        id: 'buku-bekas',
        name: 'Buku Bekas',
        category: 'paper',
        image: '/images/buku-bekas.webp',
        educationalFact: 'Buku bekas dapat dikumpulkan di bank sampah.'
      },
      {
        id: 'daun',
        name: 'Daun',
        category: 'organic',
        image: '/images/daun.webp',
        educationalFact: 'Daun adalah sampah organik alami yang dapat terurai dan menyuburkan tanah!'
      }
    ]
  },

  // MEDIUM
  {
    id: 'medium-1',
    name: 'Level 1',
    difficulty: 'medium',
    timeLimit: 85,
    items: [
      {
        id: 'kertas-koran-bekas',
        name: 'Kertas Koran Bekas',
        category: 'paper',
        image: '/images/kertas-koran-bekas.webp',
        educationalFact: 'Koran dibuat dari kertas daur ulang dan bisa didaur ulang lagi!'
      },
      {
        id: 'plastik-kresek',
        name: 'Plastik Kresek',
        category: 'inorganic',
        image: '/images/plastik-kresek.webp',
        educationalFact: 'Kantong plastik butuh 500+ tahun untuk terurai, jadi mendaur ulangnya sangat penting!'
      },
      {
        id: 'kaleng-minuman',
        name: 'Kaleng Minuman',
        category: 'inorganic',
        image: '/images/kaleng-bekas.webp',
        educationalFact: 'Kaleng aluminium bisa didaur ulang dan kembali ke rak toko dalam 60 hari!'
      }
    ]
  },
  {
    id: 'medium-2',
    name: 'Level 2',
    difficulty: 'medium',
    timeLimit: 80,
    items: [
      {
        id: 'baterai-bekas',
        name: 'Baterai Bekas',
        category: 'hazardous',
        image: '/images/baterai-bekas.webp',
        educationalFact: 'Baterai termasuk limbah B3 karena mengandung logam berat beracun yang berbahaya!'
      },
      {
        id: 'sisa-sayuran',
        name: 'Sisa Sayuran',
        category: 'organic',
        image: '/images/sisa-sayuran.webp',
        educationalFact: 'Sisa sayuran bisa dikompos untuk membuat tanah yang kaya nutrisi!'
      },
      {
        id: 'kardus-bekas',
        name: 'Kardus Bekas',
        category: 'paper',
        image: '/images/kardus-bekas.webp',
        educationalFact: 'Kardus adalah salah satu material yang paling banyak didaur ulang di dunia!'
      }
    ]
  },
  {
    id: 'medium-3',
    name: 'Level 3',
    difficulty: 'medium',
    timeLimit: 75,
    items: [
      {
        id: 'botol-kaca',
        name: 'Botol Kaca',
        category: 'inorganic',
        image: '/images/botol-kaca.webp',
        educationalFact: 'Kaca bisa didaur ulang tanpa batas tanpa kehilangan kualitas!'
      },
      {
        id: 'lampu-pijar-rusak',
        name: 'Lampu Pijar Rusak',
        category: 'hazardous',
        image: '/images/lampu-pijar-rusak.webp',
        educationalFact: 'Lampu pijar mengandung logam dan gas yang memerlukan pembuangan khusus!'
      },
      {
        id: 'ampas-kopi',
        name: 'Ampas Kopi',
        category: 'organic',
        image: '/images/ampas-kopi.webp',
        educationalFact: 'Ampas kopi sangat baik untuk kompos dan bisa mengusir hama!'
      },
      {
        id: 'kertas-kado',
        name: 'Kertas Kado',
        category: 'paper',
        image: '/images/kertas-kado.webp',
        educationalFact: 'Kertas kado berlapis plastik atau glitter tidak bisa didaur ulang!'
      }
    ]
  },
  {
    id: 'medium-4',
    name: 'Level 4',
    difficulty: 'medium',
    timeLimit: 70,
    items: [
      {
        id: 'kemasan-snack',
        name: 'Kemasan Snack',
        category: 'inorganic',
        image: '/images/kemasan-snack.webp',
        educationalFact: 'Kemasan snack berlapis metalik sulit didaur ulang karena gabungan beberapa material!'
      },
      {
        id: 'cat-bekas',
        name: 'Cat Bekas',
        category: 'hazardous',
        image: '/images/cat-bekas.webp',
        educationalFact: 'Cat mengandung bahan kimia berbahaya dan harus dibuang ke tempat khusus!'
      },
      {
        id: 'styrofoam',
        name: 'Styrofoam',
        category: 'inorganic',
        image: '/images/styrofoam.webp',
        educationalFact: 'Styrofoam sulit terurai dan berbahaya jika dibakar karena mengeluarkan racun!'
      },
      {
        id: 'kulit-semangka',
        name: 'Kulit Semangka',
        category: 'organic',
        image: '/images/kulit-semangka.webp',
        educationalFact: 'Kulit semangka termasuk sampah organik.'
      }
    ]
  },
  {
    id: 'medium-5',
    name: 'Level 5',
    difficulty: 'medium',
    timeLimit: 65,
    items: [
      {
        id: 'cd-dvd-bekas',
        name: 'CD/DVD Bekas',
        category: 'hazardous',
        image: '/images/cd-dvd-bekas.webp',
        educationalFact: 'CD/DVD mengandung plastik khusus dan lapisan logam yang perlu daur ulang khusus!'
      },
      {
        id: 'tulang-ayam',
        name: 'Tulang Ayam',
        category: 'organic',
        image: '/images/tulang-ayam.webp',
        educationalFact: 'Tulang ayam bisa dikompos tapi butuh waktu lebih lama untuk terurai!'
      },
      {
        id: 'spidol-bekas',
        name: 'Spidol Bekas',
        category: 'hazardous',
        image: '/images/spidol-bekas.webp',
        educationalFact: 'Spidol mengandung tinta kimia dan plastik yang memerlukan penanganan khusus!'
      },
      {
        id: 'daun-pisang',
        name: 'Daun Pisang',
        category: 'organic',
        image: '/images/daun-pisang.webp',
        educationalFact: 'Daun pisang mudah terurai.'
      },
      {
        id: 'kentang-busuk',
        name: 'Kentang Busuk',
        category: 'organic',
        image: '/images/kentang-busuk.webp',
        educationalFact: 'Kentang busuk cocok untuk kompos.'
      }
    ]
  },
  {
    id: 'medium-6',
    name: 'Level 6',
    difficulty: 'medium',
    timeLimit: 60,
    items: [
      {
        id: 'kertas-kado',
        name: 'Kertas Kado',
        category: 'paper',
        image: '/images/kertas-kado.webp',
        educationalFact: 'Kertas kado berlapis plastik atau glitter tidak bisa didaur ulang!'
      },
      {
        id: 'minyak-goreng-bekas',
        name: 'Minyak Goreng Bekas',
        category: 'hazardous',
        image: '/images/minyak-goreng-bekas.webp',
        educationalFact: 'Minyak goreng bekas termasuk limbah B3 karena jika dibuang sembarangan dapat mencemari air dan tanah serta mengganggu ekosistem.'
      },
      {
        id: 'kulit-bawang',
        name: 'Kulit Bawang',
        category: 'organic',
        image: '/images/kulit-bawang.webp',
        educationalFact: 'Kulit bawang kaya akan nutrisi dan sangat baik untuk kompos!'
      },
      {
        id: 'kertas-koran-bekas',
        name: 'Kertas Koran Bekas',
        category: 'paper',
        image: '/images/kertas-koran-bekas.webp',
        educationalFact: 'Koran dibuat dari kertas daur ulang dan bisa didaur ulang lagi!'
      },
      {
        id: 'kardus-bekas',
        name: 'Kardus Bekas',
        category: 'paper',
        image: '/images/kardus-bekas.webp',
        educationalFact: 'Kardus adalah salah satu material yang paling banyak didaur ulang di dunia!'
      }
    ]
  },
  {
    id: 'medium-7',
    name: 'Level 7',
    difficulty: 'medium',
    timeLimit: 55,
    items: [
      {
        id: 'kulit-semangka',
        name: 'Kulit Semangka',
        category: 'organic',
        image: '/images/kulit-semangka.webp',
        educationalFact: 'Kulit semangka termasuk sampah organik.'
      },
      {
        id: 'cd-dvd-bekas',
        name: 'CD/DVD Bekas',
        category: 'hazardous',
        image: '/images/cd-dvd-bekas.webp',
        educationalFact: 'CD/DVD mengandung plastik khusus dan lapisan logam yang perlu daur ulang khusus!'
      },
      {
        id: 'sendok-plastik',
        name: 'Sendok Plastik',
        category: 'inorganic',
        image: '/images/sendok-plastik.webp',
        educationalFact: 'Sendok plastik bekas sebaiknya dikumpulkan terpisah.'
      },
      {
        id: 'plastik-kresek',
        name: 'Plastik Kresek',
        category: 'inorganic',
        image: '/images/plastik-kresek.webp',
        educationalFact: 'Kantong plastik butuh 500+ tahun untuk terurai, jadi mendaur ulangnya sangat penting!'
      },
      {
        id: 'botol-kaca',
        name: 'Botol Kaca',
        category: 'inorganic',
        image: '/images/botol-kaca.webp',
        educationalFact: 'Botol kaca termasuk limbah anorganik karena berasal dari bahan non-organik yang tidak bisa terurai secara alami dan dapat membahayakan jika tidak dikelola dengan aman.'
      },
      {
        id: 'cat-bekas',
        name: 'Cat Bekas',
        category: 'hazardous',
        image: '/images/cat-bekas.webp',
        educationalFact: 'Cat mengandung bahan kimia berbahaya dan harus dibuang ke tempat khusus!'
      }
    ]
  },
  {
    id: 'medium-8',
    name: 'Level 8',
    difficulty: 'medium',
    timeLimit: 50,
    items: [
      {
        id: 'kentang-busuk',
        name: 'Kentang Busuk',
        category: 'organic',
        image: '/images/kentang-busuk.webp',
        educationalFact: 'Kentang busuk cocok untuk kompos.'
      },
      {
        id: 'amplop-bekas',
        name: 'Amplop Bekas',
        category: 'paper',
        image: '/images/amplop-bekas.webp',
        educationalFact: 'Amplop bekas bisa didaur ulang.'
      },
      {
        id: 'pecahan-kaca',
        name: 'Pecahan Kaca',
        category: 'inorganic',
        image: '/images/pecahan-kaca.webp',
        educationalFact: 'Pecahan kaca termasuk sampah anorganik yang tidak dapat terurai secara alami. Butuh ratusan hingga ribuan tahun bagi kaca untuk terurai di alam. Selain berbahaya karena tajam, pecahan kaca juga bisa mencemari lingkungan jika tidak dikelola dengan benar.'
      },
      {
        id: 'kaleng-minuman',
        name: 'Kaleng Minuman',
        category: 'inorganic',
        image: '/images/kaleng-bekas.webp',
        educationalFact: 'Kaleng aluminium bisa didaur ulang dan kembali ke rak toko dalam 60 hari!'
      },
      {
        id: 'lampu-pijar-rusak',
        name: 'Lampu Pijar Rusak',
        category: 'hazardous',
        image: '/images/lampu-pijar-rusak.webp',
        educationalFact: 'Lampu pijar mengandung logam dan gas yang memerlukan pembuangan khusus!'
      },
      {
        id: 'cat-bekas',
        name: 'Cat Bekas',
        category: 'hazardous',
        image: '/images/cat-bekas.webp',
        educationalFact: 'Cat mengandung bahan kimia berbahaya dan harus dibuang ke tempat khusus!'
      }
    ]
  },
  {
    id: 'medium-9',
    name: 'Level 9',
    difficulty: 'medium',
    timeLimit: 45,
    items: [
      {
        id: 'daun-pisang',
        name: 'Daun Pisang',
        category: 'organic',
        image: '/images/daun-pisang.webp',
        educationalFact: 'Daun pisang mudah terurai.'
      },
      {
        id: 'kertas-gambar-bekas',
        name: 'Kertas Gambar Bekas',
        category: 'paper',
        image: '/images/kertas-gambar-bekas.webp',
        educationalFact: 'Kertas gambar hanya bisa didaur ulang jika tidak terkena crayon.'
      },
      {
        id: 'dompet-rusak',
        name: 'Dompet Rusak',
        category: 'inorganic',
        image: '/images/dompet-rusak.webp',
        educationalFact: 'Dompet rusak bisa diisi ke bank sampah.'
      },
      {
        id: 'baterai-bekas',
        name: 'Baterai Bekas',
        category: 'hazardous',
        image: '/images/baterai-bekas.webp',
        educationalFact: 'Baterai termasuk limbah B3 karena mengandung logam berat beracun yang berbahaya!'
      },
      {
        id: 'ampas-kopi',
        name: 'Ampas Kopi',
        category: 'organic',
        image: '/images/ampas-kopi.webp',
        educationalFact: 'Ampas kopi sangat baik untuk kompos dan bisa mengusir hama!'
      },
      {
        id: 'styrofoam',
        name: 'Styrofoam',
        category: 'inorganic',
        image: '/images/styrofoam.webp',
        educationalFact: 'Styrofoam sulit terurai dan berbahaya jika dibakar karena mengeluarkan racun!'
      },
      {
        id: 'tulang-ayam',
        name: 'Tulang Ayam',
        category: 'organic',
        image: '/images/tulang-ayam.webp',
        educationalFact: 'Tulang ayam bisa dikompos tapi butuh waktu lebih lama untuk terurai!'
      }
    ]
  },
  {
    id: 'medium-10',
    name: 'Level 10',
    difficulty: 'medium',
    timeLimit: 40,
    items: [
      {
        id: 'roti-busuk',
        name: 'Roti Busuk',
        category: 'organic',
        image: '/images/roti-busuk.webp',
        educationalFact: 'Roti busuk bagus untuk kompos.'
      },
      {
        id: 'asbes-bekas',
        name: 'Asbes Bekas',
        category: 'hazardous',
        image: '/images/asbes-bekas.webp',
        educationalFact: 'Asbes menyebabkan kanker paru-paru dan harus ditangani oleh ahli limbah B3!'
      },
      {
        id: 'ember-rusak',
        name: 'Ember Rusak',
        category: 'inorganic',
        image: '/images/ember-rusak.webp',
        educationalFact: 'Ember plastik bisa didaur ulang atau jadi kerajinan.'
      },
      {
        id: 'sisa-sayuran',
        name: 'Sisa Sayuran',
        category: 'organic',
        image: '/images/sisa-sayuran.webp',
        educationalFact: 'Sisa sayuran bisa dikompos untuk membuat tanah yang kaya nutrisi!'
      },
      {
        id: 'kemasan-snack',
        name: 'Kemasan Snack',
        category: 'inorganic',
        image: '/images/kemasan-snack.webp',
        educationalFact: 'Kemasan snack berlapis metalik sulit didaur ulang karena gabungan beberapa material!'
      },
      {
        id: 'cd-dvd-bekas',
        name: 'CD/DVD Bekas',
        category: 'hazardous',
        image: '/images/cd-dvd-bekas.webp',
        educationalFact: 'CD/DVD mengandung plastik khusus dan lapisan logam yang perlu daur ulang khusus!'
      },
      {
        id: 'spidol-bekas',
        name: 'Spidol Bekas',
        category: 'hazardous',
        image: '/images/spidol-bekas.webp',
        educationalFact: 'Spidol mengandung tinta kimia dan plastik yang memerlukan penanganan khusus!'
      }
    ]
  },

  // HARD
  {
    id: 'hard-1',
    name: 'Level 1',
    difficulty: 'hard',
    timeLimit: 75,
    items: [
      {
        id: 'sikat-gigi-bekas',
        name: 'Sikat Gigi Bekas',
        category: 'inorganic',
        image: '/images/sikat-gigi-bekas.webp',
        educationalFact: 'Sikat gigi terbuat dari plastik keras yang sulit terurai.'
      },
      {
        id: 'kabel-charger',
        name: 'Kabel Charger',
        category: 'hazardous',
        image: '/images/kabel-charger.webp',
        educationalFact: 'Kabel mengandung tembaga dan plastik yang bisa didaur ulang, tapi perlu penanganan khusus!'
      },
      {
        id: 'kemasan-detergen',
        name: 'Kemasan Detergen',
        category: 'hazardous',
        image: '/images/kemasan-detergen.webp',
        educationalFact: 'Wadah kimia harus kosong dan bersih sebelum didaur ulang untuk menghindari kontaminasi!'
      }
    ]
  },
  {
    id: 'hard-2',
    name: 'Level 2',
    difficulty: 'hard',
    timeLimit: 70,
    items: [
      {
        id: 'botol-parfum',
        name: 'Botol Parfum',
        category: 'inorganic',
        image: '/images/botol-parfum.webp',
        educationalFact: 'Botol parfum kaca/plastik bisa didaur ulang, tapi perlu dipisahkan dari sisa cairan.'
      },
      {
        id: 'obat-kadaluarsa',
        name: 'Obat Kadaluarsa',
        category: 'hazardous',
        image: '/images/obat-kadaluarsa.webp',
        educationalFact: 'Obat tidak boleh dibuang ke sampah biasa - kembalikan ke apotek untuk pembuangan aman!'
      },
      {
        id: 'serabut-kelapa',
        name: 'Serabut Kelapa',
        category: 'organic',
        image: '/images/serabut-kelapa.webp',
        educationalFact: 'Serabut kelapa bisa dijadikan media tanam dan pupuk organik jika dicacah.'
      }
    ]
  },
  {
    id: 'hard-3',
    name: 'Level 3',
    difficulty: 'hard',
    timeLimit: 65,
    items: [
      {
        id: 'label-paket',
        name: 'Label Pengiriman',
        category: 'paper',
        image: '/images/label-paket.webp',
        educationalFact: 'Label paket dari kertas bisa dipisahkan dan diproses ulang jika bebas dari stiker plastik.'
      },
      {
        id: 'potongan-rumput',
        name: 'Potongan Rumput',
        category: 'organic',
        image: '/images/potongan-rumput.webp',
        educationalFact: 'Rumput yang dipotong dari taman bisa langsung dikomposkan.'
      },
      {
        id: 'batang-pisang',
        name: 'Batang Pisang',
        category: 'organic',
        image: '/images/batang-pisang.webp',
        educationalFact: 'Batang pisang dapat membusuk secara alami dan digunakan untuk pupuk.'
      },
      {
        id: 'cairan-rem',
        name: 'Cairan Rem',
        category: 'hazardous',
        image: '/images/cairan-rem.webp',
        educationalFact: 'Cairan rem mengandung glikol yang beracun dan mencemari air tanah!'
      }
    ]
  },
  {
    id: 'hard-4',
    name: 'Level 4',
    difficulty: 'hard',
    timeLimit: 60,
    items: [
      {
        id: 'termometer-raksa',
        name: 'Termometer Raksa',
        category: 'hazardous',
        image: '/images/termometer-raksa.webp',
        educationalFact: 'Raksa adalah logam cair beracun yang sangat berbahaya bagi kesehatan!'
      },
      {
        id: 'raket-rusak',
        name: 'Raket Rusak',
        category: 'inorganic',
        image: '/images/raket-rusak.webp',
        educationalFact: 'Raket terbuat dari bahan sintetis seperti plastik dan aluminium — tidak mudah terurai.'
      },
      {
        id: 'kulit-salak',
        name: 'Kulit Salak',
        category: 'organic',
        image: '/images/kulit-salak.webp',
        educationalFact: 'Sisa buah seperti kulit salak termasuk bahan organik yang ramah lingkungan.'
      },
      {
        id: 'merkuri-bekas',
        name: 'Merkuri Bekas',
        category: 'hazardous',
        image: '/images/merkuri-bekas.webp',
        educationalFact: 'Merkuri sangat beracun dan dapat merusak sistem saraf secara permanen!'
      }
    ]
  },
  {
    id: 'hard-5',
    name: 'Level 5',
    difficulty: 'hard',
    timeLimit: 55,
    items: [
      {
        id: 'tabung-gas-bocor',
        name: 'Tabung Gas Bocor',
        category: 'hazardous',
        image: '/images/tabung-gas-bocor.webp',
        educationalFact: 'Tabung gas bertekanan harus dikembalikan ke distributor untuk penanganan aman!'
      },
      {
        id: 'botol-hand-sanitizer',
        name: 'Botol Hand Sanitizer',
        category: 'inorganic',
        image: '/images/botol-hand-sanitizer.webp',
        educationalFact: 'Botol plastik kecil bekas hand sanitizer bisa didaur ulang jika bersih.'
      },
      {
        id: 'solar-cell',
        name: 'Panel Surya',
        category: 'hazardous',
        image: '/images/solar-cell.webp',
        educationalFact: 'Panel surya mengandung logam berat dan harus didaur ulang secara khusus!'
      },
      {
        id: 'termometer-pecah',
        name: 'Termometer Pecah',
        category: 'hazardous',
        image: '/images/termometer-pecah.webp',
        educationalFact: 'Termometer pecah bisa mengandung merkuri.'
      },
      {
        id: 'piring-melamin',
        name: 'Piring Melamin',
        category: 'inorganic',
        image: '/images/piring-melamin.webp',
        educationalFact: 'Melamin adalah plastik keras yang tidak mudah terurai dan berbahaya jika dibakar.'
      }
    ]
  },
  {
    id: 'hard-6',
    name: 'Level 6',
    difficulty: 'hard',
    timeLimit: 50,
    items: [
      {
        id: 'cairan-rem',
        name: 'Cairan Rem',
        category: 'hazardous',
        image: '/images/cairan-rem.webp',
        educationalFact: 'Cairan rem mengandung glikol yang beracun dan mencemari air tanah!'
      },
      {
        id: 'limbah-medis',
        name: 'Limbah Medis',
        category: 'hazardous',
        image: '/images/limbah-medis.webp',
        educationalFact: 'Limbah medis harus dimusnahkan dengan insinerator khusus untuk mencegah infeksi!'
      },
      {
        id: 'radioaktif-bekas',
        name: 'Material Radioaktif',
        category: 'hazardous',
        image: '/images/radioaktif-bekas.webp',
        educationalFact: 'Material radioaktif memerlukan penanganan khusus oleh Badan Tenaga Nuklir!'
      },
      {
        id: 'wadah-kosmetik',
        name: 'Wadah Kosmetik',
        category: 'inorganic',
        image: '/images/wadah-kosmetik.webp',
        educationalFact: 'Botol kosmetik sering mengandung campuran plastik dan logam yang sulit dipilah.'
      },
      {
        id: 'oli-bekas',
        name: 'Oli Bekas',
        category: 'hazardous',
        image: '/images/oli-bekas.webp',
        educationalFact: 'Satu liter oli bekas bisa mencemari hingga 1 juta liter air!'
      }
    ]
  },
  {
    id: 'hard-7',
    name: 'Level 7',
    difficulty: 'hard',
    timeLimit: 45,
    items: [
      {
        id: 'merkuri-bekas',
        name: 'Merkuri Bekas',
        category: 'hazardous',
        image: '/images/merkuri-bekas.webp',
        educationalFact: 'Merkuri sangat beracun dan dapat merusak sistem saraf secara permanen!'
      },
      {
        id: 'spons-cuci',
        name: 'Spons Cuci Piring',
        category: 'inorganic',
        image: '/images/spons-cuci.webp',
        educationalFact: 'Spons sintetis mengandung plastik mikro dan tidak bisa terurai.'
      },
      {
        id: 'tinta-printer',
        name: 'Tinta Printer',
        category: 'hazardous',
        image: '/images/tinta-printer.webp',
        educationalFact: 'Tinta printer mengandung bahan kimia berbahaya.'
      },
      {
        id: 'karpet-vinyl',
        name: 'Potongan Karpet Vinyl',
        category: 'inorganic',
        image: '/images/karpet-vinyl.webp',
        educationalFact: 'Karpet berbahan vinyl tidak bisa terurai dan butuh penanganan limbah khusus.'
      },
      {
        id: 'aki-motor',
        name: 'Aki Motor',
        category: 'hazardous',
        image: '/images/aki-motor.webp',
        educationalFact: 'Aki mengandung asam sulfat dan timbal yang sangat berbahaya bagi lingkungan!'
      },
      {
        id: 'pestisida-cair',
        name: 'Pestisida Bekas',
        category: 'hazardous',
        image: '/images/pestisida-cair.webp',
        educationalFact: 'Kemasan pestisida tidak boleh dibuang sembarangan karena mengandung racun!'
      }
    ]
  },
  {
    id: 'hard-8',
    name: 'Level 8',
    difficulty: 'hard',
    timeLimit: 40,
    items: [
      {
        id: 'kabel-listrik',
        name: 'Kabel Listrik',
        category: 'hazardous',
        image: '/images/kabel-listrik.webp',
        educationalFact: 'Kabel listrik bekas harus dibuang di tempat khusus.'
      },
      {
        id: 'headset-rusak',
        name: 'Headset Rusak',
        category: 'inorganic',
        image: '/images/headset-rusak.webp',
        educationalFact: 'Perangkat elektronik kecil seperti headset mengandung campuran plastik dan logam.'
      },
      {
        id: 'obat-kadaluarsa',
        name: 'Obat Kadaluarsa',
        category: 'hazardous',
        image: '/images/obat-kadaluarsa.webp',
        educationalFact: 'Obat kadaluarsa harus dibuang ke apotek.'
      },
      {
        id: 'origami-bekas',
        name: 'Kertas Origami Bekas',
        category: 'paper',
        image: '/images/origami-bekas.webp',
        educationalFact: 'Origami bekas bisa didaur ulang asalkan tidak dilapisi glitter atau plastik.'
      },
      {
        id: 'wadah-mie-instan',
        name: 'Wadah Mie Instan',
        category: 'inorganic',
        image: '/images/wadah-mie-instan.webp',
        educationalFact: 'Meskipun ringan, kemasan mie instan sangat sulit didaur ulang karena campuran bahan.'
      },
      {
        id: 'laptop-rusak',
        name: 'Laptop Rusak',
        category: 'hazardous',
        image: '/images/laptop-rusak.webp',
        educationalFact: 'Laptop mengandung logam berat dan bahan kimia berbahaya yang perlu e-waste khusus!'
      }
    ]
  },
  {
    id: 'hard-9',
    name: 'Level 9',
    difficulty: 'hard',
    timeLimit: 35,
    items: [
      {
        id: 'ampas-tebu',
        name: 'Ampas Tebu',
        category: 'organic',
        image: '/images/ampas-tebu.webp',
        educationalFact: 'Sisa perasan tebu mengandung serat yang bisa diurai oleh mikroorganisme.'
      },
      {
        id: 'baterai-bekas',
        name: 'Baterai Bekas',
        category: 'hazardous',
        image: '/images/baterai-bekas.webp',
        educationalFact: 'Baterai bekas harus dibuang ke TPS3R.'
      },
      {
        id: 'roti-bekas',
        name: 'Sisa Roti',
        category: 'organic',
        image: '/images/roti-bekas`.webp',
        educationalFact: 'Sisa roti basi termasuk limbah makanan yang mudah membusuk dan menjadi kompos.'
      },
      {
        id: 'pecahan kaca',
        name: 'Kaca Pecah',
        category: 'inorganic',
        image: '/images/pecahan-kaca.webp',
        educationalFact: 'Pecahan kaca termasuk limbah anorganik karena tidak dapat terurai secara alami dan berpotensi membahayakan makhluk hidup jika tidak dikelola dengan benar.'
      },
      {
        id: 'sisa-popcorn',
        name: 'Sisa Popcorn',
        category: 'organic',
        image: '/images/sisa-popcorn.webp',
        educationalFact: 'Makanan berbasis jagung seperti popcorn dapat terurai jika dibuang di komposter.'
      },
      {
        id: 'tabung-gas-bocor',
        name: 'Tabung Gas Bocor',
        category: 'hazardous',
        image: '/images/tabung-gas-bocor.webp',
        educationalFact: 'Tabung gas bertekanan harus dikembalikan ke distributor untuk penanganan aman!'
      },
      {
        id: 'tiket-konser',
        name: 'Tiket Konser',
        category: 'paper',
        image: '/images/tiket-konser.webp',
        educationalFact: 'Kertas tiket yang tidak mengandung lapisan plastik dapat masuk kategori daur ulang.'
      }
    ]
  },
  {
    id: 'hard-10',
    name: 'Level 10',
    difficulty: 'hard',
    timeLimit: 30,
    items: [
      {
        id: 'pestisida-cair',
        name: 'Pestisida Cair',
        category: 'hazardous',
        image: '/images/pestisida-cair.webp',
        educationalFact: 'Pestisida sangat beracun dan membahayakan lingkungan.'
      },
      {
        id: 'kertas-kupon',
        name: 'Kupon Kertas',
        category: 'paper',
        image: '/images/kertas-kupon.webp',
        educationalFact: 'Kertas promosi dan kupon bisa didaur ulang jika tidak dilapisi plastik glossy.'
      },
      {
        id: 'lem-kimia',
        name: 'Lem Kimia',
        category: 'hazardous',
        image: '/images/lem-kimia.webp',
        educationalFact: 'Lem kimia dapat mencemari saluran air.'
      },
      {
        id: 'jerami-kering',
        name: 'Jerami Kering',
        category: 'organic',
        image: '/images/jerami-kering.webp',
        educationalFact: 'Jerami sisa panen bisa dimanfaatkan sebagai pupuk hijau atau alas kandang.'
      },
      {
        id: 'termometer-raksa',
        name: 'Termometer Raksa',
        category: 'hazardous',
        image: '/images/termometer-raksa.webp',
        educationalFact: 'Raksa adalah logam cair beracun yang sangat berbahaya bagi kesehatan!'
      },
      {
        id: 'buku-bekas',
        name: 'Buku Agenda Bekas',
        category: 'paper',
        image: '/images/buku-bekas.webp',
        educationalFact: 'Buku agenda bisa dipilah dari jilidnya dan didaur ulang menjadi bubur kertas.'
      },
      {
        id: 'cairan-rem',
        name: 'Cairan Rem',
        category: 'hazardous',
        image: '/images/cairan-rem.webp',
        educationalFact: 'Cairan rem mengandung glikol yang beracun dan mencemari air tanah!'
      }
    ]
  }
];

// Bin categories tetap sama
export const binCategories = [
  {
    id: 'organic',
    name: 'Sampah Organik',
    color: 'bg-green-500',
    icon: '🌱',
    description: 'Sisa makanan, daun, dan bahan yang bisa terurai'
  },
  {
    id: 'inorganic',
    name: 'Sampah Anorganik',
    color: 'bg-gray-500',
    icon: '♻️',
    description: 'Plastik, logam, dan bahan yang tidak mudah terurai'
  },
  {
    id: 'hazardous',
    name: 'Limbah B3',
    color: 'bg-red-500',
    icon: '⚠️',
    description: 'Bahan berbahaya yang perlu pembuangan khusus'
  },
  {
    id: 'paper',
    name: 'Sampah Kertas',
    color: 'bg-blue-500',
    icon: '📄',
    description: 'Kertas, kardus, dan produk kertas'
  }
];