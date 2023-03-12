import { useEffect, useState } from "react"
import "./basketStyle.css"

function Basket(){

    const [basketProducts, setBasketProducts] = useState([])

    useEffect(() => {
      const arr = JSON.parse(localStorage.getItem("purchase"))
        if(arr !== null){
            setBasketProducts(arr)
        }
    }, [])



    return(
        <div className="basketWrap">
            {basketProducts?.map((item, idx) => {
                return (
                    <div className="" key={idx}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <img className="" src={item.photos[0].photo ? item.photos[0].photo : ''} alt="" width={300} height={300}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Basket