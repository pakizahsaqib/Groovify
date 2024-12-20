module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define("Track", {
    trackId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artists: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spotifyUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPlayable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    durationMs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    explicit: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  return Track;
};
