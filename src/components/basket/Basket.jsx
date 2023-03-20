import { useEffect, useState } from "react"
import "./basketStyle.css"
import api from "../../interceptor"
import { purchaseUrl } from "../../UrlsComponent"
import { useNavigate } from "react-router-dom"

function Basket(){

    const [basketProducts, setBasketProducts] = useState([])
    let quantity = 1;
    const navigate = useNavigate()

    useEffect(() => {
      const arr = JSON.parse(localStorage.getItem("purchase"))
        if(arr !== null){
            setBasketProducts(arr)
        }
    }, [])


    const MakePurchaise = async(url) => {
        let arrCount = 0
        const array = []

        await api.post(url, 
            {   
                items:[
                        basketProducts.map((el) => array[arrCount++] =  {
                        'toy':el.id,
                        'quantity': 1,
                        })
                    ]
            })

            if(localStorage.getItem('status') === "ok"){
                await api.post(url, 
                    {   
                        items:[
                                basketProducts.map((el) => array[arrCount++] =  {
                                'toy':el.id,
                                'quantity': 1,
                                })
                            ]
                    })
                localStorage.removeItem("status")
            } 
        navigate('/profile')
    }


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

            <button onClick={() => {MakePurchaise(purchaseUrl)}}>Сделать заказ</button>
        </div>
    )
}

export default Basket