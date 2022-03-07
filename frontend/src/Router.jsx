import { LandingController } from './pages/landing/LandingController'
import { Route, Routes } from 'react-router-dom'

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingController />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}