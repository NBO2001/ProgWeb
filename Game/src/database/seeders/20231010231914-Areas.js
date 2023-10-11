'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Areas', [
      {
        nome: "Ciências Exatas",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Ciências Humanas",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Ciências Biológicas",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
