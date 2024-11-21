import axios from 'axios'

// Create an Axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
})

// Add a request interceptor to handle URLs
http.interceptors.request.use(
  async (config) => {
    if (config.url === '/login') {
      await http.get('/sanctum/csrf-cookie')
    }
    // Delay the request by 300ms
    if (config.method === 'post' || config.method === 'put') {
      return new Promise((resolve) => setTimeout(() => resolve(config), 300))
    }
    
    return config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
