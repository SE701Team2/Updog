import DashboardPageView from './DashboardPageView'
import useApi from '../../hooks/useApi'

/**
 * This page renders a page which displays posts from user's followers. Each post is
 * displayed in a condensed view. Refer to PostView Component for more details
 */
const DashboardPageController = () => {
    const { data, loading, err } = useApi('/feed')

    if (loading) {
        return <div>Loading...</div>
    }

    if (err) {
        return <div>Error: {err}</div>
    }

    return <DashboardPageView feedData={data} />
}

export default DashboardPageController
