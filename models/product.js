module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    image: DataTypes.STRING,
    details: DataTypes.TEXT,
    price: DataTypes.INTEGER
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Product.associate = models => {
      Product.hasMany(models.Transaction);
    };
  };
  return Product;
};
