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
    let ImageOffset = 0;
    let CommOfset = 0;
    let imageCounter = 0;
    let commCounter = 0;
    let productsCounter = 1;
    let arr = [];
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
                            <button className="productModalBtn" onClick={() => {
                                        const purchaseTest = JSON.parse(localStorage.getItem("purchase"))
                                        const productsCounterTest = localStorage.getItem("productsCounter")

                                            if(purchaseTest && productsCounterTest !== null){
                                                arr = purchaseTest
                                                arr.push(product)
                                                localStorage.setItem("purchase", JSON.stringify(arr))
                                                    productsCounter = productsCounterTest
                                                    productsCounter++
                                                    localStorage.setItem("productsCounter", productsCounter++)
                                            }
                                            else{
                                                arr.push(product)
                                                localStorage.setItem("purchase", JSON.stringify(arr))
                                                localStorage.setItem("productsCounter", productsCounter++)
                                            }
                            }}>Добавить в корзину</button>
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


    return(
        <div className="productsContainer">
            { isLoading ? Array.apply(null, new Array(12)).map((_, idx) => {return  <ProductsSkeleton key={idx}/>})
                :  
            products.map((item, idx) => {
                return(
                            <div className="product" key={idx} onClick={() => modalProduct(item.id)}>
                                <div className="productWrap">
                                    <img className="productImage" src={item.photos[0].photo ? item.photos[0].photo : ''} alt="" />
                                </div>
                                
                                <p className="productTitle">{item.title}</p>
                                <p className="productPrice">{item.price} ₽</p>
                                <svg className="productArrow" width="71" height="6" viewBox="0 0 71 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M70.2475 3.24749C70.3842 3.1108 70.3842 2.8892 70.2475 2.75251L68.0201 0.525126C67.8834 0.388443 67.6618 0.388443 67.5251 0.525126C67.3884 0.66181 67.3884 0.883418 67.5251 1.0201L69.505 3L67.5251 4.9799C67.3884 5.11658 67.3884 5.33819 67.5251 5.47487C67.6618 5.61156 67.8834 5.61156 68.0201 5.47487L70.2475 3.24749ZM0 3.35H70V2.65H0V3.35Z" fill="black"/>
                                </svg>
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