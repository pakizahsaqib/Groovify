module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artist", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings
      allowNull: false,
    },

    spotifyUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Artist's profile image URL
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Followers info
    followers: {
      type: DataTypes.JSONB, // To store JSON data (followers object from Spotify API)
      allowNull: false,
    },

    // External URL for the artist
    externalUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Artist type (should always be 'artist' based on API data)
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "artist",
    },
  });
  return Artist;
};
