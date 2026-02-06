'use strict';

const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface) {
    const hashedPassword = bcrypt.hashSync('password123', 10);
    return queryInterface.bulkInsert('users', [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@demo.com',
        password: hashedPassword,
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
