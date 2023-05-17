'use strict';
const moment = require('moment');
const { Op } = require('sequelize');

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
    const delayReportsData = [
      { 
        orderId: 1,
        createdAt: moment(orders[0].createdAt).add(orders[0].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[0].createdAt).add(orders[0].delivery_time/2,'minutes').toDate(),
      },
      {
        orderId: 2,
        createdAt: moment(orders[1].createdAt).add(orders[1].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[1].createdAt).add(orders[1].delivery_time/2,'minutes').toDate(),
      },
      {
        orderId: 4,
        createdAt: moment(orders[3].createdAt).add(orders[3].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[3].createdAt).add(orders[3].delivery_time/2,'minutes').toDate(),
      },
      {
        orderId: 5,
        createdAt: moment(orders[4].createdAt).add(orders[4].delivery_time*2,'minutes').toDate(),
        updatedAt: moment(orders[4].createdAt).add(orders[4].delivery_time*2,'minutes').toDate(),
      },
      {
        orderId: 6,
        createdAt: moment(orders[5].createdAt).add(orders[5].delivery_time*2,'minutes').toDate(),
        updatedAt: moment(orders[5].createdAt).add(orders[5].delivery_time*2,'minutes').toDate(),
      },
      /* Only for the first delay_report related to orderId 7 a late_delivery is created since its still not done 
      the others are ignored
      */
      {
        orderId: 7,
        createdAt: moment(orders[6].createdAt).add(orders[6].delivery_time*2,'minutes').toDate(),
        updatedAt: moment(orders[6].createdAt).add(orders[6].delivery_time*2,'minutes').toDate(),
      },
      {
        orderId: 7,
        createdAt: moment(orders[6].createdAt).add(orders[6].delivery_time*3,'minutes').toDate(),
        updatedAt: moment(orders[6].createdAt).add(orders[6].delivery_time*3,'minutes').toDate(),
      },
      {
        orderId: 7,
        createdAt: moment(orders[6].createdAt).add(orders[6].delivery_time*4,'minutes').toDate(),
        updatedAt: moment(orders[6].createdAt).add(orders[6].delivery_time*4,'minutes').toDate(),
      }
    ];
    await queryInterface.bulkInsert('delay_reports', delayReportsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('delay_reports',null, {})
  }
};
