import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/LandingController'
import Post from './pages/post/PostPageController'

const Router = () => (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:id" element={<Post />} />
    </Routes>
)

export default Router
