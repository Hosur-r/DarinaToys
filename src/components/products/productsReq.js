import axios from "axios"

export const ProductsReq = async(url, setProduct) => {
    await axios.get(url)
      .then((data) => {
            setProduct(data.data)
      })
}