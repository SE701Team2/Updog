import { useContext } from 'react'
import { InterestsContext } from '../../contexts/InterestsProvider'
import ChooseInterestsPageView from './ChooseInterestsPageView'

export default function ChooseInterestsPageController() {
  const { selectedTags } = useContext(InterestsContext)

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
    console.log(selectedTags)
  }

  return <ChooseInterestsPageView data={mockData} onSubmit={onSubmit} />
}
