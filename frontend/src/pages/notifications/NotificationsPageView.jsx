import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'

const NotificationsPageView = ({ body }) => (
    <div>
        <Header />
        {body}
        <Footer />
    </div>
)

export default NotificationsPageView
