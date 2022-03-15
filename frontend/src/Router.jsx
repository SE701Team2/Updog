import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/LandingController'
import Post from './pages/post/PostPageController'
import Follows from './pages/follows/FollowsPageController'
import Registration from './pages/registration/RegistrationPagesController'
import User from './pages/user/UserPageController'

const Router = () => (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/signUp" element={<Registration />} />
        <Route path="/user/:username/follows" element={<Follows />} />
        <Route path="/user/:username" element={<User />} />
    </Routes>
)

export default Router
