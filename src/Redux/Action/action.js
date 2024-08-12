import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie.js"
import { LOGOUT } from "./loginAction"

export const USER_DATA = "USER_DATA"

const userData = () => async dispatch => {
    if(getCookie("access-token") === undefined){
        dispatch({
            type: USER_DATA,
            data: null
        })
        return
    }
    const data = await fetch("account", "GET", null, 
    [
        { query: getCookie("index-token"), name: "account_index"},
        { query: getCookie("index-token"), name: "following_account_index" }
    ],
    {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: USER_DATA,
            data: data.data
        })
    }else{
        if(data.token === "none"){
            dispatch({
                type: LOGOUT
            })
        }
    }
}

export { userData }