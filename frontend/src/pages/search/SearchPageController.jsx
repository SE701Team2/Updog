import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import SearchPageView from './SearchPageView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'
import { NavigationContext } from '../../components/layout/navigation/contexts/NavigationProvider'
import { AuthContext } from '../../contexts/AuthProvider'

/**
 * Enums with the possible types
 */
const types = {
  Top: 'top',
  Latest: 'latest',
  People: 'people',
}

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

  // When component mounts go back to Top selections
  useEffect(() => {
    changeSelection('Top')
  }, [])

  // Load search data
  const { data, loading, err } = useApi(
    search
      ? `search?query=${encodeURI(search)}&type=${types[selection] ?? 'top'}`
      : `search?type=${types[selection] ?? 'top'}`
  )

  // Load follower data on current user
  const { data: rawFollowData, loading: followLoading } = useApi(
    `users/${username}/follow`
  )

  // When the following data changes set it as following data
  useEffect(() => {
    setFollowData(rawFollowData)
  }, [rawFollowData])

  const navigate = useNavigate()

  /**
   * Return to previous page
   */
  const goToPrevPage = () => {
    navigate(-1)
  }

  /**
   * Handle search input
   * sets searchText and search params on url
   */
  const handleSearch = (searchText) => {
    setSearchParams({ search: searchText })
    setSearch(searchText)
  }

  /**
   * Helper method to check if the current user is following
   */
  const checkFollow = (user) => {
    const following = followData?.following ?? []
    return following.some((i) => i.username === user)
  }

  /**
   * Handles when a user follows a user, sends follow/unfollow to
   * backend based on current status
   */
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
