module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    numberofItems: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {
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
