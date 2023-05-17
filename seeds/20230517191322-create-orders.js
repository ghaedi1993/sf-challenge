'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ordersData = [
      {
        vendorId: 1,
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:50
      },
      {
        vendorId: 2,
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:50 
      },
      {
        vendorId: 1,
        customerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:100
      },
      {
        vendorId: 1,
        customerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:60
      },
      {
        vendorId: 1,
        customerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:60
      },
      {
        vendorId: 2,
        customerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:70
      },
    ];
    await queryInterface.bulkInsert('orders', ordersData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders',null, {})
  }
};
