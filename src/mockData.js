export const CATEGORIES = {
  LAPTOP: 'laptop',
  PHONE: 'điện thoại',
  GEAR: 'gaming gear',
  COMPONENT: 'linh kiện'
};

export const products = [
  // Laptops
  {
    id: 'lap-01',
    name: 'Laptop ASUS ROG Strix G16 (2024)',
    category: CATEGORIES.LAPTOP,
    price: 36990000,
    oldPrice: 39990000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i7-13650HX',
      ram: '16GB DDR5 4800MHz',
      storage: '512GB SSD PCIe 4.0',
      gpu: 'NVIDIA RTX 4060 8GB'
    },
    rating: 4.8,
    reviews: 124,
    tags: ['Gaming', 'RTX 4060', '165Hz'],
    featured: true,
    inStock: true
  },
  {
    id: 'lap-02',
    name: 'MacBook Pro 14 inch M3 (2024)',
    category: CATEGORIES.LAPTOP,
    price: 39990000,
    oldPrice: 42990000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Apple M3 Chip (8-core CPU)',
      ram: '8GB Unified Memory',
      storage: '512GB SSD',
      gpu: '10-core GPU'
    },
    rating: 4.9,
    reviews: 86,
    tags: ['Workplace', 'M3 Chip', 'Retina'],
    featured: true,
    inStock: true
  },
  {
    id: 'lap-03',
    name: 'Laptop Lenovo Legion 5 16IRX9',
    category: CATEGORIES.LAPTOP,
    price: 31490000,
    oldPrice: 33990000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i5-13450HX',
      ram: '16GB DDR5 5600MHz',
      storage: '512GB SSD PCIe 4.0',
      gpu: 'NVIDIA RTX 4050 6GB'
    },
    rating: 4.7,
    reviews: 58,
    tags: ['Gaming', 'Legion', 'RTX 4050'],
    featured: false,
    inStock: true
  },

  // Phones
  {
    id: 'phone-01',
    name: 'iPhone 15 Pro Max 256GB',
    category: CATEGORIES.PHONE,
    price: 29890000,
    oldPrice: 34990000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.7 inch Super Retina XDR',
      cpu: 'Apple A17 Pro (3nm)',
      camera: 'Chính 48MP & Phụ 12MP, 12MP',
      battery: '4441 mAh'
    },
    rating: 4.9,
    reviews: 320,
    tags: ['Apple', 'A17 Pro', 'Titanium'],
    featured: true,
    inStock: true
  },
  {
    id: 'phone-02',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    category: CATEGORIES.PHONE,
    price: 26990000,
    oldPrice: 33990000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.8 inch Dynamic AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy',
      camera: 'Chính 200MP & Phụ 50MP, 12MP, 10MP',
      battery: '5000 mAh'
    },
    rating: 4.8,
    reviews: 195,
    tags: ['Samsung', 'Galaxy AI', 'S-Pen'],
    featured: true,
    inStock: true
  },
  {
    id: 'phone-03',
    name: 'Xiaomi 14 Ultra 5G',
    category: CATEGORIES.PHONE,
    price: 28990000,
    oldPrice: 32990000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.73 inch AMOLED WQHD+',
      cpu: 'Snapdragon 8 Gen 3',
      camera: '4 Camera Leica 50MP',
      battery: '5000 mAh'
    },
    rating: 4.7,
    reviews: 42,
    tags: ['Xiaomi', 'Leica Camera', '90W Fast'],
    featured: false,
    inStock: false
  },

  // Gaming Gear
  {
    id: 'gear-01',
    name: 'Bàn phím cơ ASUS ROG Azoth Wireless',
    category: CATEGORIES.GEAR,
    price: 6190000,
    oldPrice: 6990000,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400',
    specs: {
      layout: 'Gasket-mount 75%',
      switches: 'ROG NX Red pre-lubed',
      connectivity: 'Wireless 2.4Ghz / Bluetooth / Type-C',
      features: 'Màn hình OLED tiện lợi, Hot-swap'
    },
    rating: 4.9,
    reviews: 73,
    tags: ['ROG', 'Mechanical', 'OLED Screen'],
    featured: true,
    inStock: true
  },
  {
    id: 'gear-02',
    name: 'Chuột Gaming Logitech G Pro X Superlight 2',
    category: CATEGORIES.GEAR,
    price: 3690000,
    oldPrice: 3990000,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400',
    specs: {
      sensor: 'HERO 2 (32.000 DPI)',
      weight: '60 grams siêu nhẹ',
      switches: 'LIGHTFORCE Hybrid',
      battery: 'Lên tới 95 giờ'
    },
    rating: 4.8,
    reviews: 215,
    tags: ['Logitech', 'Superlight', 'Wireless'],
    featured: true,
    inStock: true
  },
  {
    id: 'gear-03',
    name: 'Tai nghe Razer BlackShark V2 Pro (2023)',
    category: CATEGORIES.GEAR,
    price: 4890000,
    oldPrice: 5290000,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=400',
    specs: {
      drivers: 'Razer TriForce Titanium 50mm',
      mic: 'Razer HyperClear Super Wideband',
      connectivity: 'Wireless 2.4Ghz / Bluetooth',
      weight: '320 grams'
    },
    rating: 4.7,
    reviews: 98,
    tags: ['Razer', 'Esports', 'Spatial Audio'],
    featured: false,
    inStock: true
  }
];

