'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('UserGameHistories', {
      fields: ['bioID'],
      type: 'foreign key',
      name: 'biodata_history_association',
      references: {
        table: 'Biodata',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('UserGameHistories', {
      fields: ['bioID'],
      type: 'foreign key',
      name: 'biodata_history_association',
      references: {
        table: 'Biodata',
        field: 'id'
      }
    });
  }
};
