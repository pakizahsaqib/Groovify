module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE, // Storing expiration time as a datetime
      allowNull: true, // Optional, can be set later
    },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      onDelete: "CASCADE", // Delete token if the user is deleted
    });
  };

  return Token;
};
