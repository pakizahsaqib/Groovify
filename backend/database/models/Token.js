module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Token;
};
