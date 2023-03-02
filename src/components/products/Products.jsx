import "./productStyle.css"
import ProductsSkeleton from "./Skeleton"
import { useEffect } from "react"
import axios from "axios"
import {productsUrl, productUrl} from "../../UrlsComponent"
import { useState } from "react"
import ProductModal from "../../ProductModalWin/ModalWin"

function Products(){

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModal, setModal] = useState(false);
    let content = <div className="productModalContent">
        <p>{product.title}</p>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <p>{product.materials}</p>
    </div>

    useEffect(() => {
        axios.get(productsUrl)
        .then(data => {
            setProducts(data.data)
                setIsLoading(false)
        })
    }, [])


    const modalProduct = async(url) => {
            // await axios.get(`${url + item.pk}`)         // pk НЕ РОБИТ
            // .then(data => {
            //     setProduct(data.data)
            // })

            // setModal(true)
    }


    return(
        <div className="productsContainer">
            { isLoading ? Array.apply(null, new Array(12)).map((_, idx) => {return  <ProductsSkeleton key={idx}/>})
                :  
            products.map((item, idx) => {
                return(
                            <div className="product" key={idx}>
                                <div className="productWrap" onClick={() => modalProduct(productUrl)}>
                                    <img className="productImage" src="/images/Mimizaika.jpg" alt="" />
                                </div>
                                <div className="productInfo">
                                    <p className="productTitle">{item.title}</p>
                                    <p className="productPrice">{item.price} ₽</p>
                                </div>
                                <button className="busketBtn">Добавить в корзину</button>
                            </div>
                        )
            })}

                <ProductModal
                    isVisible={isModal}
                    title={"title"}
                    content={content}
                    footer={"footer"}
                    onClose={() => setModal(false)}
                />


        </div>  
        )
}

export default Products