
'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define('product_category', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    category_id: DataTypes.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  product_category.associate = function (models) {
    // associations can be defined here
  };
  return product_category;
};