import axios from "axios"
import Refresh from "./request"

const api = axios.create()

api.interceptors.request.use(  config => {
    if(localStorage.getItem('access')){
        config.headers = {
            'Authorization':`Bearer ${localStorage.getItem('access')}`
        }
    }
    return config;

  },  error => {
        if(error.response.status === 401){
            Refresh()
        }}
  )


  api.interceptors.response.use(  response => {
    if(localStorage.getItem('access')){
        response.headers = {
            'Authorization':`Bearer ${localStorage.getItem('access')}`
        }
    }
    return response;

  }, async error => {
        if(error.response.status === 401){
            await Refresh()
        }}
  )

  export default api