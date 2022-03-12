import React from "react"
import FooterView from "./FooterView"

const FooterController = () => {    
    const path = window.location.pathname;
    const [currentPage, setCurrentPage] = React.useState(path);
    const onPageChange = (event, newPage) => {
        setCurrentPage = newPage;
    }
    return <FooterView currentPage={currentPage} onPageChange={onPageChange}  />
}
    

export default FooterController
