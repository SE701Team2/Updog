import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Landing from './pages/landing/LandingController'
import SignIn from './pages/signIn/SignInController'
import Post from './pages/post/PostPageController'
import Follows from './pages/follows/FollowsPageController'
import Dashboard from './pages/dashboard/DashboardPageController'
import ProfileSettings from './pages/profileSettings/ProfileSettingsController'
import Registration from './pages/registration/RegistrationPagesController'
import Notifications from './pages/notifications/NotificationsPageController'
import Search from './pages/search/SearchPageController'
import User from './pages/user/UserPageController'
import PostComposer from './pages/postComposer/PostComposerController'
import Loading from './pages/loading/LoadingController'
import { AuthContext } from './contexts/AuthProvider'
import { InterestsContextProvider } from './contexts/InterestsProvider'
import ChooseInterestsPage from './pages/chooseInterests/ChooseInterestsPageController'

const Router = () => {
  // fetch the token to check if the user is authenticated
  const {
    user: { token },
  } = useContext(AuthContext)

  if (token) {
    // Auth routes
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="/user/:username/follows" element={<Follows />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/new-post" element={<PostComposer />} />
        <Route
          path="/signUp"
          element={
            <InterestsContextProvider>
              <ChooseInterestsPage />
            </InterestsContextProvider>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
  }
  // Unauth routes
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/signUp" element={<Registration />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default Router
