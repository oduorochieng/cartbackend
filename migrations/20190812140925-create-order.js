'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.DECIMAL
      },
      created_on: {
        type: Sequelize.DATE
      },
      shipped_on: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      auth_code: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      shipping_region_id: {
        type: Sequelize.INTEGER
      },
      tax_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};