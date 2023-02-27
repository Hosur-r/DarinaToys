import { useEffect } from "react";
import { useState } from "react";
// requests
import { ProductsReq } from "./productsReq";
// urls
import { productsUrl } from "../../UrlsComponent";

function Products() {

    const[products, setProducts] = useState([])

    useEffect(() => {
        ProductsReq(productsUrl, setProducts)
    }, [])

  return (
    <div className="Products">
                {products.map((item, idx) => {
                    return(
                        <div className="productCard" key={idx}>
                            <p>{item.title}</p>
                            <p>{item.price}</p>
                        </div>
                    )
                })}
    </div>
  );
}

export default Products;
