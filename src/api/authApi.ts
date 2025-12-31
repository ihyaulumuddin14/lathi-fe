import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export default authApi;