import axios from "axios"

async function Refresh () {
    await axios.post('https://uni-team-inc.online/api/v1/user/refresh/', 
       {
        'refresh':localStorage.getItem('refresh')
       }
    )
    .then(data => {
        localStorage.setItem('access', data.data.access)
    })

}

export default Refresh