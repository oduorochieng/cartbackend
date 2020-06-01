'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    department_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
  });
  category.associate = function (models) {
    category.belongsToMany(models.product, {
      foreignKey: "category_id",
      through: {
        model: models.product_category
      }
    }),
      category.belongsTo(models.department, {
        foreignKey: "department_id"
      })
  };
  return category;
};