'use strict';
module.exports = (sequelize, DataTypes) => {
  const shopping_cart = sequelize.define('shopping_cart', {

    item_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    cart_id: DataTypes.CHAR,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    buy_now: DataTypes.BOOLEAN,
    added_on: DataTypes.DATE
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  shopping_cart.associate = function (models) {
    // associations can be defined here
    shopping_cart.hasMany(models.product, {
      foreignKey: "product_id",
    })
  };
  return shopping_cart;
};