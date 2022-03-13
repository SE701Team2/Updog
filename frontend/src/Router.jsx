import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/LandingController'
import SignIn from './pages/signIn/SignInController'
import Post from './pages/post/PostPageController'

const Router = () => {
    // fetch the token to check if the user is authenticated

    let routes

    const token = localStorage.getItem('token')

    if (token) {
        // Auth routes
        routes = (
            <Routes>
                <Route path="/post/:id" element={<Post />} />
            </Routes>
        )
    } else {
        // Unauth routes
        routes = (
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signIn" element={<SignIn />} />
            </Routes>
        )
    }

    return routes
}

export default Router
