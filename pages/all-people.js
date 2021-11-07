import { useGetAllPeople } from '../hooks/useGetAllPeople'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { People } from '../components/People'
import { DataError } from '../components/DataError'

const AllPeoplePage = () => {
  const { data, error, loading } = useGetAllPeople()

  if (error)
    return (
      <Layout withNavigation>
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
      <People people={data?.results} />
    </Layout>
  )
}

export default withAuth(AllPeoplePage)
