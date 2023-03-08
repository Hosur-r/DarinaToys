import axios from 'axios';

export const Register = async(login, email, psw, url) => {
    await axios.post(url, 
      JSON.stringify({username:login,email:email,password:psw}), 
      {headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }}
      )
      .then((data) => {
        localStorage.setItem("access", data.data.access)
        localStorage.setItem("refresh", data.data.refresh)
      })
}



export const Authorization = async(login, psw, url) => {
    await axios.post(url, JSON.stringify({username:login,password:psw}),
    {headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    }}
    )
      .then((data) => {
        localStorage.setItem('access', data.data.access)
        localStorage.setItem('refresh', data.data.refresh)
      })
}   