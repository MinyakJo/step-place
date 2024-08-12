import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { ANOTHER_IS_OPEN, IS_OPEN } from "./alertAction"
import { POSTING_EDIT } from "./postingAction"
import { LEFT_BAR_GET, LEFT_BAR_SELECTED } from "./leftBarAction"
import { MORE_VIEW_SELECTED } from "./topBarAction"

export const FEED_GET = "FEED_GET"
export const FEED_DETAIL_GET = "FEED_DETAIL_GET"
export const IS_PRIVATE = "IS_PRIVATE"
export const IMG_CHANGE = "IMG_CHANGE"
export const FEED_MORE_VIEW_OPEN = "FEED_MORE_VIEW_OPEN"
export const FEED_MORE_VIEW_SELECTED = "FEED_MORE_VIEW_SELECTED"
export const FEED_DETAIL_RESET = "FEED_DETAIL_RESET"
export const FEED_RESET = "FEED_RESET"

const feedDetailReset = () => {
    return{
        type: FEED_DETAIL_RESET
    }
}

const feedReset = () => {
    return{
        type: FEED_RESET
    }
}

const feedGet = (index = null, page = 0) => async dispatch => {
    let data

    if(index !== "main"){
        data = await fetch("feed", "GET", null, 
        [
            { name: "account_index", query: index }, 
            { name: "offset" , query: page }
        ],
        { token: getCookie("access-token") })
    }else{
        data = await fetch("main_page", "GET", null,
        { query: page, name: "offset" })
    }

    if(data.success){
        dispatch({
            type: FEED_GET,
            data: data.data,
            page: page
        })
    }
}

const myFeedGet = (index , page = 0) => async dispatch => {
    const data = await fetch("feed/photo", "GET", null,
        [
            { name: "account_index", query: index },
            { name: "is_mine", query: getCookie("index-token") === index? true: false },
            { name: "offset" , query: page }
        ],
        { token: getCookie("access-token") })
    if(data.success && data.data.length !== 0){
        dispatch({
            type: FEED_GET,
            data: data.data,
            page: page
        })
        dispatch({
            type: IS_PRIVATE,
            is_disabled: data.is_disabled
        })
    }
}

