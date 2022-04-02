'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tags', [
      {
        id: 1,
        tagName: 'Cricket',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        tagName: 'Soccer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        tagName: 'Rugby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        tagName: 'PremierLeague',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        tagName: 'IPL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        tagName: 'DailyWordleClub',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        tagName: 'NewYork',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        tagName: 'Oscars',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        tagName: 'COVID19',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        tagName: 'Barcelona',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        tagName: 'Microsoft',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        tagName: 'Apple',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        tagName: 'TypeScript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        tagName: 'Canva',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        tagName: 'Maven',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        tagName: 'FantasticBeasts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        tagName: 'NoWayHome',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        tagName: 'DoctorStrange',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        tagName: 'Minions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        tagName: 'Avatar2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tags', null, {})
  },
}
