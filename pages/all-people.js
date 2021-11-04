import { useGetAllPeople } from '../hooks/useGetAllPeople'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { Likes } from '../components/Likes'

const AllPeoplePage = () => {
  const { data, error, loading } = useGetAllPeople()

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

  if (!data)
    return (
      <Layout>
        <p>No data</p>
      </Layout>
    )

  return (
    <Layout>
      <Likes likes={data?.results} />
    </Layout>
  )
}

export default withAuth(AllPeoplePage)
