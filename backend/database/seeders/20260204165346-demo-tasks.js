'use strict';

const uuid = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('tasks', [
      {
        id: uuid.v4(),
        title: 'Pintar bodega',
        description: 'Pintar la bodega principal de blanco hueso',
        status: 'pending',
        user_id: '550e8400-e29b-41d4-a716-446655440000',
      },
      {
        id: uuid.v4(),
        title: 'Lavar ventanas',
        description: 'Lavar todas las ventanas del segundo piso',
        status: 'pending',
        user_id: '550e8400-e29b-41d4-a716-446655440000',
      },
      {
        id: uuid.v4(),
        title: 'Comprar comida para el perro',
        description:
          'Comprar 10kg de comida para el perro en la tienda de mascotas',
        status: 'in_progress',
        user_id: '550e8400-e29b-41d4-a716-446655440000',
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('tasks', null, {});
  },
};
