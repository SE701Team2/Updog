import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/LandingController'
import Post from './pages/post/PostPageController'
import RegistrationFormView from './components/registrationsForm/RegistrationFormView'

const Router = () => (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/signup" element={<RegistrationFormView />} />
    </Routes>
)

export default Router
