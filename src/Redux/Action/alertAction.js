import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { LEFT_BAR_GET } from "./leftBarAction"
import { MY_ACCOUNT_GET } from "./myPageAction"

export const IS_OPEN = "IS_OPEN"
export const ANOTHER_IS_OPEN = "ANOTHER_IS_OPEN"
export const ALERT_INPUT = "ALERT_INPUT"
export const ALERT_RESET = "ALERT_RESET"

const alertReset = () => {
    return{
        type: ALERT_RESET
    }
}

const alertIsOpen = (textType = "", btnType = "", data = null) => {
    return{
        type: IS_OPEN,
        text: textType,
        btnType: btnType,
        data: data,
    }
}

const anotherAlertIsOpen = (textType = "", btnType = "") => {
    return{
        type: ANOTHER_IS_OPEN,
        text: textType,
        btnType: btnType
    }
}

const alertInput = (input, textType = null) => {
    return{
        type: ALERT_INPUT,
        input: input,
        textType: textType
    }
}

const alertNicknameDate = (nickname) => dispatch => {
    dispatch({
        type: ANOTHER_IS_OPEN,
        text: "nicknameInput",
        btnType: "inputOneBtn",
        data: {},
        length: 13
    })
    dispatch({
        type: ALERT_INPUT,
        input: nickname
    })
}

const alertNicknameEdit = (text) => async dispatch => {
    const data = await fetch("account/nickname", "PUT", {
        "account_index": getCookie("index-token"),
        "nickname": text
    }, null, {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "닉네임 변경에 성공하였습니다." }
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
    }else{
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const alertLinkEdit = (text) => async dispatch => {
    const data = await fetch("account/link_address", "PUT", {
        "account_index": getCookie("index-token"),
        "link_address": text
    }, null, {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "링크를 변경하였습니다." }
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
    }else{
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const alertAddrEdit = (text) => async dispatch => {
    const data = await fetch("my_account/address", "PUT", {
        "account_index": getCookie("index-token"),
        "address": text
    }, null, {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "주소를 변경하였습니다." }
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
    }else{
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const alertPwEdit = (text) => async dispatch => {
    let data = {
        message: "새 비밀번호를 일치하게 입력해주세요."
    }
    if(text.bool){
        data = await fetch("my_account/change_password", "PUT", {
            "account_index": getCookie("index-token"),
            "old_password": text.nowPw,
            "new_password": text.changePw
        }, null, {
            "token": getCookie("access-token")
        })
    }
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "비밀번호 변경에 성공하였습니다." }
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

const alertIntroEdit = (text) => async dispatch => {
    const data = await fetch("account/introduction", "PUT", {
        "account_index": getCookie("index-token"),
        "introduction": text,
    }, null, {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "자기소개를 변경하였습니다." }
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
    }else{
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}

const alertCancelMem = () => async dispatch => {
    const data = await fetch("my_account/cancel", "DELETE", {
        "account_index": getCookie("index-token")
    }, null, {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "회원 탈퇴 하였습니다." }
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

export { alertIsOpen, anotherAlertIsOpen, alertInput, 
         alertNicknameEdit, alertNicknameDate, alertAddrEdit, 
         alertPwEdit, alertIntroEdit, alertCancelMem,
         alertLinkEdit, alertReset }