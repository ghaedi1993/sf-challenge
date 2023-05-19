'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ordersData = [
      {
        vendorId: 1,
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(50,'minutes').toDate(),
        expected_delivery_time:moment().add(50,'minutes').toDate()
      },
      {
        vendorId: 2,
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(50,'minutes').toDate(),
        expected_delivery_time:moment().add(50,'minutes').toDate()      },
      {
        vendorId: 1,
        customerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(100,'minutes').toDate(),
        expected_delivery_time:moment().add(100,'minutes').toDate()      },
      {
        vendorId: 1,
        customerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(60,'minutes').toDate(),
        expected_delivery_time:moment().add(60,'minutes').toDate()      },
      {
        vendorId: 1,
        customerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(100,'minutes').toDate(),
        expected_delivery_time:moment().add(100,'minutes').toDate()      },
      {
        vendorId: 2,
        customerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(70,'minutes').toDate(),
        expected_delivery_time:moment().add(70,'minutes').toDate()      },
      {
        vendorId: 2,
        customerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_time:moment().add(100,'minutes').toDate(),
        expected_delivery_time:moment().add(100,'minutes').toDate()      },
    ];
    await queryInterface.bulkInsert('orders', ordersData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders',null, {})
  }
};
