import { useState } from "react"
import api from "../../interceptor"
import { commentsUrl } from "../../UrlsComponent"

function Profile() {

    const [comment, setComment] = useState('')
    const [mark, setMark] = useState(5)

    const handlerSubmit = (comm, mark, url) => {
        api.post(url, 
            JSON.stringify({
            'comment': comm,
            'mark': mark,
            'toy': 1
        }))
    }

    return (
        <div className="">
            
                <label htmlFor="comment">Комментарий</label>
                    <textarea name="comment" cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <label htmlFor="mark">Оценка</label>
                    <input name="mark" type="number" max={5} min={1} value={mark} onChange={(e) => setMark(e.target.value)}/>
                    <button onClick={() => handlerSubmit(comment, mark, commentsUrl)}>SEND</button>
           

        </div>
    )
}

export default Profile