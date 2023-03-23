import api from "../../interceptor"
import { useNavigate } from "react-router-dom"



export const MakePurchaise = async(url, basketProducts) => {
    const navigate = useNavigate()
    await api.post(url, 
        {   
            items:basketProducts.map((el => {return({"toy":el.id, "quantity":1})}))      
        })

        if(localStorage.getItem('status') === "ok"){
            await api.post(url, 
                {   
                    items:basketProducts.map((el => {return({"toy":el.id, "quantity":1})}))   
                })
            localStorage.removeItem("status")
        } 
    navigate('/profile')
}