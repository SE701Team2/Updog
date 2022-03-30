import ChooseInterestsPageView from './ChooseInterestsPageView'

export default function ChooseInterestsPageController() {
  const mockData = [
    {
      name: 'Trending',
      tags: ['DailyWorldleCup', 'NewYork', 'Oscars', 'COVID19', 'Barcelona'],
    },
    {
      name: 'Sports',
      tags: ['Cricket', 'Soccer', 'Rugby', 'PremierLeague', 'IPL'],
    },
    {
      name: 'Technology',
      tags: ['Microsoft', 'Apple', 'TypeScript', 'Canva', 'Maven'],
    },
    {
      name: 'Movies',
      tags: [
        'FantasticBeasts',
        'NoWayHome',
        'DoctorStrange',
        'Minions',
        'Avatar2',
      ],
    },
  ]

  const onSubmit = () => {
    /*
    A backend request needs to be made here to submit the user interest preferences, and then the
    user would be routed to their dashboard.
    */
  }

  return <ChooseInterestsPageView data={mockData} onSubmit={onSubmit} />
}