const feedDetailGet = (index, account_index) => async dispatch => {
    let data
    if(getCookie("index-token") !== undefined){
        data = await fetch("feed/detail", "GET", null, 
        [
            { name: "feed_index", query: index },
            { name: "account_index", query: account_index },
            { name: "view_feed_account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
    }else{
        data = await fetch("feed/detail/nologin", "GET", null,
        [
            { name: "feed_index", query: index },
            { name: "account_index", query: account_index },
        ])
    }

    if(data.success){
        dispatch({
            type: FEED_DETAIL_GET,
            data: data.data,
            isFollowing: data.is_following,
            isThx: data.is_thanks,
            isScrap: data.is_scrap,
            isOpen: data.is_open
        })
        dispatch({
            type: POSTING_EDIT,
            data: data.data
        })
    }else{
        dispatch({
            type: FEED_DETAIL_GET,
            data: null
        })
    }
}

const feedBtnFetch = (fetchData, fetchUrl, fetchType) => async dispatch => {
    
    const data = await fetch(`my_active/${fetchUrl}`, fetchType,
    fetchUrl === "thanks" 
    ?{ 
        "thanks_feed_index": fetchData.feed_index,
        "feed_account_index": fetchData.account_index,
        "account_index": getCookie("index-token"),
    }:{
        "scrap_feed_index": fetchData.feed_index,
        "feed_account_index": fetchData.account_index,
        "account_index": getCookie("index-token"),
    }, null,
    { token: getCookie("access-token") })
    if(data.success){
        const feedData = await fetch("feed/detail", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index },
            { name: "account_index", query: fetchData.account_index },
            { name: "view_feed_account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: FEED_DETAIL_GET,
            data: feedData.data,
            isFollowing: feedData.is_following,
            isThx: feedData.is_thanks,
            isScrap: feedData.is_scrap
        })
    }
}

const feedBtnUpload = (fetchData, fetchUrl, fetchType) =>async dispatch => {
    const data = await fetch(`my_active/${fetchUrl}`, fetchType,
    {
        "feed_index": fetchData.feed_index,
        "feed_account_index": fetchData.account_index,
        "account_index": getCookie("index-token"),
    }, null,
    { token: getCookie("access-token") })
    if(data.success){
        const feedData = await fetch("feed/detail", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index },
            { name: "account_index", query: fetchData.account_index },
            { name: "view_feed_account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: FEED_DETAIL_GET,
            data: feedData.data,
            isFollowing: feedData.is_following,
            isThx: feedData.is_thanks,
            isScrap: feedData.is_scrap
        })
    }
}

const feedDelete = (index) => async dispatch => {
    const data = await fetch("feed", "DELETE", { feed_index: index, account_index: getCookie("index-token") }, null,
    { token: getCookie("access-token") })
    
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "피드가 삭제 되었습니다." }
        })
    }else{
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const feedReport = (feed_index, account_index) => async dispatch => {

    const data = await fetch("feed/report_it", "POST",
    { 
        feed_index: feed_index,
        is_feed: true,
        account_index: account_index,
        report_account_index: getCookie("index-token"),
    }, null,
    { token: getCookie("access-token") })
    
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "신고가 접수 되었습니다." }
        })
        const feedData = await fetch("main_page?offset=0", "GET", null)
        if(feedData.success){
            dispatch({
                type: FEED_GET,
                data: feedData.data,
                page: 0
            })
        }else{
            dispatch({
                type: ANOTHER_IS_OPEN,
                text: "message",
                btnType: "oneBtn",
                data: data
            })
        }
    }else{
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const feedMoreView = (bool) => {
    return{
        type: FEED_MORE_VIEW_OPEN,
        bool: bool
    }
}

const feedMoreViewSelect = (text = "") => {
    return{
        type: FEED_MORE_VIEW_SELECTED,
        text: text
    }
}

const addrInfoGet = (addr, page = 0) => async dispatch => {

    let data

    if(getCookie("index-token") !== undefined){
        data = await fetch(`address/${addr}?account_index=${getCookie("index-token")}&offset=${page}`, "GET", null)
    }else{
        data = await fetch(`address/${addr}?offset=${page}`, "GET", null)
    }

    if(data.success){
        if(data.profile_info.account_index === Number(getCookie("index-token"))){
            if(data.feed_info !== null){
                const refData = await fetch("feed/photo", "GET", null,
                [
                    { name: "account_index", query: getCookie("index-token") },
                    { name: "is_mine", query: true },
                    { name: "offset", query: page }
                ],
                { token: getCookie("access-token") })
                if(refData.success && refData.data.length !== 0){
                    dispatch({
                        type: FEED_GET,
                        data: refData.data,
                        page: page
                    })
                    dispatch({
                        type: MORE_VIEW_SELECTED,
                        text: "myFeed",
                    })
                    dispatch({
                        type: LEFT_BAR_SELECTED,
                        text: "myFeed",
                    })
                }
            }
        }
        else{
            if(data.feed_info !== null){
                dispatch({
                    type: FEED_GET,
                    data: data.feed_info,
                    page: page
                })
            }
        }
        dispatch({
            type: LEFT_BAR_GET,
            data: data.profile_info,
        })
    }else{
        dispatch({
            type: LEFT_BAR_GET,
            data: data.profile_info,
        })
    }
}

export { feedGet, feedDetailGet, feedBtnFetch, 
         feedDelete, feedReport, 
         myFeedGet, feedBtnUpload,
         feedMoreView, feedMoreViewSelect, addrInfoGet,
         feedReset, feedDetailReset }