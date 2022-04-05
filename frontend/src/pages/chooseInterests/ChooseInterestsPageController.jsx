import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import ChooseInterestsPageView from './ChooseInterestsPageView'
import { request } from '../../functions'
import { InterestsContext } from '../../contexts/InterestsProvider'

/**
 * ChooseInterestPage handles the ChooseInterestPage where the user chooses interests after register
 */
export default function ChooseInterestsPageController() {
  const navigate = useNavigate()
  const { selectedTags } = useContext(InterestsContext)

  // Currently the tags/categories are hard coded, since the
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
      interests: selectedTags.map((tag) => tag.slice(1)),
    })
    navigate('/')
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return <ChooseInterestsPageView data={mockData} onSubmit={onSubmit} />
}
