module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    numberofItems: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {
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
