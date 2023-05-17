'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const orderIds = [1,2,3,4,5,6,7]
    const orders = await queryInterface.select(null, 'orders', {
      where: {
        id: {
          [Op.in]: orderIds
        }
      }
    });
    // Orders in here should be of those in delay report that their deliver_time is passed doesn't have a trip associated
    const lateDeliveriesData = [
      {
        orderId: 5,
        agentId: 1,
        status:'DONE',
        createdAt: moment(orders[4].createdAt).add(orders[4].delivery_time*2,'minutes').toDate(),
        updatedAt: moment(orders[4].createdAt).add(orders[4].delivery_time*2,'minutes').toDate(),
      },
      {
        orderId: 6,
        agentId: 2,
        status:'PICKED',
        createdAt: moment(orders[5].createdAt).add(orders[5].delivery_time*2,'minutes').toDate(),
        updatedAt: moment(orders[5].createdAt).add(orders[5].delivery_time*2,'minutes').toDate(),
      },
      {
        orderId: 7,
        createdAt: moment(orders[6].createdAt).add(orders[6].delivery_time*2,'minutes').toDate(),
        updatedAt: moment(orders[6].createdAt).add(orders[6].delivery_time*2,'minutes').toDate(),
      },
    ];
    await queryInterface.bulkInsert('late_deliveries', lateDeliveriesData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('late_deliveries',null, {})
  }
};
