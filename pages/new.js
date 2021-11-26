import { useGetPeople } from '../hooks/useGetPeople'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { People } from '../components/People'
import { DataError } from '../components/DataError'

const NewPeoplePage = () => {
  const { data, error, loading } = useGetPeople()

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
      <People people={data?.results ?? []} />
    </Layout>
  )
}

export default withAuth(NewPeoplePage)
