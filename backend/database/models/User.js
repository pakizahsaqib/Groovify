module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spotifyUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Token, {
      foreignKey: "userId",
      sourceKey: "id",
      onDelete: "CASCADE", // Delete token if the user is deleted
    });
  };

  return User;
};
