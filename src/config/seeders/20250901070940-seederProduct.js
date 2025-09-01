"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        // Electronics (categoryId: 1)
        {
          name: "Smartphone",
          description:
            "Perangkat komunikasi pintar dengan berbagai fitur canggih",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Laptop",
          description: "Komputer portabel untuk kebutuhan kerja dan hiburan",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Headphones",
          description:
            "Perangkat audio untuk mendengarkan musik dengan kualitas tinggi",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Television",
          description:
            "Layar elektronik untuk menonton program televisi dan film",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Clothing (categoryId: 2)
        {
          name: "T-Shirt",
          description: "Kaos kasual untuk penggunaan sehari-hari",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jeans",
          description: "Celana denim yang tahan lama dan stylish",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jacket",
          description: "Jaket untuk perlindungan dari cuaca dingin",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sneakers",
          description:
            "Sepatu olahraga yang nyaman untuk aktivitas sehari-hari",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Books (categoryId: 3)
        {
          name: "Novel",
          description: "Buku cerita fiksi untuk hiburan dan bacaan santai",
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Textbook",
          description: "Buku pelajaran untuk keperluan pendidikan dan akademik",
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Magazine",
          description: "Majalah dengan berbagai topik menarik dan informatif",
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dictionary",
          description: "Kamus untuk membantu memahami arti kata dan bahasa",
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Sports (categoryId: 4)
        {
          name: "Football",
          description: "Bola sepak untuk olahraga tim yang populer",
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Basketball",
          description:
            "Bola basket untuk permainan olahraga indoor dan outdoor",
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tennis Racket",
          description:
            "Raket tenis untuk bermain tenis dengan performa optimal",
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bicycle",
          description: "Sepeda untuk olahraga, transportasi, dan rekreasi",
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Home & Garden (categoryId: 5)
        {
          name: "Sofa",
          description: "Furnitur tempat duduk yang nyaman untuk ruang tamu",
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Table",
          description: "Meja serbaguna untuk berbagai keperluan rumah tangga",
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Plant Pot",
          description: "Pot tanaman untuk menghias rumah dengan tanaman hias",
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lamp",
          description: "Lampu untuk penerangan dan dekorasi ruangan",
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Automotive (categoryId: 6)
        {
          name: "Car Tire",
          description: "Ban mobil berkualitas untuk keamanan berkendara",
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Motor Oil",
          description: "Oli mesin untuk perawatan kendaraan bermotor",
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Car Battery",
          description: "Aki mobil untuk sistem kelistrikan kendaraan",
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Brake Pad",
          description: "Kampas rem untuk sistem pengereman yang aman",
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Health & Beauty (categoryId: 7)
        {
          name: "Shampoo",
          description:
            "Produk perawatan rambut untuk membersihkan dan menutrisi",
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Skincare",
          description: "Produk perawatan kulit untuk menjaga kesehatan wajah",
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vitamin",
          description: "Suplemen vitamin untuk menjaga kesehatan tubuh",
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Perfume",
          description: "Parfum dengan berbagai aroma wangi yang menarik",
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Food (categoryId: 8)
        {
          name: "Snacks",
          description: "Makanan ringan untuk camilan di waktu senggang",
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Instant Noodles",
          description: "Mie instan yang praktis dan mudah disiapkan",
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rice",
          description: "Beras berkualitas sebagai makanan pokok sehari-hari",
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bread",
          description: "Roti segar untuk sarapan dan makanan sehari-hari",
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Beverages (categoryId: 9)
        {
          name: "Coffee",
          description:
            "Kopi berkualitas untuk minuman penyegar dan penambah energi",
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tea",
          description: "Teh dengan berbagai varian rasa yang menyegarkan",
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Juice",
          description: "Jus buah segar yang kaya vitamin dan nutrisi",
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Soft Drink",
          description:
            "Minuman bersoda yang menyegarkan untuk berbagai kesempatan",
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Toys (categoryId: 10)
        {
          name: "Action Figure",
          description: "Mainan figur aksi untuk koleksi dan bermain",
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Doll",
          description: "Boneka lucu untuk mainan anak-anak dan koleksi",
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Building Blocks",
          description: "Balok susun untuk mengembangkan kreativitas anak",
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Puzzle",
          description: "Permainan puzzle untuk melatih konsentrasi dan logika",
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Games (categoryId: 11)
        {
          name: "Board Game",
          description: "Permainan papan untuk hiburan keluarga dan teman",
          categoryId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Card Game",
          description: "Permainan kartu yang seru untuk berbagai usia",
          categoryId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Video Game",
          description: "Permainan video untuk konsol dan komputer",
          categoryId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chess Set",
          description: "Set catur untuk permainan strategi klasik",
          categoryId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Music (categoryId: 12)
        {
          name: "Guitar",
          description: "Alat musik gitar untuk bermain musik dan bernyanyi",
          categoryId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Piano",
          description:
            "Alat musik piano untuk pembelajaran dan pertunjukan musik",
          categoryId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Drum Set",
          description: "Set drum lengkap untuk bermain musik rhythm",
          categoryId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microphone",
          description: "Mikrofon untuk rekaman dan pertunjukan vokal",
          categoryId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Movies (categoryId: 13)
        {
          name: "DVD",
          description: "Cakram DVD dengan berbagai film dan acara hiburan",
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Blu-ray",
          description: "Cakram Blu-ray dengan kualitas video high definition",
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Movie Ticket",
          description: "Tiket bioskop untuk menonton film terbaru",
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Projector",
          description: "Proyektor untuk menonton film di layar besar",
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Office Supplies (categoryId: 14)
        {
          name: "Pen",
          description: "Pulpen untuk menulis dan keperluan kantor sehari-hari",
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Notebook",
          description: "Buku catatan untuk mencatat dan menulis",
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer",
          description: "Mesin pencetak untuk mencetak dokumen dan foto",
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Paper",
          description:
            "Kertas berkualitas untuk berbagai keperluan cetak dan tulis",
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Pet Supplies (categoryId: 15)
        {
          name: "Dog Food",
          description:
            "Makanan anjing berkualitas tinggi untuk nutrisi hewan peliharaan",
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cat Litter",
          description: "Pasir kucing untuk kebersihan dan kenyamanan kucing",
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pet Toy",
          description: "Mainan hewan peliharaan untuk hiburan dan latihan",
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pet Bed",
          description: "Tempat tidur yang nyaman untuk hewan peliharaan",
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Travel (categoryId: 16)
        {
          name: "Suitcase",
          description: "Koper berkualitas untuk perjalanan dan liburan",
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Backpack",
          description:
            "Tas ransel untuk hiking, traveling, dan aktivitas outdoor",
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Travel Pillow",
          description: "Bantal perjalanan untuk kenyamanan saat bepergian",
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Camera",
          description: "Kamera untuk mengabadikan momen perjalanan dan liburan",
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Baby & Kids (categoryId: 17)
        {
          name: "Baby Bottle",
          description: "Botol susu bayi yang aman dan mudah digunakan",
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Diaper",
          description: "Popok bayi yang nyaman dan menyerap dengan baik",
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Stroller",
          description: "Kereta dorong bayi untuk mobilitas yang mudah dan aman",
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Baby Clothes",
          description:
            "Pakaian bayi yang lembut dan nyaman untuk kulit sensitif",
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Jewelry (categoryId: 18)
        {
          name: "Necklace",
          description: "Kalung cantik untuk aksesori fashion dan perhiasan",
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ring",
          description: "Cincin elegan untuk berbagai acara dan kesempatan",
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Earrings",
          description: "Anting-anting yang indah untuk melengkapi penampilan",
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Watch",
          description: "Jam tangan stylish untuk aksesori dan penunjuk waktu",
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
