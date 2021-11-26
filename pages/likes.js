import { useGetLikes } from '../hooks/useGetLikes'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { People } from '../components/People'
import { DataError } from '../components/DataError'

const LikesPage = () => {
  const { data, error, loading } = useGetLikes()

  if (error)
    return (
      <Layout>
        <DataError />
      </Layout>
    )

  if (loading)
    return (
      <Layout withNavigation>
        <p>Loading...</p>
      </Layout>
    )

  return (
    <Layout withNavigation>
      <People people={data?.results ?? []} />
    </Layout>
  )
}

export default withAuth(LikesPage)
