import { useGetLikes } from '../hooks/useGetLikes'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { People } from '../components/People'

const LikesPage = () => {
  const { data, error, loading } = useGetLikes()

  if (error)
    return (
      <Layout>
        <p>Error getting data</p>
      </Layout>
    )

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )

  return (
    <Layout withNavigation>
      <People people={data?.results} />
    </Layout>
  )
}

export default withAuth(LikesPage)
