import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Landing from './pages/landing/LandingController'
import SignIn from './pages/signIn/SignInController'
import Post from './pages/post/PostPageController'
import Follows from './pages/follows/FollowsPageController'
import Dashboard from './pages/dashboard/DashboardPageController'
import ProfileSettings from './pages/profileSettings/ProfileSettingsController'
import Registration from './pages/registration/RegistrationPagesController'
import Notifications from './pages/notifications/NotificationsPageController'
import PostComposer from './pages/postComposer/PostComposerController'
import SearchPage from './pages/post/Search/SearchPage'
import { AuthContext } from './contexts/AuthProvider'


const Router = () => {
  // fetch the token to check if the user is authenticated

  let routes
  const { isAuthenticated } = useContext(AuthContext)
  const token = localStorage.getItem('token')

  useEffect(() => {}, [isAuthenticated]) // enables rerendering when token is updated

  if (token) {
    // Auth routes
    routes = (
      <Routes>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user/:username/follows" element={<Follows />} />
        <Route path="/feed" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/new-post" element={<PostComposer />} />
        <Route path="/search-page" element={<SearchPage/>} />
      </Routes>
    )
  } else {
    // Unauth routes
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signUp" element={<Registration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
  }

  return routes 
}

export default Router
