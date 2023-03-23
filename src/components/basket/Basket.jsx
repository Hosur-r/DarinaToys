import { useEffect, useState } from "react"
import "./basketStyle.css"
import { purchaseUrl } from "../../UrlsComponent"
import { MakePurchaise } from "./requests"

function Basket(){

    const [basketProducts, setBasketProducts] = useState([])
    let quantity = 1;

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
                    <div className="basketProduct" key={idx}>
                        <div className="productImageBasketWrap">
                            <img className="productImage" src={item.photos[0].photo ? item.photos[0].photo : ''} alt="" width={300} height={300}/>
                        </div>
                        <div className="productDescBasketWrap">
                            <p className="productTitle">{item.title}</p>
                            <p className="productPrice">{item.price}</p>
                            <div className="productQuantity">
                                <button onClick={() => {quantity+=1}}>+</button>
                                <button onClick={() => {quantity-=1}}>-</button>
                                <p>Колличество: {quantity}</p>
                            </div>
                        </div>

                  
                    </div>
                )
            })}
            <button onClick={() => {MakePurchaise(purchaseUrl, basketProducts)}}>Сделать заказ</button>
        </div>
    )
}

export default Basket