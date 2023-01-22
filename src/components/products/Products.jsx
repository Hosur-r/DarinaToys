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
            setTimeout(() => {
                setProducts(data.data)
                setIsLoading(false)
            }, 1000)
           
        })
    }, [])

    return(
        <div className="productsContainer">
            {isLoading ? [new Array(6).map((_, idx) => <ProductsSkeleton key={idx}/>)]
            : products.map((item, idx) => {
                return(
                <div className="product" key={idx}>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                </div>
                )
            })}
        </div>
    )
}

export default Products