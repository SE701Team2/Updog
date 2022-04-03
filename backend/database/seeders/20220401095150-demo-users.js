'use strict'

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'flynn',
        email: 'green.unicorn@hmail.com',
        password: 'flynnlikestoparty',
        nickname: 'FlynnParty',
        profilePic:
          'https://user-images.githubusercontent.com/23299540/161423730-76e74022-50b9-47dd-89f9-6f3eea59fc72.gif',
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
        profilePic:
          'https://user-images.githubusercontent.com/23299540/161423827-7dac5e65-ccbb-4c7f-8b37-0af9d9d9733d.png',
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
        profilePic:
          'https://user-images.githubusercontent.com/23299540/161423792-a5a21893-82f8-400f-9be2-c252453e97b1.png',
        joinedDate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        username: 'Senpai',
        email: 'senpai.smith@vtuber.com',
        password: 'senpaiiscool',
        nickname: 'Senpai',
        profilePic:
          'https://user-images.githubusercontent.com/23299540/161423860-9ab72285-92ad-4a5a-8284-1296dd355cb5.png',
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
