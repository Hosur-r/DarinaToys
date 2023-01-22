import axios from 'axios';


export const Register = async(login, email, psw, url) => {
    await axios.post(url, 
        JSON.stringify({
          name: login,
          email:email,
          password:psw
        })
      )
      .then((data) => {
        localStorage.setItem("access", data.data.access)
        localStorage.setItem("refresh", data.data.refresh)
      })
}



export const Authorization = async(login, psw, url) => {
    await axios.post(url, 
        JSON.stringify({
          name:login,
          password:psw
        })
      )
      .then((data) => {
        localStorage.setItem('access', data.data.access)
        localStorage.setItem('refresh', data.data.refresh)
      })
}