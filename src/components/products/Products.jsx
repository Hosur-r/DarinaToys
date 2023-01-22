import "./productStyle.css"
import ProductsSkeleton from "./Skeleton"
import { useEffect } from "react"
import axios from "axios"
import {allToysUrl} from "../../UrlsComponent"
import { useState } from "react"

function Products(){

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`${allToysUrl + false}`)
        .then(data => {
            setProducts(data.data)
                setIsLoading(false)
        })
    }, [])

    return(
        <div className="productsContainer">
            { isLoading ? Array.apply(null, new Array(12)).map((_, idx) => {return  <ProductsSkeleton key={idx}/>})
                :  
            products.map((item, idx) => {
                return(
                            <div className="product" key={idx}>
                                <div className="productWrap">
                                    <img className="productImage" src="/images/Mimizaika.jpg" alt="" />
                                </div>
                                <div className="productInfo">
                                    <p className="productTitle">{item.title}</p>
                                    <p className="productPrice">{item.price} ₽</p>
                                </div>
                            </div>
                        )
            })}
        </div>  
        )
}

export default Products