'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_attribute = sequelize.define('product_attribute', {
    product_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    attribute_value_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    }
  }, {
      timestamps: false,
      freezeTableName: true
    });
  product_attribute.associate = function (models) {
    //associations can be defined here
  };
  return product_attribute;
};