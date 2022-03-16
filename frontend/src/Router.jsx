import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Landing from './pages/landing/LandingController'
import SignIn from './pages/signIn/SignInController'
import Post from './pages/post/PostPageController'
import Follows from './pages/follows/FollowsPageController'
import Dashboard from './pages/dashboard/DashboardPageController'
import Registration from './pages/registration/RegistrationPagesController'
import User from './pages/user/UserPageController'
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
                <Route path="/user/:username" element={<User />} />
                <Route path="/user/:username/follows" element={<Follows />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
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
