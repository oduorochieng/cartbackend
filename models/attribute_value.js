'use strict';
module.exports = (sequelize, DataTypes) => {
  const attribute_value = sequelize.define('attribute_value', {
    attribute_value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    attribute_id: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  attribute_value.associate = function (models) {
    attribute_value.belongsToMany(models.product, {
      foreignKey: "attribute_value_id",
      through: {
        model: models.product_attribute
      }
    }),
    attribute_value.belongsTo(models.attribute, {
      foreignKey: "attribute_id"
    })
  };
  return attribute_value;
};