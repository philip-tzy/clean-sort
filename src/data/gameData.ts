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
    timeLimit: 120,
    items: [
      {
        id: 'kulit-pisang',
        name: 'Kulit Pisang',
        category: 'organic',
        image: '🍌',
        educationalFact: 'Kulit pisang adalah sampah organik yang bisa dikompos menjadi pupuk tanah!'
      },
      {
        id: 'daun',
        name: 'Daun',
        category: 'organic',
        image: '🍃',
        educationalFact: 'Daun adalah sampah organik alami yang dapat terurai dan menyuburkan tanah!'
      },
      {
        id: 'botol-plastik',
        name: 'Botol Plastik',
        category: 'inorganic',
        image: '🍼',
        educationalFact: 'Botol plastik bisa didaur ulang menjadi produk baru seperti pakaian dan karpet!'
      }
    ]
  },
  {
    id: 'easy-2',
    name: 'Level 2',
    difficulty: 'easy',
    timeLimit: 120,
    items: [
      {
        id: 'kertas-gambar',
        name: 'Kertas Gambar',
        category: 'paper',
        image: '📄',
        educationalFact: 'Kertas bisa didaur ulang hingga 7 kali untuk membuat produk kertas baru!'
      },
      {
        id: 'sisa-makanan',
        name: 'Sisa Makanan',
        category: 'organic',
        image: '🍎',
        educationalFact: 'Sisa makanan dapat terurai secara alami dan bisa memberi makan cacing di kompos!'
      },
      {
        id: 'kaleng-kecil',
        name: 'Kaleng Kecil',
        category: 'inorganic',
        image: '🥫',
        educationalFact: 'Kaleng logam bisa didaur ulang tanpa batas tanpa kehilangan kualitas!'
      }
    ]
  },
  {
    id: 'easy-3',
    name: 'Level 3',
    difficulty: 'easy',
    timeLimit: 120,
    items: [
      {
        id: 'buku-bekas',
        name: 'Buku Bekas',
        category: 'paper',
        image: '📚',
        educationalFact: 'Buku bekas bisa didaur ulang menjadi kertas baru atau dijual ke tukang loak!'
      },
      {
        id: 'buah-busuk',
        name: 'Buah Busuk',
        category: 'organic',
        image: '🍊',
        educationalFact: 'Buah busuk sangat baik untuk kompos karena mengandung banyak nutrisi!'
      },
      {
        id: 'kantong-plastik',
        name: 'Kantong Plastik',
        category: 'inorganic',
        image: '🛍️',
        educationalFact: 'Kantong plastik butuh ratusan tahun untuk terurai di alam!'
      }
    ]
  },
  // Tambah level 4,5,6,7,8,9,10 untuk "easy"
  {
    id: 'easy-4',
    name: 'Level 4',
    difficulty: 'easy',
    timeLimit: 110,
    items: [
      {
        id: 'ranting-kecil',
        name: 'Ranting Kecil',
        category: 'organic',
        image: '🌿',
        educationalFact: 'Ranting kecil bisa dipotong dan dikompos bersama sampah organik lainnya!'
      },
      {
        id: 'mainan-rusak',
        name: 'Mainan Rusak',
        category: 'inorganic',
        image: '🧸',
        educationalFact: 'Mainan plastik rusak bisa didaur ulang jika dibawa ke tempat daur ulang khusus!'
      },
      {
        id: 'tissue-bekas',
        name: 'Tissue Bekas',
        category: 'paper',
        image: '🧻',
        educationalFact: 'Tissue bekas tidak bisa didaur ulang karena sudah terkontaminasi!'
      }
    ]
  },
  {
    id: 'easy-5',
    name: 'Level 5',
    difficulty: 'easy',
    timeLimit: 110,
    items: [
      {
        id: 'kulit-jeruk',
        name: 'Kulit Jeruk',
        category: 'organic',
        image: '🍊',
        educationalFact: 'Kulit jeruk mengandung minyak alami yang baik untuk kompos!'
      },
      {
        id: 'kardus-susu',
        name: 'Kardus Susu',
        category: 'paper',
        image: '🥛',
        educationalFact: 'Kardus susu harus dibersihkan dulu sebelum didaur ulang!'
      },
      {
        id: 'gelas-plastik',
        name: 'Gelas Plastik',
        category: 'inorganic',
        image: '🥤',
        educationalFact: 'Gelas plastik sekali pakai sebaiknya diganti dengan gelas yang bisa dipakai berulang!'
      },
      {
        id: 'kertas-hvs',
        name: 'Kertas HVS',
        category: 'paper',
        image: '📃',
        educationalFact: 'Kertas HVS bisa didaur ulang menjadi kertas baru!'
      }
    ]
  },
  {
    id: 'easy-6',
    name: 'Level 6',
    difficulty: 'easy',
    timeLimit: 100,
    items: [
      {
        id: 'buah-melon',
        name: 'Buah Melon',
        category: 'organic',
        image: '🍈',
        educationalFact: 'Buah melon busuk cocok untuk kompos.'
      },
      {
        id: 'botol-kaca',
        name: 'Botol Kaca',
        category: 'inorganic',
        image: '🍾',
        educationalFact: 'Botol kaca bisa didaur ulang.'
      },
      {
        id: 'buku-kecil',
        name: 'Buku Kecil',
        category: 'paper',
        image: '📘',
        educationalFact: 'Buku kecil dapat dikumpulkan di bank sampah.'
      }
    ]
  },
  {
    id: 'easy-7',
    name: 'Level 7',
    difficulty: 'easy',
    timeLimit: 100,
    items: [
      {
        id: 'ranting-daun',
        name: 'Ranting Daun',
        category: 'organic',
        image: '🌳',
        educationalFact: 'Ranting daun mudah terurai.'
      },
      {
        id: 'keranjang-plastik',
        name: 'Keranjang Plastik',
        category: 'inorganic',
        image: '🧺',
        educationalFact: 'Keranjang plastik bisa didaur ulang.'
      },
      {
        id: 'kertas-koran',
        name: 'Kertas Koran',
        category: 'paper',
        image: '🗞️',
        educationalFact: 'Koran mudah didaur ulang.'
      }
    ]
  },
  {
    id: 'easy-8',
    name: 'Level 8',
    difficulty: 'easy',
    timeLimit: 90,
    items: [
      {
        id: 'daun-kering',
        name: 'Daun Kering',
        category: 'organic',
        image: '🍂',
        educationalFact: 'Daun kering bisa langsung dikomposkan.'
      },
      {
        id: 'karton-bekas',
        name: 'Karton Bekas',
        category: 'paper',
        image: '📦',
        educationalFact: 'Karton bekas harus dilipat sebelum dikumpulkan.'
      },
      {
        id: 'mainan-kecil',
        name: 'Mainan Kecil',
        category: 'inorganic',
        image: '🪀',
        educationalFact: 'Mainan plastik mudah didaur ulang.'
      }
    ]
  },
  {
    id: 'easy-9',
    name: 'Level 9',
    difficulty: 'easy',
    timeLimit: 90,
    items: [
      {
        id: 'apel-busuk',
        name: 'Apel Busuk',
        category: 'organic',
        image: '🍏',
        educationalFact: 'Buah busuk adalah contoh sampah organik.'
      },
      {
        id: 'kertas-catatan',
        name: 'Kertas Catatan',
        category: 'paper',
        image: '📄',
        educationalFact: 'Kertas catatan sebaiknya tidak basah agar mudah didaur ulang.'
      },
      {
        id: 'penutup-botol',
        name: 'Penutup Botol',
        category: 'inorganic',
        image: '🥤',
        educationalFact: 'Penutup plastik dapat dikumpulkan terpisah.'
      }
    ]
  },
  {
    id: 'easy-10',
    name: 'Level 10',
    difficulty: 'easy',
    timeLimit: 80,
    items: [
      {
        id: 'jeruk-busuk',
        name: 'Jeruk Busuk',
        category: 'organic',
        image: '🍊',
        educationalFact: 'Jeruk busuk bisa masuk kompos.'
      },
      {
        id: 'struk-belanja',
        name: 'Struk Belanja',
        category: 'paper',
        image: '🧾',
        educationalFact: 'Beberapa jenis struk tidak bisa didaur ulang karena mengandung bahan kimia.'
      },
      {
        id: 'wadah-plastik',
        name: 'Wadah Plastik',
        category: 'inorganic',
        image: '🫙',
        educationalFact: 'Wadah plastik harus dibersihkan dulu sebelum didaur ulang.'
      }
    ]
  },

  // MEDIUM
  {
    id: 'medium-1',
    name: 'Level 1',
    difficulty: 'medium',
    timeLimit: 120,
    items: [
      {
        id: 'koran-bekas',
        name: 'Koran Bekas',
        category: 'paper',
        image: '📰',
        educationalFact: 'Koran dibuat dari kertas daur ulang dan bisa didaur ulang lagi!'
      },
      {
        id: 'plastik-kresek',
        name: 'Plastik Kresek',
        category: 'inorganic',
        image: '🛍️',
        educationalFact: 'Kantong plastik butuh 500+ tahun untuk terurai, jadi mendaur ulangnya sangat penting!'
      },
      {
        id: 'kaleng-minuman',
        name: 'Kaleng Minuman',
        category: 'inorganic',
        image: '🥤',
        educationalFact: 'Kaleng aluminium bisa didaur ulang dan kembali ke rak toko dalam 60 hari!'
      }
    ]
  },
  {
    id: 'medium-2',
    name: 'Level 2',
    difficulty: 'medium',
    timeLimit: 110,
    items: [
      {
        id: 'baterai-aa',
        name: 'Baterai AA',
        category: 'hazardous',
        image: '🔋',
        educationalFact: 'Baterai termasuk limbah B3 karena mengandung logam berat beracun yang berbahaya!'
      },
      {
        id: 'sisa-sayuran',
        name: 'Sisa Sayuran',
        category: 'organic',
        image: '🥬',
        educationalFact: 'Sisa sayuran bisa dikompos untuk membuat tanah yang kaya nutrisi!'
      },
      {
        id: 'kardus-besar',
        name: 'Kardus Besar',
        category: 'paper',
        image: '📦',
        educationalFact: 'Kardus adalah salah satu material yang paling banyak didaur ulang di dunia!'
      }
    ]
  },
  {
    id: 'medium-3',
    name: 'Level 3',
    difficulty: 'medium',
    timeLimit: 100,
    items: [
      {
        id: 'botol-kaca',
        name: 'Botol Kaca',
        category: 'inorganic',
        image: '🍾',
        educationalFact: 'Kaca bisa didaur ulang tanpa batas tanpa kehilangan kualitas!'
      },
      {
        id: 'lampu-pijar',
        name: 'Lampu Pijar',
        category: 'hazardous',
        image: '💡',
        educationalFact: 'Lampu pijar mengandung logam dan gas yang memerlukan pembuangan khusus!'
      },
      {
        id: 'ampas-kopi',
        name: 'Ampas Kopi',
        category: 'organic',
        image: '☕',
        educationalFact: 'Ampas kopi sangat baik untuk kompos dan bisa mengusir hama!'
      }
    ]
  },
  {
    id: 'medium-4',
    name: 'Level 4',
    difficulty: 'medium',
    timeLimit: 90,
    items: [
      {
        id: 'kemasan-snack',
        name: 'Kemasan Snack',
        category: 'inorganic',
        image: '🍿',
        educationalFact: 'Kemasan snack berlapis metalik sulit didaur ulang karena gabungan beberapa material!'
      },
      {
        id: 'cat-bekas',
        name: 'Cat Bekas',
        category: 'hazardous',
        image: '🎨',
        educationalFact: 'Cat mengandung bahan kimia berbahaya dan harus dibuang ke tempat khusus!'
      },
      {
        id: 'styrofoam',
        name: 'Styrofoam',
        category: 'inorganic',
        image: '📦',
        educationalFact: 'Styrofoam sulit terurai dan berbahaya jika dibakar karena mengeluarkan racun!'
      }
    ]
  },
  {
    id: 'medium-5',
    name: 'Level 5',
    difficulty: 'medium',
    timeLimit: 90,
    items: [
      {
        id: 'cd-dvd',
        name: 'CD/DVD',
        category: 'hazardous',
        image: '💿',
        educationalFact: 'CD/DVD mengandung plastik khusus dan lapisan logam yang perlu daur ulang khusus!'
      },
      {
        id: 'tulang-ayam',
        name: 'Tulang Ayam',
        category: 'organic',
        image: '🍗',
        educationalFact: 'Tulang ayam bisa dikompos tapi butuh waktu lebih lama untuk terurai!'
      },
      {
        id: 'spidol-bekas',
        name: 'Spidol Bekas',
        category: 'hazardous',
        image: '🖊️',
        educationalFact: 'Spidol mengandung tinta kimia dan plastik yang memerlukan penanganan khusus!'
      }
    ]
  },
  {
    id: 'medium-6',
    name: 'Level 6',
    difficulty: 'medium',
    timeLimit: 90,
    items: [
      {
        id: 'kertas-kado',
        name: 'Kertas Kado',
        category: 'paper',
        image: '🎁',
        educationalFact: 'Kertas kado berlapis plastik atau glitter tidak bisa didaur ulang!'
      },
      {
        id: 'minyak-goreng',
        name: 'Minyak Goreng',
        category: 'hazardous',
        image: '🛢️',
        educationalFact: 'Minyak goreng tidak boleh dibuang ke saluran air karena bisa menyumbat!'
      },
      {
        id: 'kulit-bawang',
        name: 'Kulit Bawang',
        category: 'organic',
        image: '🧅',
        educationalFact: 'Kulit bawang kaya akan nutrisi dan sangat baik untuk kompos!'
      }
    ]
  },
  {
    id: 'medium-7',
    name: 'Level 7',
    difficulty: 'medium',
    timeLimit: 80,
    items: [
      {
        id: 'kulit-semangka',
        name: 'Kulit Semangka',
        category: 'organic',
        image: '🍉',
        educationalFact: 'Kulit semangka termasuk sampah organik.'
      },
      {
        id: 'stiker-bekas',
        name: 'Stiker Bekas',
        category: 'paper',
        image: '🏷️',
        educationalFact: 'Stiker sering tidak didaur ulang karena ada lem.'
      },
      {
        id: 'sendok-plastik',
        name: 'Sendok Plastik',
        category: 'inorganic',
        image: '🥄',
        educationalFact: 'Sendok plastik bekas sebaiknya dikumpulkan terpisah.'
      }
    ]
  },
  {
    id: 'medium-8',
    name: 'Level 8',
    difficulty: 'medium',
    timeLimit: 80,
    items: [
      {
        id: 'kentang-busuk',
        name: 'Kentang Busuk',
        category: 'organic',
        image: '🥔',
        educationalFact: 'Kentang busuk cocok untuk kompos.'
      },
      {
        id: 'amplop-bekas',
        name: 'Amplop Bekas',
        category: 'paper',
        image: '✉️',
        educationalFact: 'Amplop bekas bisa didaur ulang.'
      },
      {
        id: 'pecahan-keramik',
        name: 'Pecahan Keramik',
        category: 'inorganic',
        image: '🏺',
        educationalFact: 'Keramik sulit didaur ulang.'
      }
    ]
  },
  {
    id: 'medium-9',
    name: 'Level 9',
    difficulty: 'medium',
    timeLimit: 70,
    items: [
      {
        id: 'daun-pisang',
        name: 'Daun Pisang',
        category: 'organic',
        image: '🍃',
        educationalFact: 'Daun pisang mudah terurai.'
      },
      {
        id: 'kertas-gambar-anak',
        name: 'Kertas Gambar Anak',
        category: 'paper',
        image: '🖼️',
        educationalFact: 'Kertas gambar hanya bisa didaur ulang jika tidak terkena crayon.'
      },
      {
        id: 'dompet-rusak',
        name: 'Dompet Rusak',
        category: 'inorganic',
        image: '👛',
        educationalFact: 'Dompet rusak bisa diisi ke bank sampah.'
      }
    ]
  },
  {
    id: 'medium-10',
    name: 'Level 10',
    difficulty: 'medium',
    timeLimit: 60,
    items: [
      {
        id: 'nasi-basi',
        name: 'Nasi Basi',
        category: 'organic',
        image: '🍚',
        educationalFact: 'Nasi basi bagus untuk kompos.'
      },
      {
        id: 'kertas-putih',
        name: 'Kertas Putih',
        category: 'paper',
        image: '📄',
        educationalFact: 'Kertas putih mudah didaur ulang.'
      },
      {
        id: 'ember-rusak',
        name: 'Ember Rusak',
        category: 'inorganic',
        image: '🪣',
        educationalFact: 'Ember plastik bisa didaur ulang atau jadi kerajinan.'
      }
    ]
  },

  // HARD
  {
    id: 'hard-1',
    name: 'Level 1',
    difficulty: 'hard',
    timeLimit: 90,
    items: [
      {
        id: 'hp-rusak',
        name: 'HP Rusak',
        category: 'hazardous',
        image: '📱',
        educationalFact: 'Perangkat elektronik mengandung logam mulia dan racun - perlu daur ulang e-waste khusus!'
      },
      {
        id: 'kabel-charger',
        name: 'Kabel Charger',
        category: 'hazardous',
        image: '🔌',
        educationalFact: 'Kabel mengandung tembaga dan plastik yang bisa didaur ulang, tapi perlu penanganan khusus!'
      },
      {
        id: 'kemasan-detergen',
        name: 'Kemasan Detergen',
        category: 'hazardous',
        image: '🧴',
        educationalFact: 'Wadah kimia harus kosong dan bersih sebelum didaur ulang untuk menghindari kontaminasi!'
      }
    ]
  },
  {
    id: 'hard-2',
    name: 'Level 2',
    difficulty: 'hard',
    timeLimit: 90,
    items: [
      {
        id: 'kaca-pecah',
        name: 'Kaca Pecah',
        category: 'hazardous',
        image: '🔍',
        educationalFact: 'Kaca pecah berbahaya untuk ditangani dan perlu pembuangan hati-hati untuk melindungi pekerja!'
      },
      {
        id: 'obat-kadaluarsa',
        name: 'Obat Kadaluarsa',
        category: 'hazardous',
        image: '💊',
        educationalFact: 'Obat tidak boleh dibuang ke sampah biasa - kembalikan ke apotek untuk pembuangan aman!'
      },
      {
        id: 'oli-bekas',
        name: 'Oli Bekas',
        category: 'hazardous',
        image: '🛢️',
        educationalFact: 'Satu liter oli bekas bisa mencemari hingga 1 juta liter air!'
      }
    ]
  },
  {
    id: 'hard-3',
    name: 'Level 3',
    difficulty: 'hard',
    timeLimit: 80,
    items: [
      {
        id: 'aki-motor',
        name: 'Aki Motor',
        category: 'hazardous',
        image: '🔋',
        educationalFact: 'Aki mengandung asam sulfat dan timbal yang sangat berbahaya bagi lingkungan!'
      },
      {
        id: 'printer-rusak',
        name: 'Printer Rusak',
        category: 'hazardous',
        image: '🖨️',
        educationalFact: 'Printer mengandung komponen elektronik dan tinta yang memerlukan daur ulang khusus!'
      },
      {
        id: 'solder-bekas',
        name: 'Solder Bekas',
        category: 'hazardous',
        image: '🔧',
        educationalFact: 'Solder mengandung timbal yang berbahaya dan harus ditangani sebagai limbah B3!'
      }
    ]
  },
  {
    id: 'hard-4',
    name: 'Level 4',
    difficulty: 'hard',
    timeLimit: 70,
    items: [
      {
        id: 'termometer-raksa',
        name: 'Termometer Raksa',
        category: 'hazardous',
        image: '🌡️',
        educationalFact: 'Raksa adalah logam cair beracun yang sangat berbahaya bagi kesehatan!'
      },
      {
        id: 'pestisida-bekas',
        name: 'Pestisida Bekas',
        category: 'hazardous',
        image: '🧪',
        educationalFact: 'Kemasan pestisida tidak boleh dibuang sembarangan karena mengandung racun!'
      },
      {
        id: 'laptop-rusak',
        name: 'Laptop Rusak',
        category: 'hazardous',
        image: '💻',
        educationalFact: 'Laptop mengandung logam berat dan bahan kimia berbahaya yang perlu e-waste khusus!'
      }
    ]
  },
  {
    id: 'hard-5',
    name: 'Level 5',
    difficulty: 'hard',
    timeLimit: 70,
    items: [
      {
        id: 'tabung-gas',
        name: 'Tabung Gas',
        category: 'hazardous',
        image: '🗜️',
        educationalFact: 'Tabung gas bertekanan harus dikembalikan ke distributor untuk penanganan aman!'
      },
      {
        id: 'asbes-bekas',
        name: 'Asbes Bekas',
        category: 'hazardous',
        image: '🏠',
        educationalFact: 'Asbes menyebabkan kanker paru-paru dan harus ditangani oleh ahli limbah B3!'
      },
      {
        id: 'solar-cell',
        name: 'Panel Surya',
        category: 'hazardous',
        image: '☀️',
        educationalFact: 'Panel surya mengandung logam berat dan harus didaur ulang secara khusus!'
      }
    ]
  },
  {
    id: 'hard-6',
    name: 'Level 6',
    difficulty: 'hard',
    timeLimit: 60,
    items: [
      {
        id: 'cairan-rem',
        name: 'Cairan Rem',
        category: 'hazardous',
        image: '🚗',
        educationalFact: 'Cairan rem mengandung glikol yang beracun dan mencemari air tanah!'
      },
      {
        id: 'limbah-medis',
        name: 'Limbah Medis',
        category: 'hazardous',
        image: '💉',
        educationalFact: 'Limbah medis harus dimusnahkan dengan insinerator khusus untuk mencegah infeksi!'
      },
      {
        id: 'radioaktif-bekas',
        name: 'Material Radioaktif',
        category: 'hazardous',
        image: '☢️',
        educationalFact: 'Material radioaktif memerlukan penanganan khusus oleh Badan Tenaga Nuklir!'
      }
    ]
  },
  {
    id: 'hard-7',
    name: 'Level 7',
    difficulty: 'hard',
    timeLimit: 60,
    items: [
      {
        id: 'merkuri-bekas',
        name: 'Merkuri Bekas',
        category: 'hazardous',
        image: '🌡️',
        educationalFact: 'Merkuri sangat beracun dan dapat merusak sistem saraf secara permanen!'
      },
      {
        id: 'limbah-oli',
        name: 'Limbah Oli',
        category: 'hazardous',
        image: '🛢️',
        educationalFact: 'Limbah oli sangat mencemari lingkungan bila dibuang sembarangan.'
      },
      {
        id: 'tinta-printer',
        name: 'Tinta Printer',
        category: 'hazardous',
        image: '🖨️',
        educationalFact: 'Tinta printer mengandung bahan kimia berbahaya.'
      }
    ]
  },
  {
    id: 'hard-8',
    name: 'Level 8',
    difficulty: 'hard',
    timeLimit: 60,
    items: [
      {
        id: 'kabel-listrik',
        name: 'Kabel Listrik',
        category: 'hazardous',
        image: '🔌',
        educationalFact: 'Kabel listrik bekas harus dibuang di tempat khusus.'
      },
      {
        id: 'lampu-neon',
        name: 'Lampu Neon',
        category: 'hazardous',
        image: '💡',
        educationalFact: 'Lampu neon mengandung merkuri.'
      },
      {
        id: 'obat-batuk',
        name: 'Obat Batuk Kadaluarsa',
        category: 'hazardous',
        image: '💊',
        educationalFact: 'Obat kadaluarsa harus dibuang ke apotek.'
      }
    ]
  },
  {
    id: 'hard-9',
    name: 'Level 9',
    difficulty: 'hard',
    timeLimit: 60,
    items: [
      {
        id: 'termometer-pecah',
        name: 'Termometer Pecah',
        category: 'hazardous',
        image: '🌡️',
        educationalFact: 'Termometer pecah bisa mengandung merkuri.'
      },
      {
        id: 'baterai-bekas',
        name: 'Baterai Bekas',
        category: 'hazardous',
        image: '🔋',
        educationalFact: 'Baterai bekas harus dibuang ke TPS3R.'
      },
      {
        id: 'tabung-lampu',
        name: 'Tabung Lampu',
        category: 'hazardous',
        image: '💡',
        educationalFact: 'Tabung lampu bekas mengandung limbah B3.'
      }
    ]
  },
  {
    id: 'hard-10',
    name: 'Level 10',
    difficulty: 'hard',
    timeLimit: 50,
    items: [
      {
        id: 'pestisida-cair',
        name: 'Pestisida Cair',
        category: 'hazardous',
        image: '🧪',
        educationalFact: 'Pestisida sangat beracun dan membahayakan lingkungan.'
      },
      {
        id: 'oli-motor',
        name: 'Oli Motor Bekas',
        category: 'hazardous',
        image: '🛢️',
        educationalFact: 'Oli bekas harus dikelola secara khusus.'
      },
      {
        id: 'lem-kimia',
        name: 'Lem Kimia',
        category: 'hazardous',
        image: '🧴',
        educationalFact: 'Lem kimia dapat mencemari saluran air.'
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
