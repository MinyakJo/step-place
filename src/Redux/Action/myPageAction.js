import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { IS_OPEN } from "./alertAction"
import { LEFT_BAR_GET } from "./leftBarAction"

export const MY_ACCOUNT_GET  = "MY_ACCOUNT_GET"
export const MY_ACCOUNT_PUT = "MY_ACCOUNT_PUT"

export const NOTICE_LIST_GET = "NOTICE_LIST_GET"
export const NOTICE_GET = "NOTICE_GET"

const myAccountGet = () => async dispatch => {
    const data = await fetch("my_account", "GET", null, {
        name: "account_index",
        query: getCookie("index-token")
    },{
        "token": getCookie("access-token")
    })

    dispatch({
        type: MY_ACCOUNT_GET,
        data: data
    })
}

const myAccountProfileImgUpload = (img) => async dispatch => {
    const data = await fetch("account/profile", "PUT",
    {
        account_index: getCookie("index-token"),
        profile: img,
    }, null,
    {
        token: getCookie("access-token"),
        "Content-Type": "multipart/form-data"
    })
    if(data.success){
        dispatch({
            type: IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "프로필 사진을 변경했습니다." }
        })

        const refData = await fetch("my_account", "GET", null, {
            name: "account_index",
            query: getCookie("index-token")
        },{
            "token": getCookie("access-token")
        })
        dispatch({
            type: MY_ACCOUNT_GET,
            data: refData
        })

        const leftData = await fetch("account", "GET", null, 
        [
            { name: "account_index", query: getCookie("index-token")},
            { name: "following_account_index", query: getCookie("index-token") }
        ], 
        { "token": getCookie("access-token") })

        dispatch({
            type: LEFT_BAR_GET,
            data: leftData.data
        })
    }
}

const myAccountIsPrivate = (bool) => async dispatch => {
    const data = await fetch("my_account/is_disabled","PUT", {
        "account_index": getCookie("index-token"),
        "is_disabled": bool
    }, null, {
        "token": getCookie("access-token")
    })
    
    if(data.success){
        dispatch({
            type: MY_ACCOUNT_PUT,
            bool: bool,
        })
    }
}

const noticeListGet = (page = 0) => async dispatch => {
    const data = await fetch(`notice?offset=${page}`, "GET", null, null, { "token": getCookie("access-token") })

    if(data.success && data.data.length !== 0){
        dispatch({
            type: NOTICE_LIST_GET,
            data: data,
            page: page
        })
    }
}
const noticeGet = (index) => async dispatch => {
    const data = await fetch("notice/detail", "GET", null, { "name": "notice_index", "query": index },
    { "token": getCookie("access-token") })

    if(data.success){
        dispatch({
            type: NOTICE_GET,
            data: data
        })
    }
}

export { myAccountGet, myAccountIsPrivate, myAccountProfileImgUpload,
         noticeListGet, noticeGet }