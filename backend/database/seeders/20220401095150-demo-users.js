'use strict'

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'GreenUnicornComedian',
        email: 'green.unicorn@hmail.com',
        password: 'unicorngreen',
        nickname: 'TheGreenestUnicorn',
        joinedDate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'TheRealHazim',
        email: 'hazim.namik@namikmail.com',
        password: 'dynamicsisbestics',
        nickname: 'TheRealDeal',
        joinedDate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: 'HiruVirtual',
        email: 'hiruna.smith@vtuber.com',
        password: 'purplecats',
        nickname: 'TheRealPurpleCat',
        joinedDate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('tags', null, {})
  },
}
