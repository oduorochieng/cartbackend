'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping_region = sequelize.define('shipping_region', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    shipping_region: DataTypes.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  shipping_region.associate = function (models) {
    // associations can be defined here
  };
  return shipping_region;
};