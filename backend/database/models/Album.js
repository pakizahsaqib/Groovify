module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define("Album", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    album_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_tracks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_uri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Album;
};
