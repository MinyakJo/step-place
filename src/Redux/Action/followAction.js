import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { ANOTHER_IS_OPEN, IS_OPEN } from "./alertAction"
import { LEFT_BAR_GET } from "./leftBarAction"
import { FEED_DETAIL_GET } from "./feedAction"

export const FOLLOWER_GET = "FOLLOWER_GET"
export const FOLLOWING_GET = "FOLLOWING_GET"
export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const NOW_FEED = "NOW_FEED"
export const FOLLOW_RESET = "FOLLOW_RESET"
export const SEARCH_ACCOUNT_GET = "SEARCH_ACCOUNT_GET"

const followGet = (addr, url, page = 0) => async dispatch => {
    let leftData

    if(getCookie("index-token") === undefined){
        leftData = await fetch(`address/${addr}`, "GET", null)
    }else{
        leftData = await fetch(`address/${addr}?account_index=${getCookie("index-token")}`, "GET", null)
    }
    if(leftData.success){
        const data = await fetch(url, "GET", 
        null, 
        [
            { name: "account_index", query: leftData.profile_info.account_index },
            { name: "offset", query: page }
        ],
        { token: getCookie("access-token") })
        if(data.success && data.data.length !== 0){
            if(url === "following/follow"){
                dispatch({
                    type: FOLLOWER_GET,
                    data: data.data,
                    page: page
                })
            }else{
                dispatch({
                    type: FOLLOWING_GET,
                    data: data.data,
                    page: page
                })
            }
            dispatch({
                type: LEFT_BAR_GET,
                data: leftData.profile_info
            })
        }else{
            dispatch({
                type: ANOTHER_IS_OPEN,
                btnType: "oneBtn",
                text: "message",
                data: data
            })
        }
    }
}

const followUnFollow = (follow_index, feed_index, fetchType, addr) => async dispatch => {
    let data
    let leftData

    const isAddr = follow_index === undefined && feed_index === undefined ? true : false

    if(addr !== undefined){
        leftData = await fetch(`address/${addr}?account_index=${getCookie("index-token")}`, "GET", null)
    }

    if(!leftData?.success && addr !== undefined){
        return
    }

    if(fetchType === "unFollow"){
        data = await fetch("following", "DELETE", 
        { 
            following_index: isAddr ? leftData.profile_info.account_index : follow_index,
            account_index: getCookie("index-token")
        }, null,
        { token: getCookie("access-token") })
    }else{
        data = await fetch("following", "POST", 
        { 
            following_account_index: isAddr ? leftData.profile_info.account_index : follow_index,
            follow_account_index: getCookie("index-token")
        }, null,
        { token: getCookie("access-token") })
    }

    if(data.success){
        const followingData = await fetch("following", "GET", 
        null, 
        [
            { name: "account_index", query: leftData.profile_info.account_index },
            { name: "offset", query: 0 }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: FOLLOWING_GET,
            data: followingData.data,
            page: 0
        })

        const followData = await fetch("following/follow", "GET", 
        null, 
        [
            { name: "account_index", query: leftData.profile_info.account_index },
            { name: "offset", query: 0 }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: FOLLOWER_GET,
            data: followData.data,
            page: 0
        })

        if(addr !== undefined){
            const refLeftData = await fetch(`address/${addr}?account_index=${getCookie("index-token")}`, "GET", null)

            dispatch({
                type: LEFT_BAR_GET,
                data: refLeftData.profile_info
            })
        }

        if(feed_index !== undefined){
            const feedData = await fetch("feed/detail", "GET", null, 
            [
                { name: "feed_index", query: feed_index },
                { name: "account_index", query: follow_index },
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

        if(fetchType === "unFollow"){
            dispatch({
                type: ANOTHER_IS_OPEN,
                btnType: "oneBtn",
                text: "message",
                data: { message: "팔로잉을 취소 했습니다." }
            })
        }else{
            dispatch({
                type: IS_OPEN,
                text: "message",
                btnType: "oneBtn",
                data: { message: "팔로잉 했습니다" }
            })
        }
    }else{
        if(fetchType === "unFollow"){
            dispatch({
                type: ANOTHER_IS_OPEN,
                btnType: "oneBtn",
                text: "message",
                data: data
            })
        }else{
            dispatch({
                type: IS_OPEN,
                text: "message",
                btnType: "oneBtn",
                data: data
            })
        }
    }
}

const nowFeed = (index) => {
    return{
        type: NOW_FEED,
        index: index
    }
}

const followReset = () => {
    return{
        type: FOLLOW_RESET
    }
}



export { followGet, followUnFollow, nowFeed, followReset }