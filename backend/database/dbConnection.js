const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
});

const Album = require("./models/Album")(sequelize, DataTypes);
const Artist = require("./models/Artist")(sequelize, DataTypes);
const Track = require("./models/Track")(sequelize, DataTypes);
const Token = require("./models/Token")(sequelize, DataTypes);
const User = require("./models/User")(sequelize, DataTypes);
const FeaturedPlayList = require("./models/FeaturedPlaylist")(
  sequelize,
  DataTypes
);

User.associate({ Token });
Token.associate({ User });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Export models
module.exports = {
  sequelize,
  Album,
  Artist,
  Track,
  Token,
  User,
  FeaturedPlayList,
};
