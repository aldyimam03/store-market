"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Electronics",
          description: "Ini adalah kategori elektronik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clothing",
          description: "Ini adalah kategori baju",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Books",
          description: "Ini adalah kategori buku",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports",
          description: "Ini adalah kategori olahraga",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Home & Garden",
          description: "Ini adalah kategori peralatan rumah dan kebun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Automotive",
          description: "Ini adalah kategori otomotif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health & Beauty",
          description: "Ini adalah kategori kesehatan & kecantikan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food",
          description: "Ini adalah kategori makanan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beverages",
          description: "Ini adalah kategori minuman",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toys",
          description: "Ini adalah kategori mainan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Games",
          description: "Ini adalah kategori permainan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Music ",
          description: "Ini adalah kategori film",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Movies",
          description: "Ini adalah kategori film",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Office Supplies",
          description: "Ini adalah kategori perlengkapan kantor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pet Supplies",
          description: "Ini adalah kategori perlengkapan hewan peliharaan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Travel",
          description: "Ini adalah kategori perjalanan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Baby & Kids",
          description: "Ini adalah kategori Bayi & Anak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jewelry",
          description: "Ini adalah kategori perhiasan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
