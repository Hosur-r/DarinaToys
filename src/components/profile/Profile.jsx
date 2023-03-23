import { useEffect, useState } from "react"
import { commentsUrl, purchaseUrl } from "../../UrlsComponent"
import { getPurchase, handlerSubmit } from "./requests"

function Profile() {

    const [comment, setComment] = useState('')
    const [mark, setMark] = useState(5)
    const [purchase, setPurchase] = useState([])

    useEffect(() => {
        getPurchase(purchaseUrl,setPurchase)
    }, [])

    return (
        <div className="">
            
                <label htmlFor="comment">Комментарий</label>
                    <textarea name="comment" cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <label htmlFor="mark">Оценка</label>
                    <input name="mark" type="number" max={5} min={1} value={mark} onChange={(e) => setMark(e.target.value)}/>
                    <button onClick={() => handlerSubmit(comment, mark, commentsUrl)}>SEND</button>
            {
                purchase?.map((item, idx) => {
                    return(
                        <div className="items" key={idx}>
                            <p>{item.status}</p>
                            <p>{item.total_price}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Profile