'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_detail = sequelize.define('order_detail', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_cost: DataTypes.DECIMAL,
    delivery_cost: DataTypes.DECIMAL
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  order_detail.associate = function (models) {
    // associations can be defined here
    order_detail.hasMany(models.product, {
      foreignKey: "product_id",
    }),
      order_detail.belongsTo(models.department, {
        foreignKey: "order_id"
      })
  };
  return order_detail;
};