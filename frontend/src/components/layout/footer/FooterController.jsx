import { useState, useEffect } from 'react'
import FooterView from './FooterView'
import useApi from '../../../hooks/useApi'
/**
 * This is a reusable footer component intended for users to navigate to main pages.
 */
const FooterController = () => {
  const path = window.location.pathname
  const [currentPage, setCurrentPage] = useState(path)
  const { data } = useApi(`notifications`)
  const [notificationsNumber, setNotificationsNumber] = useState(0)

  const onPageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    if (data) {
      setNotificationsNumber(data.length)
    }
  }, [data])

  return (
    <FooterView
      currentPage={currentPage}
      onPageChange={onPageChange}
      notificationsNumber={notificationsNumber}
    />
  )
}

export default FooterController
