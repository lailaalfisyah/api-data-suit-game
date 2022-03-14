'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Biodata', {
      fields: ['roleID'],
      type: 'foreign key',
      name: 'role_biodata_association',
      references: {
        table: 'Roles',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Biodata', {
      fields: ['roleID'],
      type: 'foreign key',
      name: 'role_biodata_association',
      references: {
        table: 'Roles',
        field: 'id'
      }
    });
  }
};
