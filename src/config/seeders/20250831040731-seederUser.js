"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `User ${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash("password123", 10),
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 1; i <= 2; i++) {
      users.push({
        name: `Admin ${i}`,
        username: `admin${i}`,
        email: `admin${i}@example.com`,
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
