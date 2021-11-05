import { useGetPeople } from '../hooks/useGetPeople'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { People } from '../components/People'

const NewPeoplePage = () => {
  const { data, error, loading } = useGetPeople()

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
    <Layout>
      <People people={data?.results} />
    </Layout>
  )
}

export default withAuth(NewPeoplePage)
