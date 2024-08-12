import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"

export const LEFT_BAR_GET = "LEFT_BAR_GET"
export const LEFT_BAR_OPEN = "LEFT_BAR_OPEN"
export const LEFT_BAR_SELECTED = "LEFT_BAR_TYPE_SELECTED"

const leftBarGet = (index = null) => async dispatch => {
    if(index === null && getCookie("access-token") === undefined){
        dispatch({
            type: LEFT_BAR_GET,
            data: null
        })
        return
    }else if(index === null){
        index = getCookie("index-token")
    }
    const data = await fetch("account", "GET", null, 
    [
        { name: "account_index", query: getCookie("index-token")},
        { name: "following_account_index", query: index }
    ], 
    { "token": getCookie("access-token") })

    dispatch({
        type: LEFT_BAR_GET,
        data: data.data
    })
}

const leftBarReset = () => {
    return{
        type: LEFT_BAR_GET,
        data: "reset"
    }
}

const leftBarOpen = (bool) => {
    return{
        type: LEFT_BAR_OPEN,
        bool: bool
    }
}

const leftBarSelected = (text) => {
    return{
        type: LEFT_BAR_SELECTED,
        text: text
    }
}

export { leftBarGet,  leftBarOpen, leftBarSelected, leftBarReset }