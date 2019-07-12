module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    total: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Order.hasMany(models.Transaction);
  };

  return Order;
};
