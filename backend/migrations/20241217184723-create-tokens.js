module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tokens", {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tokens");
  },
};
