import axios from 'axios'
import jwtDecode from 'jwt-decode'

axios.interceptors.request.use(
  async config => {
    let accessToken = localStorage.getItem('access')

    if (accessToken) {
      const { exp } = jwtDecode(accessToken)

      // Check if the access token is expired
      if (Date.now() >= exp * 1000) {
        // Remove the token so the refresh request does not infinitely loop
        localStorage.removeItem('access')

        // Get the new access token with the refresh token
        const refresh = localStorage.getItem('refresh')
        const res = await axios.post('/api/auth/refresh/', { refresh })
        const { access } = res.data

        localStorage.setItem('access', access)
        accessToken = access
      }

      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => Promise.reject(error)
)
