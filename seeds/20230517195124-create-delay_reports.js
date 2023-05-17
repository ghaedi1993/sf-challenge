'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const delayReportsData = [
      { 
        orderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    await queryInterface.bulkInsert('delay_reports', delayReportsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('delay_reports',null, {})
  }
};
