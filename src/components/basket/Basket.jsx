import { useEffect, useState } from "react"
import "./basketStyle.css"

function Basket(){

    const [basketProducts, setBasketProducts] = useState([])
    const [quantity, setQuantity] = useState([])

    useEffect(() => {
      const arr = JSON.parse(localStorage.getItem("purchase"))
        if(arr !== null){
            setBasketProducts(arr)
        }
    }, [])


    const MakePurchaise = () => {
        console.log(basketProducts)
        let arrCount = 0
        const array = []
        basketProducts.map((el) => array[arrCount++] = {
            'toy':el.id,
            'quantity': 1,
        })
        console.log(array)
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
                            <input type="number" className="productQuantity" min={1} step={1} value={quantity} onChange={(e) => {setQuantity(e.target.value)}}></input>
                        </div>

                  
                    </div>
                )
            })}

            <button onClick={() => {MakePurchaise()}}>Сделать заказ</button>
        </div>
    )
}

export default Basket