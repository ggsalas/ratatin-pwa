import { useGetToken } from '../hooks/useToken'
import Login from '../pages/login'

export const withAuth = (Component) => {
  const Auth = (props) => {
    const token = useGetToken()

    // If user is not logged in, go to login
    if (token === null) {
      return <Login />
    }

    if (token === undefined) {
      return <p>Loading...</p>
    }

    // If user is logged in, return original component
    return <Component {...props} />
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}
