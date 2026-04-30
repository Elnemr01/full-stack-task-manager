
import axios from 'axios'

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})


client.interceptors.response.use((res)=> res,
    (err)=>{
        if(err.response.status === 401) {
            localStorage.removeItem("user")
            localStorage.removeItem("userToken")
            window.location.href = "/login"
        }
    }
)

client.interceptors.request.use((config)=> {
    const token = localStorage.getItem("userToken");
    if(token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})


export default client


