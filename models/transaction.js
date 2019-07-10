module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    numberofItems: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Order, {
      foreignKey: {
        aloowNull: false
      }
    });
    Transaction.belongsTo(models.Product, {
      foreignKey: {
        aloowNull: false
      }
    });
  };

  return Transaction;
};
