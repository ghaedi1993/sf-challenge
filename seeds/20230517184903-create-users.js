'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usersData = [
      {
        username: 'agent_1@gmail.com',
        role: 'AGENT', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'agent_2@gmail.com',
        role: 'AGENT', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'customer_1@gmail.com',
        role: 'CUSTOMER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'customer_2@gmail.com',
        role: 'CUSTOMER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'customer_3@gmail.com',
        role: 'CUSTOMER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'customer_4@gmail.com',
        role: 'CUSTOMER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'deliver_driver_1@gmail.com',
        role: 'DELIVERY_DRIVER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'deliver_driver_2@gmail.com',
        role: 'DELIVERY_DRIVER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'deliver_driver_3@gmail.com',
        role: 'DELIVERY_DRIVER', // replace with the desired role value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', usersData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',null, {})
  }
};
