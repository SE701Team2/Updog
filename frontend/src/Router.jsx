import { LandingController } from './pages/landing/LandingController'
import { Route, Routes } from 'react-router-dom'
import { PostPageController } from './pages/post/PostPageController'

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingController />} />
            <Route path="/post/:id" element={<PostPageController />} />
        </Routes>
    )
}