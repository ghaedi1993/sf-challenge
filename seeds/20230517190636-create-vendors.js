'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const vendorsData = [{
    name: 'vendor_1',
    createdAt: new Date(),
    updatedAt: new Date(),
   },
  {
    name: 'vendor_2',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]
    await queryInterface.bulkInsert('vendors', vendorsData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vendors', null, {});
  }
};
