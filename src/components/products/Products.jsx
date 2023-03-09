import "./productStyle.css"
import ProductsSkeleton from "./Skeleton"
import { useEffect } from "react"
import axios from "axios"
import {productsUrl, productUrl} from "../../UrlsComponent"
import { useState } from "react"
import ProductModal from "../productModalWin/ModalWin"
import { productReq } from "./requests"

function Products(){

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModal, setModal] = useState(false);
    const [purchase, setPurchase] = useState({});
    let ImageOffset = 0;
    let CommOfset = 0;
    let imageCounter = 0;
    let commCounter = 0;
    let content = 
        <div className="">
            <div className="productModalContent">

                        <div className="productImageWrap">
                        
                                <div className="productModalPhotoWrap">
                                    {product.photos?.map((item, idx) => {
                                        imageCounter++
                                        return(
                                            <img className="productModalPhoto" key={idx} src={item.photo ? item.photo : ''} alt="" width={300} height={300} /> 
                                        )
                                    })} 
                                </div>
                    
                                <div className="productPhotoNav">
                                    <div className="navPrev" onClick={() => sliderPrev()}>&#10094;</div>
                                    <div className="navNext" onClick={() => sliderNext()}>&#10095;</div>
                                </div>
                        </div>
                    
                    
                    <div className="productDescWrap">
                        <p className="productModalTitle">{product.title}</p>    
                        <div className="productModalDesc" dangerouslySetInnerHTML={createMarkup(product.description)} />                       
                        <p className="productModalMaterials"> <b>Материалы:</b> {product.materials?.map((item) => item.title)}</p>             
                            
                        <div className="modalBucketWrap">
                            <button className="productModalBtn">Добавить в корзину</button>
                            <p className="productModalPrice">{product.price} ₽</p>                                                                  
                        </div>
                    </div>
            
            </div>

            <div className="productModalCommentsWrap">
                <div className="productModalComments">
                    {product.comments?.map((item,idx) =>{      
                        commCounter++                                          
                        return (
                            <div className="productModalComment" key={idx}>
                                <p>{item.comment}</p>
                            </div>         
                        )
                    })}
                </div> 

                <div className="productCommentsNav">
                    <div className="navPrevComment" onClick={() => sliderPrevComm()}>&#10094;</div>
                    <div className="navNextComment" onClick={() => sliderNextComm()}>&#10095;</div>
                </div>

            </div>
           
        </div>

    useEffect(() => {
        axios.get(productsUrl)
        .then(data => {
            setProducts(data.data)
                setIsLoading(false)
        })
    }, [])





    const sliderPrev = () => {
        const slider = document.querySelector('.productModalPhotoWrap')
        ImageOffset += 300
        if(ImageOffset > 0){ImageOffset = (imageCounter - 1)* -300}
                slider.style.left = ImageOffset + 'px'
    }

    const sliderNext = () => {
        const slider = document.querySelector('.productModalPhotoWrap')
        ImageOffset -= 300
            if(ImageOffset < (imageCounter - 1)* -300){ImageOffset = 0}
                slider.style.left = ImageOffset + 'px'
    }

    

    const sliderPrevComm = () => {
        const slider = document.querySelector('.productModalComments')
        CommOfset += 720
        if(CommOfset > 0){CommOfset = (commCounter - 1)* -720}
                slider.style.left = CommOfset + 'px'
    }

    const sliderNextComm = () => {
        const slider = document.querySelector('.productModalComments')
        CommOfset -= 720
            if(CommOfset < (commCounter - 1)* -720){CommOfset = 0}
                slider.style.left = CommOfset + 'px'
    }




    function createMarkup(text) {
        return {__html: text}
        }

    const modalProduct = async(key) => {
        await productReq(productUrl, key, setProduct)
        setModal(true)
    }

    const addProduct = (product) => {
        setPurchase(purchase, product)
    }




    return(
        <div className="productsContainer">
            { isLoading ? Array.apply(null, new Array(12)).map((_, idx) => {return  <ProductsSkeleton key={idx}/>})
                :  
            products.map((item, idx) => {
                return(
                            <div className="product" key={idx}>
                                <div className="productWrap" onClick={() => modalProduct(item.id)}>
                                    <img className="productImage" src={item.photos[0].photo ? item.photos[0].photo : ''} alt="" />
                                </div>
                                
                                <p className="productTitle">{item.title}</p>
                                
                                <div className="productInfo">
                                    <button className="busketBtn" onClick={() => addProduct(item)}>Добавить в корзину</button>
                                    <p className="productPrice">{item.price} ₽</p>
                                </div>
                                
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