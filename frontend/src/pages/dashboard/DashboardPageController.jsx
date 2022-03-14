import DashboardPageView from './DashboardPageView'
import sampleFeed from './mock-dashboard-data'

/**
 * This page renders a page which displays posts from user's followers. Each post is
 * displayed in a condensed view. Refer to PostView Component for more details
 */
const DashboardPageController = () => (
    <DashboardPageView feedData={sampleFeed} />
)

export default DashboardPageController
