'use strict';
module.exports = (sequelize, DataTypes) => {
  const newtable = sequelize.define('newtable', {
    attribute_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  newtable.associate = function(models) {
    // associations can be defined here
  };
  return newtable;
};