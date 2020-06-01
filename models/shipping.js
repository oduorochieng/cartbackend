'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping = sequelize.define('shipping', {
    shipping_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    shipping_type: DataTypes.STRING,
    shipping_cost: DataTypes.STRING,
    shipping_region_id: DataTypes.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  shipping.associate = function (models) {
    // associations can be defined here
    shipping.belongsTo(models.shipping_region, {
      foreignKey: "shipping_region_id"
    })
  };
  return shipping;
};