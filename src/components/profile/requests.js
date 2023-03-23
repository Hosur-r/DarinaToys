import api from "../../interceptor"

export const getPurchase = async(url, purchaseData) => {
    await api.get(url)
    .then(data => {
        purchaseData(data.data)
    })
    if(localStorage.getItem('status') === "ok"){
        await api.get(url)
        .then(data => {
            purchaseData(data.data)
        })
        localStorage.removeItem("status")
    }
}

export const handlerSubmit = async(comm, mark, url) => {
    await api.post(url, 
       {
        'comment': `${comm}`,
        'mark': mark,
        'toy': 1
    }) 
    if(localStorage.getItem('status') === "ok"){
        await api.post(url, 
            {
             'comment': `${comm}`,
             'mark': mark,
             'toy': 1
         }) 
        localStorage.removeItem("status")
    } 
}