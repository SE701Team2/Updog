import { Home } from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}