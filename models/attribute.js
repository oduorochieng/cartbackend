'use strict';
module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define('attribute', {
    attribute_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name: DataTypes.STRING
  }, {
      timestamps: false,
      freezeTableName: true
    });
  attribute.associate = function (models) {
    attribute.hasMany(models.attribute_value, { foreignKey: 'attribute_id' })
  };
  return attribute;
};