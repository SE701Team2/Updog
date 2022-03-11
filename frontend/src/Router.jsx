import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/LandingController'
import Post from './pages/post/PostPageController'
import Registration from './pages/registration/RegistrationPageController'

const Router = () => (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/signUp" element={<Registration />} />
    </Routes>
)

export default Router
