import fetch from "../../Hooks/fetch"
import { IS_OPEN, ANOTHER_IS_OPEN } from "./alertAction"
import { FEED_DETAIL_GET } from "./feedAction"
import { getCookie } from "../../Hooks/cookie"

export const COMMENT_GET = "COMMENT_GET"
export const COMMENT_INPUT = "COMMENT_INPUT"
export const COMMENT_IS_PRIVATE = "COMMENT_IS_PRIVATE"
export const RE_COMMENT_INPUT_OPEN = "RE_COMMENT_INPUT_OPEN"
export const RE_COMMENT_INPUT = "RE_COMMENT_INPUT"
export const ACT_COMMENT_LIST_GET = "ACT_COMMENT_LIST_GET"
export const COMMENT_RESET = "COMMENT_RESET"

const commentReset = () => {
    return{
        type: COMMENT_RESET
    }
}

const commentGet = (feedIndex) => async dispatch => {

    const data = await fetch("comment", "GET", null, 
    [
        { name: "feed_index", query: feedIndex },
        { name: "account_index", query: getCookie("index-token") }
    ],
    { token: getCookie("access-token") })

    if(data.success){
        dispatch({
            type: COMMENT_GET,
            commentData: data.comment_data,
            reCommentData: data.reply_data
        })
    }
}

const commentInput = (text) => {
    return{
        type: COMMENT_INPUT,
        text: text
    }
}

const commentIsPrivate = (bool) => {
    return{
        type: COMMENT_IS_PRIVATE,
        bool: bool
    }
}

const commentDelete = (fetchData, delType = false) => async dispatch => {

    let data = null
    let message = ""
    if(delType){
        data = await fetch("reply", "DELETE", 
        {
            "reply_index": fetchData.re_comment_index,
            "feed_index": fetchData.feed_index,
        }, null,
        { token: getCookie("access-token") })
        message = "답글"
    }
    else{
        data = await fetch("comment", "DELETE", 
        { 
            "comment_index": fetchData.comment_index,
            "feed_index": fetchData.feed_index,
            "account_index": getCookie("index-token"),
            "is_feed": false 
        }, null,
        { token: getCookie("access-token") })
        message = "댓글"
    }

    if(data.success){
        const refData = await fetch("comment", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index },
            { name: "account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })

        const refFeedData = await fetch("feed/detail", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index, },
            { name: "account_index", query: fetchData.account_index },
            { name: "view_feed_account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: COMMENT_GET,
            commentData: refData.comment_data,
            reCommentData: refData.reply_data
        })
        dispatch({
            type: FEED_DETAIL_GET,
            data: refFeedData.data,
            isFollowing: refFeedData.is_following,
            isThx: refData.is_thanks,
            isScrap: refData.is_scrap
        })
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: `${message}을 삭제 했습니다.` }
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

const commentPost = (fetchData) => async dispatch => {
    const data = await fetch("comment", "POST", { 
        "feed_account_index": fetchData.account_index,
        "feed_index": fetchData.feed_index,
        "account_index": getCookie("index-token"),
        "contents": fetchData.contents,
        "is_secret": fetchData.is_secret
     }, null,
     { token: getCookie("access-token") })
    
    if(data.success){
        const refData = await fetch("comment", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index, },
            { name: "account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        const refFeedData = await fetch("feed/detail", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index },
            { name: "account_index", query: fetchData.account_index },
            { name: "view_feed_account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: COMMENT_GET,
            commentData: refData.comment_data,
            reCommentData: refData.reply_data
        })
        dispatch({
            type: FEED_DETAIL_GET,
            data: refFeedData.data,
            isFollowing: refFeedData.is_following,
            isThx: refData.is_thanks,
            isScrap: refData.is_scrap
        })
        dispatch({
            type: COMMENT_INPUT,
            text: ""
        })
        dispatch({
            type: COMMENT_IS_PRIVATE,
        })
    }else{
        dispatch({
            type: COMMENT_INPUT,
            text: ""
        })
        dispatch({
            type: IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const commentReport = (fetchData, rptType) => async dispatch => {
    
    let data = null
    if(rptType){
        data = await fetch("reply/report_it", "POST", 
        {
            "comment_index": fetchData.comment_index,
            "account_index": fetchData.account_index,
            "report_account_index": getCookie("index-token"),
            "reply_index": fetchData.re_comment_index,
            "contents": fetchData.contents,
            "is_feed": false
        }, null,
        { token: getCookie("access-token") })
    }else{
        data = await fetch("comment/report_it", "POST", 
        {
            "comment_index": fetchData.comment_index,
            "account_index": fetchData.account_index,
            "report_account_index": getCookie("index-token"),
            "feed_index": fetchData.feed_index,
            "contents": fetchData.contents,
            "is_feed": false
        }, null,
        { token: getCookie("access-token") })
    }

    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "신고가 접수 되었습니다." }
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

const reCommentInputOpen = (commentIndex, reCommentIndex) => {
    return{
        type: RE_COMMENT_INPUT_OPEN,
        index: commentIndex,
        reIndex: reCommentIndex
    }
}

const reCommentInput = (text) => {
    return{
        type: RE_COMMENT_INPUT,
        text: text
    }
}

const reCommentPost = (fetchData) => async dispatch => {
    const data = await fetch("reply", "POST", 
    {
        "feed_index": fetchData.feed_index,
        "feed_account_index": fetchData.account_index,
        "comment_index": fetchData.comment_index,
        "account_index": getCookie("index-token"),
        "contents": fetchData.contents,
    }, null,
    { token: getCookie("access-token") })

    if(data.success){
        dispatch({
            type: RE_COMMENT_INPUT_OPEN,
            commentIndex: "cancel"
        })
        const refData = await fetch("comment", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index },
            { name: "account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        const refFeedData = await fetch("feed/detail", "GET", null, 
        [
            { name: "feed_index", query: fetchData.feed_index },
            { name: "account_index", query: fetchData.account_index },
            { name: "view_feed_account_index", query: getCookie("index-token") }
        ],
        { token: getCookie("access-token") })
        dispatch({
            type: COMMENT_GET,
            commentData: refData.comment_data,
            reCommentData: refData.reply_data,
            isThx: refData.is_thanks,
            isScrap: refData.is_scrap
        })
        dispatch({
            type: FEED_DETAIL_GET,
            data: refFeedData.data,
            isFollowing: refFeedData.is_following
        })
    }else{
        dispatch({
            type: RE_COMMENT_INPUT_OPEN,
            commentIndex: "cancel"
        })
        dispatch({
            type: IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const reCommentReport = (fetchData) => async dispatch => {
    const data = await fetch("reply/report_it", "POST", 
    {
        "comment_index": fetchData.comment_index,
        "account_index": fetchData.account_index,
        "reply_index": fetchData.re_comment_index,
        "contents": fetchData.contents
    }, null,
    { token: getCookie("access-token") })

    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "신고가 접수 되었습니다." }
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

export { commentGet, commentInput, commentPost, commentIsPrivate, commentDelete, commentReport,
         reCommentInputOpen, reCommentInput, reCommentPost, reCommentReport, commentReset }