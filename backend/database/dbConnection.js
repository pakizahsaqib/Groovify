const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
});

// Import your models here
const Album = require("./models/Album")(sequelize, DataTypes);

// Sync database (you can skip this in production if it's already synced)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = { sequelize, Album }; // Export sequelize and models
