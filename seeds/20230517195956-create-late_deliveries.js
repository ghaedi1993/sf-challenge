'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Orders in here should be of those in delay report that their deliver_time is passed doesn't have a trip associated
    const lateDeliveriesData = [
      {
        orderId: 5,
        agentId: 1,
        status:'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 6,
        agentId: 2,
        status:'PICKED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('late_deliveries', lateDeliveriesData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('late_deliveries',null, {})
  }
};
