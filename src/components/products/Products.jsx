import "./productStyle.css"
import ProductsSkeleton from "./Skeleton"
import { useEffect } from "react"
import axios from "axios"
import {productsUrl, productUrl} from "../../UrlsComponent"
import { useState } from "react"
import ProductModal from "../productModalWin/ModalWin"
import { productReq } from "./requests"

function Products(){

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModal, setModal] = useState(false);


    let content = 
        <div className="">
            <div className="productModalContent">
                <img className="productModalPhoto" src={product.photos?.map((item) => item.photo)} alt="" width={100} height={100} /> {/* Картинка игрушки */}
                <p className="productModalTitle">{product.title}</p>    
                <div className="productModalDesc" dangerouslySetInnerHTML={createMarkup(product.description)} />   {/* Описание */}
                <p className="productModalMaterials">{product.materials?.map((item) => item.title)}</p>               {/* Материалы игрушки */}
                <p className="productModalPrice">{product.price} ₽</p>     {/* Цена */}
            </div>

            <div className="productModalComments">{product.comments?.map((item,idx) =>{         {/* Комментарии к игрушке */}
                return (
                        <div className="" key={idx}>
                            <p>{item.comment}</p>
                        </div>         
                    )
                })}
            </div> 
        </div>


    useEffect(() => {
        axios.get(productsUrl)
        .then(data => {
            setProducts(data.data)
                setIsLoading(false)
        })
    }, [])

        function createMarkup(text) {
        return {__html: text}
        }
        
    const modalProduct = async(key) => {
        await productReq(productUrl, key, setProduct)
        setModal(true)
    }


    return(
        <div className="productsContainer">
            { isLoading ? Array.apply(null, new Array(12)).map((_, idx) => {return  <ProductsSkeleton key={idx}/>})
                :  
            products.map((item, idx) => {
                return(
                            <div className="product" key={idx}>
                                <div className="productWrap" onClick={() => modalProduct(item.pk)}>
                                    <img className="productImage" src={item.photos[0].photo} alt="" />
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
                    title={<></>}
                    content={content}
                    footer={<></>}
                    onClose={() => setModal(false)}
                />


        </div>  
        )
}

export default Products