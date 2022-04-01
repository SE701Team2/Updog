import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import ChooseInterestsPageView from './ChooseInterestsPageView'
import { request } from '../../functions'
import { InterestsContext } from '../../contexts/InterestsProvider'

export default function ChooseInterestsPageController() {
  const navigate = useNavigate()
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

  const onSubmit = async () => {
    await request('interests', 'POST', {
      interests: selectedTags,
    })
    navigate('/')
  }

  return <ChooseInterestsPageView data={mockData} onSubmit={onSubmit} />
}
