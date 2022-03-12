import { useState } from 'react'
import FooterView from './FooterView'
/**
 * This is a reusable footer component intended for users to navigate to main pages.
 */
const FooterController = () => {
    const path = window.location.pathname
    const [currentPage, setCurrentPage] = useState(path)
    // Mock variable for global notification number state
    const [notificationsNumber] = useState(2)
    const onPageChange = (event, newPage) => {
        setCurrentPage(newPage)
    }
    return (
        <FooterView
            currentPage={currentPage}
            onPageChange={onPageChange}
            notificationsNumber={notificationsNumber}
        />
    )
}

export default FooterController
