'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    total_amount: DataTypes.DECIMAL,
    created_on: DataTypes.DATE,
    shipped_on: DataTypes.DATE,
    status: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,
    reference: DataTypes.STRING,
    shipping_region_id: DataTypes.INTEGER,
    tax_id: DataTypes.INTEGER
  }, {
    timestamps: false,
  });
  order.associate = function (models) {
    // associations can be defined here
    order.belongsTo(models.customer, {
      foreignKey: "customer_id"
    }),
    order.belongsTo(models.shipping, {
      foreignKey: "shipping_region_id"
    }),
    order.belongsTo(models.tax, {
      foreignKey: "tax_id"
    })
  };
  return order;
};