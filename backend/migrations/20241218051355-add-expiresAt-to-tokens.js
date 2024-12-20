module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tokens", "expiresAt", {
      type: Sequelize.DATE,
      allowNull: true, // Initially nullable
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn("Tokens", "expiresAt");
  },
};
