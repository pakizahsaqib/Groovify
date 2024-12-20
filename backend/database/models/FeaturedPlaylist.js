module.exports = (sequelize, DataTypes) => {
  const FeaturedPlaylist = sequelize.define("FeaturedPlaylist", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    spotifyUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerSpotifyUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tracksCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return FeaturedPlaylist;
};
