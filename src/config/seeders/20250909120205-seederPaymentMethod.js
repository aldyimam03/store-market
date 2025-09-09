"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PaymentMethods",
      [
        {
          name: "QRIS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "COD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BCA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BRI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mandiri",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BSI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bank Jago",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SeaBank",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Credit Card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "OVO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GoPay",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ShopeePay",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PaymentMethods", null, {});
  },
};
