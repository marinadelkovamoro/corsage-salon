module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    numberofItems: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false
      }
    });
    Transaction.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};
