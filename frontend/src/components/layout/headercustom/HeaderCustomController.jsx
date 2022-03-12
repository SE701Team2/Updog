import { useNavigate } from 'react-router-dom'
import HeaderCustomView from './HeaderCustomView'

const HeaderCustomController = ({ title, children }) => {
    const navigate = useNavigate()
    const goToPrevPage = () => {
        navigate(-1)
    }
    return (
        <HeaderCustomView
            pageName={title}
            goToPrevPage={goToPrevPage}
            childComponents={children}
        />
    )
}

export default HeaderCustomController
