import axios from 'axios';


export const Register = async(name, email, psw, url) => {
    await axios.post('http://uni-team-inc.online:8080/register', 
        JSON.stringify({
          name: name,
          email:email,
          password:psw
        })
      )
      .then((data) => {
        localStorage.setItem("access", data.data.access)
        localStorage.setItem("refresh", data.data.refresh)
      })
}



export const Authorization = async(name, psw, url) => {
    await axios.post('http://uni-team-inc.online:8080//authorize', 
        JSON.stringify({
          name:name,
          password:psw
        })
      )
      .then((data) => {
        localStorage.setItem("access", data.data.access)
        localStorage.setItem("refresh", data.data.refresh)
      })
}