// PC Builder Parts catalog database
export const builderParts = {
  cpu: [
    {
      id: 'cpu-01',
      name: 'AMD Ryzen 7 7800X3D (8C/16T, up to 5.0GHz, AM5)',
      price: 9890000,
      socket: 'AM5',
      wattage: 120,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'AM5 Socket, Cache 104MB 3D V-Cache, TDP 120W'
    },
    {
      id: 'cpu-02',
      name: 'Intel Core i7-14700K (20C/28T, up to 5.6GHz, LGA1700)',
      price: 10490000,
      socket: 'LGA1700',
      wattage: 125,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'LGA1700 Socket, 20 Cores / 28 Threads, TDP 125W (Turbo 253W)'
    },
    {
      id: 'cpu-03',
      name: 'AMD Ryzen 5 7600 (6C/12T, up to 5.1GHz, AM5)',
      price: 5290000,
      socket: 'AM5',
      wattage: 65,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'AM5 Socket, 6 Cores / 12 Threads, TDP 65W'
    },
    {
      id: 'cpu-04',
      name: 'Intel Core i5-14400F (10C/16T, up to 4.7GHz, LGA1700)',
      price: 5390000,
      socket: 'LGA1700',
      wattage: 65,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'LGA1700 Socket, 10 Cores / 16 Threads, Không GPU onboard'
    }
  ],
  motherboard: [
    {
      id: 'mobo-01',
      name: 'ASUS ROG STRIX B650-A GAMING WIFI (AM5)',
      price: 5990000,
      socket: 'AM5',
      ramType: 'DDR5',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'ATX Form Factor, AM5, DDR5 (4 khe), Hỗ trợ PCIe 5.0'
    },
    {
      id: 'mobo-02',
      name: 'MSI PRO Z790-A MAX WIFI (LGA1700)',
      price: 6490000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'ATX, LGA1700, DDR5, Wi-Fi 7 thế hệ mới, Intel Z790 Chipset'
    },
    {
      id: 'mobo-03',
      name: 'Gigabyte B760M GAMING X AX (LGA1700)',
      price: 3690000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'Micro-ATX, LGA1700, DDR5, Wi-Fi 6E tích hợp'
    }
  ],
  ram: [
    {
      id: 'ram-01',
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz Black',
      price: 3290000,
      ramType: 'DDR5',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 6000MHz, LED RGB iCUE, Cas 36'
    },
    {
      id: 'ram-02',
      name: 'Kingston FURY Beast 16GB (2x8GB) DDR5 5600MHz Black',
      price: 1790000,
      ramType: 'DDR5',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 5600MHz, Thiết kế tản nhiệt nhôm mỏng nhẹ'
    }
  ],
  gpu: [
    {
      id: 'gpu-01',
      name: 'ASUS ROG Strix RTX 4080 Super OC Edition 16GB',
      price: 33990000,
      wattage: 320,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '16GB GDDR6X, OC Edition, Hệ thống tản nhiệt 3 quạt Axial-tech'
    },
    {
      id: 'gpu-02',
      name: 'MSI Gaming X Slim RTX 4070 Ti Super 16GB White',
      price: 24690000,
      wattage: 285,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '16GB GDDR6X, Thiết kế mỏng (Slim), Tông màu trắng tuyết'
    },
    {
      id: 'gpu-03',
      name: 'Gigabyte GeForce RTX 4060 Ti Gaming OC 8G',
      price: 11490000,
      wattage: 160,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '8GB GDDR6, Hệ thống tản nhiệt WindForce 3X'
    }
  ],
  ssd: [
    {
      id: 'ssd-01',
      name: 'Samsung 990 Pro 1TB NVMe M.2 PCIe Gen4 x4',
      price: 2690000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 7450 MB/s, Ghi 6900 MB/s, Dung lượng 1TB'
    },
    {
      id: 'ssd-02',
      name: 'Crucial P3 Plus 1TB M.2 PCIe Gen4 NVMe',
      price: 1890000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 5000 MB/s, Ghi 4200 MB/s, Dung lượng 1TB'
    }
  ],
  psu: [
    {
      id: 'psu-01',
      name: 'Corsair RM850x Shift 850W Gold PCIe 5.0 (Full Modular)',
      price: 3990000,
      wattageRating: 850,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Công suất 850W, Chuẩn 80 Plus Gold, Cáp mô-đun cổng cắm bên hông'
    },
    {
      id: 'psu-02',
      name: 'Cooler Master MWE Bronze 650W V2',
      price: 1590000,
      wattageRating: 650,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Công suất 650W, Chuẩn 80 Plus Bronze, Quạt HDB 120mm siêu êm'
    }
  ],
  cooler: [
    {
      id: 'cooler-01',
      name: 'Tản nhiệt nước AIO Deepcool LT720 A-RGB 360mm Black',
      price: 3190000,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Kích thước Rad 360mm, Bơm vô cực gương vô cực ARGB thế hệ thứ 4'
    },
    {
      id: 'cooler-02',
      name: 'Tản nhiệt khí Thermalright Peerless Assassin 120 SE',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Tháp đôi, 6 ống đồng dẫn nhiệt, 2 quạt 120mm PWM yên tĩnh'
    }
  ],
  pcCase: [
    {
      id: 'case-01',
      name: 'Lian Li O11 Vision Black (Mặt kính 3 bên)',
      price: 3890000,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Mid Tower, Mặt kính cường lực 3 mặt liền mạch, Hỗ trợ Main ATX'
    },
    {
      id: 'case-02',
      name: 'Montech AIR 903 MAX Black (Kèm sẵn 4 quạt ARGB)',
      price: 1490000,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Mid Tower, Mặt trước lưới thoáng khí, Tặng kèm 4 quạt PWM ARGB 140mm'
    }
  ]
};
