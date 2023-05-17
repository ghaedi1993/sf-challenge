'use strict';
const moment = require('moment');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const orderIds = [1,2,3,4,5]
    const orders = await queryInterface.select(null, 'orders', {
      where: {
        id: {
          [Op.in]: orderIds
        }
      }
    });
    const tripsData = [
      // This belongs to an already Delivered Order
      {
        orderId: 1,
        deliveryDriverId: 6,
        createdAt: moment(orders[0].createdAt).add(orders[0].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[0].createdAt).add(orders[0].delivery_time/2,'minutes').toDate(),
        status:'DELIVERED'
      },
      // This belongs to an Assigned Order 
      {
        orderId: 2,
        deliveryDriverId: 7,
        createdAt: moment(orders[1].createdAt).add(orders[1].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[1].createdAt).add(orders[1].delivery_time/2,'minutes').toDate(),
        status:'ASSIGNED'
      },
      // This belongs to a At_vendor Order
      {
        orderId: 3,
        deliveryDriverId: 8,
        createdAt: moment(orders[2].createdAt).add(orders[2].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[2].createdAt).add(orders[2].delivery_time/2,'minutes').toDate(),
        status:'AT_VENDOR'
      },
      // This belongs to a Picked Order
      {
        orderId: 4,
        deliveryDriverId: 6,
        createdAt: moment(orders[3].createdAt).add(orders[3].delivery_time/2,'minutes').toDate(),
        updatedAt: moment(orders[3].createdAt).add(orders[3].delivery_time/2,'minutes').toDate(),
        status:'PICKED'
      },
      // This belong to an order that vendor asked for a trip but yet noone accept it (and its late) and the trip 
      {
        orderId: 5,
        createdAt: moment(orders[4].createdAt).add(orders[4].delivery_time * 2,'minutes').toDate(),
        updatedAt: moment(orders[4].createdAt).add(orders[4].delivery_time * 2,'minutes').toDate(),
      }

    ];
    await queryInterface.bulkInsert('trips', tripsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trips',null, {})
  }
};