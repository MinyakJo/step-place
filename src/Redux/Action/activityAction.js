import { FEED_GET } from "./feedAction"
import { getCookie } from "../../Hooks/cookie"
import fetch from "../../Hooks/fetch"
import { ACT_COMMENT_LIST_GET } from "./commentAction"

export const ACTIVITY_TYPE_SELECTED = "ACTIVITY_TYPE_SELECTED"

const feedActivityListGet = (urlType, page = 0) => async dispatch => {
    const data = await fetch(`my_active/${urlType}`, "GET", null, 
    [
        { name: "account_index", query: getCookie("index-token") },
        { name: "offset", query: page }
    ], 
    { token: getCookie("access-token") })

    if(data.success && data.data.length !== 0){
        dispatch({
            type: FEED_GET,
            data: data.data,
            page: page
        })
    }
}

const commentActivityListGet = (page = 0) => async dispatch => {
    const data = await fetch("my_active/comment_list", "GET", null,
    [
        { name: "account_index", query: getCookie("index-token") },
        { name: "offset", query: page }
    ],
    { token: getCookie("access-token") })

    if(data.success && data.data.length !== 0){
        dispatch({
            type: ACT_COMMENT_LIST_GET,
            data: data.data,
            page: page,
        })
    }
}

const activityTypeSelected = (text) => {
    return{
        type: ACTIVITY_TYPE_SELECTED,
        text: text
    }
}

export { feedActivityListGet, activityTypeSelected, commentActivityListGet }