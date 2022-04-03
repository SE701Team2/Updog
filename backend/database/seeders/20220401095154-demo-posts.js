'use strict'

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('posts', [
      {
        id: 1,
        text_content:
          'Whoah did you see the score on that last game #Cricket game',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        text_content: 'I found a soccer ball 2m down in my garden #Soccer',
        author: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        text_content: 'I dont get what the big deal about Ruby is in NZ #Rugby',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        text_content: 'What is the #PremierLeague',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        text_content:
          'Is it just me or do I not know these acronyms, #IPL more like IDK',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        text_content: 'Wordle 287 1/6* [][][][][] LESHGO #DailyWordleClub',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        text_content: 'Why is rent so expensive in #NewYork',
        author: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        text_content: 'DAM NEVER THOUGHT I WOULD SEE A SLAP LIKE THAT #Oscars',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        text_content: 'Do you remember where you were when #COVID19 started?',
        author: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        text_content:
          'Its cheaper for me to commute to my day job in London while livng in #Barcelona than when I lived in London LOL',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        text_content: '#Microsoft teams has no users',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        text_content: 'I think pears are better than #Apple s',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        text_content:
          '#TypeScript is a superset of Javascript, thank you for coming to my TedTalk',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        text_content: '#Canva grad roles are open atm, sign up today',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        text_content: '#Maven its like raven but with an m',
        author: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        text_content:
          'I will admit, I have not seen any of the #FantasticBeasts movies even while being a fantastic unicorn beast',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        text_content: 'Halp I am stuck at uni writing a lit review #NoWayHome',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        text_content:
          'Some people call me Dr Namik, please call me #DoctorStrange',
        author: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        text_content:
          'I am hiring new #Minions for 2cents/hr, pls drop your cvs below, phd minimum requirement',
        author: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        text_content: '#Avatar2 it all changed when the blue aliens attacked',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('posts', null, {})
  },
}
