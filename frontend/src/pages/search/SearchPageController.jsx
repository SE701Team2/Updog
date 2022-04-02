import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import SearchPageView from './SearchPageView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'
import { NavigationContext } from '../../components/layout/navigation/contexts/NavigationProvider'
import { AuthContext } from '../../contexts/AuthProvider'

/**
 * This page renders the search UI.
 */
const SearchPageController = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    user: { username },
  } = useContext(AuthContext)
  const { selection, changeSelection } = useContext(NavigationContext)
  const [search, setSearch] = useState(searchParams.get('search'))
  const [followData, setFollowData] = useState()

  // when component mounts go back to Top selections
  useEffect(() => {
    changeSelection('Top')
  }, [])

  const types = {
    Top: 'top',
    Latest: 'latest',
    People: 'people',
  }

  const { data, loading, err } = useApi(
    search
      ? `search?query=${encodeURI(search)}&type=${types[selection] ?? 'top'}`
      : `search?type=${types[selection] ?? 'top'}`
  )

  const { data: rawFollowData, loading: followLoading } = useApi(
    `users/${username}/follow`
  )

  useEffect(() => {
    setFollowData(rawFollowData)
  }, [rawFollowData])

  const navigate = useNavigate()
  const goToPrevPage = () => {
    navigate(-1)
  }

  const handleSearch = (searchText) => {
    setSearchParams({ search: searchText })
    setSearch(searchText)
  }

  const checkFollow = (user) => {
    const following = followData?.following ?? []
    return following.some((i) => i.username === user)
  }

  const handleFollow = (follow) => {
    const isFollow = checkFollow(follow)
    const method = isFollow ? 'DELETE' : 'POST'
    request(`users/${follow}/follow`, method)
    if (isFollow)
      setFollowData({
        ...followData,
        following: followData.following.filter((i) => i.username !== follow),
      })
    else
      setFollowData({
        ...followData,
        following: [...followData.following, { username: follow }],
      })
  }

  return (
    <SearchPageView
      goToPrevPage={goToPrevPage}
      loading={loading || followLoading}
      err={err}
      data={data}
      handleSearch={handleSearch}
      typePeople={selection === 'People'}
      follow={handleFollow}
      checkFollow={checkFollow}
    />
  )
}

export default SearchPageController
