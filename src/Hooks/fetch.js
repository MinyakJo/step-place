import axios from "axios"
import { getCookie, delCookie } from "./cookie"

async function fetch(url, type, body = null, query = null, headers = null){
    let fetchData = null
    let fetchURL = `${process.env.REACT_APP_URL}/${url}`
    if(query !== null){
        if(query.length === undefined){
            fetchURL += `?${query.name}=${query.query}`
        }else{
            fetchURL += `?${query[0].name}=${query[0].query}`
            for(let i = 1; i < query.length; i++){
                fetchURL += `&${query[i].name}=${query[i].query}`
            }
        }
    }
    try{
        fetchData = await axios({
            method: type,
            url: fetchURL,
            data: body,
            headers: headers, 
        })
        .then((response) => {
            return response.data
        })
    }catch (err){
        return err
    }

    if(!fetchData.success && (fetchData.message === "token_expire" || fetchData.message === "token_not_verified")){
        delCookie("access-token")
        delCookie("index-token")
    }
    return fetchData
}

export default fetch