'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Variants",
      [
        // Electronics Category
        // Smartphone (productId: 1)
        {
          name: "iPhone 15 Pro Max 256GB",
          description: "iPhone 15 Pro Max dengan storage 256GB warna Natural Titanium",
          price: 18999000,
          stock: 25,
          sku: "ELE-SMA-IPHONE-15-PRO-MAX-256GB-001",
          productId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy S24 Ultra 512GB",
          description: "Samsung Galaxy S24 Ultra dengan storage 512GB warna Titanium Black",
          price: 19999000,
          stock: 20,
          sku: "ELE-SMA-SAMSUNG-GALAXY-S24-ULTRA-512GB-002",
          productId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Google Pixel 8 Pro 128GB",
          description: "Google Pixel 8 Pro dengan storage 128GB warna Bay Blue",
          price: 12999000,
          stock: 30,
          sku: "ELE-SMA-GOOGLE-PIXEL-8-PRO-128GB-003",
          productId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Laptop (productId: 2)
        {
          name: "MacBook Pro M3 14 inch",
          description: "MacBook Pro dengan chip M3, layar 14 inch, RAM 16GB, SSD 512GB",
          price: 32999000,
          stock: 15,
          sku: "ELE-LAP-MACBOOK-PRO-M3-14-INCH-001",
          productId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ASUS ROG Strix G16",
          description: "Laptop gaming ASUS ROG dengan Intel i7, RTX 4060, RAM 16GB",
          price: 18999000,
          stock: 12,
          sku: "ELE-LAP-ASUS-ROG-STRIX-G16-002",
          productId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ThinkPad X1 Carbon Gen 11",
          description: "Laptop bisnis premium dengan Intel i7, RAM 32GB, SSD 1TB",
          price: 28999000,
          stock: 10,
          sku: "ELE-LAP-THINKPAD-X1-CARBON-GEN-11-003",
          productId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Headphones (productId: 3)
        {
          name: "Sony WH 1000XM5",
          description: "Headphone wireless dengan noise cancelling terbaik",
          price: 4599000,
          stock: 40,
          sku: "ELE-HEA-SONY-WH-1000XM5-001",
          productId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AirPods Max",
          description: "Headphone premium Apple dengan spatial audio",
          price: 8999000,
          stock: 25,
          sku: "ELE-HEA-AIRPODS-MAX-002",
          productId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Television (productId: 4)
        {
          name: "Samsung QLED 65 inch",
          description: "Smart TV Samsung QLED 4K 65 inch dengan Quantum Processor",
          price: 15999000,
          stock: 8,
          sku: "ELE-TEL-SAMSUNG-QLED-65-INCH-001",
          productId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "LG OLED 55 inch",
          description: "Smart TV LG OLED 4K 55 inch dengan webOS",
          price: 18999000,
          stock: 6,
          sku: "ELE-TEL-LG-OLED-55-INCH-002",
          productId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Clothing Category
        // T-Shirt (productId: 5)
        {
          name: "Cotton T-Shirt Black",
          description: "Kaos katun hitam polos dengan kualitas premium",
          price: 89000,
          stock: 100,
          sku: "CLO-TSH-COTTON-T-SHIRT-BLACK-001",
          productId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Polo Shirt Navy",
          description: "Polo shirt navy dengan logo bordir",
          price: 149000,
          stock: 75,
          sku: "CLO-TSH-POLO-SHIRT-NAVY-002",
          productId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Graphic T-Shirt White",
          description: "Kaos putih dengan desain grafis trendy",
          price: 99000,
          stock: 80,
          sku: "CLO-TSH-GRAPHIC-T-SHIRT-WHITE-003",
          productId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Jeans (productId: 6)
        {
          name: "Skinny Jeans Blue",
          description: "Celana jeans skinny fit warna biru classic",
          price: 299000,
          stock: 50,
          sku: "CLO-JEA-SKINNY-JEANS-BLUE-001",
          productId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Straight Cut Jeans Black",
          description: "Celana jeans straight cut warna hitam",
          price: 349000,
          stock: 45,
          sku: "CLO-JEA-STRAIGHT-CUT-JEANS-BLACK-002",
          productId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Books Category
        // Novel (productId: 9)
        {
          name: "Romance Novel",
          description: "Novel romance bestseller dengan cerita yang menyentuh hati",
          price: 85000,
          stock: 200,
          sku: "BOO-NOV-ROMANCE-NOVEL-001",
          productId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mystery Novel",
          description: "Novel misteri dengan plot twist yang mengejutkan",
          price: 95000,
          stock: 150,
          sku: "BOO-NOV-MYSTERY-NOVEL-002",
          productId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fantasy Novel",
          description: "Novel fantasi epik dengan dunia yang luas dan karakter kompleks",
          price: 120000,
          stock: 100,
          sku: "BOO-NOV-FANTASY-NOVEL-003",
          productId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Sports Category
        // Football (productId: 13)
        {
          name: "FIFA Official Ball",
          description: "Bola sepak resmi FIFA untuk pertandingan professional",
          price: 450000,
          stock: 30,
          sku: "SPO-FOO-FIFA-OFFICIAL-BALL-001",
          productId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Training Ball",
          description: "Bola sepak untuk latihan dengan kualitas tahan lama",
          price: 185000,
          stock: 60,
          sku: "SPO-FOO-TRAINING-BALL-002",
          productId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Home & Garden Category
        // Lamp (productId: 20)
        {
          name: "LED Desk Lamp",
          description: "Lampu meja LED dengan dimmer dan USB charging port",
          price: 299000,
          stock: 40,
          sku: "HOM-LAM-LED-DESK-LAMP-001",
          productId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Floor Lamp Modern",
          description: "Lampu lantai modern dengan desain minimalis",
          price: 850000,
          stock: 20,
          sku: "HOM-LAM-FLOOR-LAMP-MODERN-002",
          productId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ceiling Light Smart",
          description: "Lampu plafon pintar dengan kontrol aplikasi dan voice command",
          price: 1250000,
          stock: 15,
          sku: "HOM-LAM-CEILING-LIGHT-SMART-003",
          productId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Food Category
        // Snacks (productId: 29)
        {
          name: "Potato Chips Original",
          description: "Keripik kentang rasa original yang renyah dan gurih",
          price: 15000,
          stock: 500,
          sku: "FOO-SNA-POTATO-CHIPS-ORIGINAL-001",
          productId: 29,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chocolate Cookies",
          description: "Biskuit coklat dengan keping coklat asli",
          price: 25000,
          stock: 300,
          sku: "FOO-SNA-CHOCOLATE-COOKIES-002",
          productId: 29,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mixed Nuts",
          description: "Campuran kacang-kacangan premium panggang",
          price: 45000,
          stock: 200,
          sku: "FOO-SNA-MIXED-NUTS-003",
          productId: 29,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Beverages Category
        // Coffee (productId: 33)
        {
          name: "Arabica Beans",
          description: "Biji kopi Arabica premium dari pegunungan Jawa",
          price: 125000,
          stock: 100,
          sku: "BEV-COF-ARABICA-BEANS-001",
          productId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Instant Coffee",
          description: "Kopi instan premium dengan aroma yang kuat",
          price: 35000,
          stock: 250,
          sku: "BEV-COF-INSTANT-COFFEE-002",
          productId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cold Brew Concentrate",
          description: "Konsentrat cold brew siap seduh untuk kopi dingin",
          price: 85000,
          stock: 80,
          sku: "BEV-COF-COLD-BREW-CONCENTRATE-003",
          productId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Toys Category
        // Action Figure (productId: 37)
        {
          name: "Super Hero Figure",
          description: "Action figure superhero dengan aksesori lengkap",
          price: 185000,
          stock: 60,
          sku: "TOY-ACT-SUPER-HERO-FIGURE-001",
          productId: 37,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Robot Transformer",
          description: "Robot yang dapat berubah menjadi kendaraan",
          price: 250000,
          stock: 40,
          sku: "TOY-ACT-ROBOT-TRANSFORMER-002",
          productId: 37,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Games Category
        // Board Game (productId: 41)
        {
          name: "Monopoly Classic",
          description: "Permainan monopoli klasik untuk keluarga",
          price: 299000,
          stock: 50,
          sku: "GAM-BOA-MONOPOLY-CLASSIC-001",
          productId: 41,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Scrabble Deluxe",
          description: "Permainan scrabble deluxe dengan papan berputar",
          price: 350000,
          stock: 35,
          sku: "GAM-BOA-SCRABBLE-DELUXE-002",
          productId: 41,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Music Category
        // Guitar (productId: 45)
        {
          name: "Acoustic Guitar Yamaha",
          description: "Gitar akustik Yamaha dengan suara yang jernih dan resonan",
          price: 2850000,
          stock: 15,
          sku: "MUS-GUI-ACOUSTIC-GUITAR-YAMAHA-001",
          productId: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electric Guitar Fender",
          description: "Gitar elektrik Fender Stratocaster dengan pickup premium",
          price: 8500000,
          stock: 8,
          sku: "MUS-GUI-ELECTRIC-GUITAR-FENDER-002",
          productId: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Office Supplies Category
        // Pen (productId: 53)
        {
          name: "Ballpoint Pen Blue",
          description: "Pulpen ballpoint tinta biru dengan grip ergonomis",
          price: 8000,
          stock: 1000,
          sku: "OFF-PEN-BALLPOINT-PEN-BLUE-001",
          productId: 53,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gel Pen Black",
          description: "Pulpen gel hitam dengan tinta smooth flow",
          price: 12000,
          stock: 800,
          sku: "OFF-PEN-GEL-PEN-BLACK-002",
          productId: 53,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fountain Pen Premium",
          description: "Fountain pen premium dengan mata pena emas",
          price: 450000,
          stock: 25,
          sku: "OFF-PEN-FOUNTAIN-PEN-PREMIUM-003",
          productId: 53,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Travel Category
        // Suitcase (productId: 65)
        {
          name: "Hard Shell Suitcase 28 inch",
          description: "Koper hard case 28 inch dengan 4 roda dan TSA lock",
          price: 1850000,
          stock: 20,
          sku: "TRA-SUI-HARD-SHELL-SUITCASE-28-INCH-001",
          productId: 65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cabin Suitcase 20 inch",
          description: "Koper kabin 20 inch ringan untuk carry-on",
          price: 950000,
          stock: 35,
          sku: "TRA-SUI-CABIN-SUITCASE-20-INCH-002",
          productId: 65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Baby & Kids Category
        // Baby Bottle (productId: 69)
        {
          name: "Glass Baby Bottle 240ml",
          description: "Botol susu bayi kaca 240ml dengan dot anti kolik",
          price: 85000,
          stock: 100,
          sku: "BAB-BAB-GLASS-BABY-BOTTLE-240ML-001",
          productId: 69,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Stainless Baby Bottle 180ml",
          description: "Botol susu bayi stainless steel 180ml tahan panas",
          price: 125000,
          stock: 75,
          sku: "BAB-BAB-STAINLESS-BABY-BOTTLE-180ML-002",
          productId: 69,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Jewelry Category
        // Watch (productId: 72)
        {
          name: "Smartwatch Series 9",
          description: "Jam tangan pintar dengan fitur kesehatan dan fitness tracking",
          price: 4850000,
          stock: 30,
          sku: "JEW-WAT-SMARTWATCH-SERIES-9-001",
          productId: 72,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mechanical Watch Classic",
          description: "Jam tangan mekanik klasik dengan tampilan elegant",
          price: 2950000,
          stock: 15,
          sku: "JEW-WAT-MECHANICAL-WATCH-CLASSIC-002",
          productId: 72,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Digital Sports Watch",
          description: "Jam tangan digital untuk olahraga dengan fitur stopwatch",
          price: 385000,
          stock: 50,
          sku: "JEW-WAT-DIGITAL-SPORTS-WATCH-003",
          productId: 72,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Variants", null, {});
  },
};