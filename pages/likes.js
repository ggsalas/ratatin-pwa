import Head from 'next/head'
import { useGetLikes } from '../hooks/useGetLikes'
import { Layout } from '../components/Layout'
import { withAuth } from '../components/withAuth'
import { Likes } from '../components/Likes'

function LikesPage() {
  const { data, error, loading } = useGetLikes()

  if (error || (!loading && !data))
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
      <Head>
        <title>RataTin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Likes likes={data?.results} />
    </Layout>
  )
}
export default withAuth(LikesPage)
