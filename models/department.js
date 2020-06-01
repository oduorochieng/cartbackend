'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    department_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  department.associate = function (models) {
    department.hasMany(models.category, { foreignKey: 'department_id'})
  };
  return department;
};