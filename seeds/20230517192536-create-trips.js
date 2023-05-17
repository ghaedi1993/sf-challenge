'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tripsData = [
      // This belongs to an already Delivered Order
      {
        orderId: 1,
        deliveryDriverId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        status:'DELIVERED'
      },
      // This belongs to an Assigned Order 
      {
        orderId: 2,
        deliveryDriverId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        status:'ASSIGNED'
      },
      // This belongs to a At_vendor Order
      {
        orderId: 3,
        deliveryDriverId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
        status:'AT_VENDOR'
      },
      // This belongs to a Picked Order
      {
        orderId: 4,
        deliveryDriverId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        status:'PICKED'
      }
    ];
    await queryInterface.bulkInsert('trips', tripsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trips',null, {})
  }
};
