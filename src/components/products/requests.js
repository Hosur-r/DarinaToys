import axios from "axios"

export const productReq = async(url, key, setData) => {
    await axios.get(url + key + "/")    
        .then(data => {
            setData(data.data)
        })
} 