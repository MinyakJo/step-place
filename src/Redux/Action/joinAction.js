import fetch from "../../Hooks/fetch"
import { IS_OPEN } from "./alertAction"
import { INQUIRY_CHECK_GET } from "./inquiryAction"

export const JOIN = "JOIN"
export const JOIN_CONSENT_GET = "JOIN_CONSENT_GET"
export const JOIN_NAME_INPUT = "JOIN_NAME_INPUT"
export const JOIN_BIRTH_DATE_INPUT = "JOIN_BIRTH_DATE_INPUT"
export const JOIN_EMAIL_INPUT = "JOIN_EMAIL_INPUT"
export const EMAIL_ADDR = "EMAIL_ADDR"
export const JOIN_PASSWORD_INPUT = "JOIN_PASSWORD_INPUT"
export const JOIN_PASSWORD_CHECK_INPUT = "JOIN_PASSWORD_CHECK_INPUT"
export const JOIN_NICKNAME_INPUT = "JOIN_NICKNAME_INPUT"
export const CHECK_INPUT = "CHECK_INPUT"
export const EMAIL_VERIFY_START = "EMAIL_VERIFY_START"
export const TIMER = "TIMER"
export const EMAIL_VERIFY_INPUT = "EMAIL_VERIFY_INPUT"
export const EMAIL_VERIFY_CODE = "EMAIL_VERIFY_CODE"
export const EMAIL_CODE_SUBMIT = "EMAIL_CODE_SUBMIT"
export const JOIN_ALERT = "JOIN_ALERT"
export const JOIN_EMAIL_VERIFY = "JOIN_EMAIL_VERIFY"
export const JOIN_EMAIL_VERIFY_TEXT = "JOIN_EMAIL_VERIFY_TEXT" 
export const JOIN_NICKNAME_DUP_ALERT = "JOIN_NICKNAME_DUP_ALERT"


const join = (data) => async dispatch => {
    if(data.birthDate.check && data.check === data.checkLength &&
        data.email.check && data.name.check && data.nickname.duplicate &&
        data.nickname.duplicate && data.pw.check && data.verify.submitCheck){
        const fetchdata = await fetch("account","POST",{
            "name": data.name.text,
            "birth_date": data.birthDate.text,
            "email": `${data.email.text}@${data.email.addr}`,
            "nickname": data.nickname.text,
            "password": data.pw.text
        })
        if(fetchdata.success){
            dispatch({
                type: IS_OPEN,
                text: "joinSuccess",
                btnType: "oneBtn",
                data: { message: "회원가입이 완료 되었습니다." }
            })
        }else{
            dispatch({
                type: IS_OPEN,
                text: "message",
                btnType: "oneBtn",
                data: fetchdata
            })
    
            const refData = await fetch("terms_of_service", "GET")
    
            dispatch({
                type: JOIN_CONSENT_GET,
                data: refData.data
            })
        }
    }else{
        if(!data.verify.submitCheck){
            dispatch({
                type: IS_OPEN,
                text: "message",
                btnType: "oneBtn",
                data: { message: "이메일 인증을 완료해 주세요." }
            })
            dispatch({
                type: JOIN_ALERT
            })
        }
        else{
            dispatch({
                type: JOIN_ALERT
            })
        }
    }
}
const joinConsentGet = () => async dispatch => {
    
    const data = await fetch("terms_of_service", "GET")
    
    dispatch({
        type: INQUIRY_CHECK_GET,
        data: data.data
    })

    dispatch({
        type: JOIN_CONSENT_GET,
        data: data.data
    })
}
const joinReset = () => dispatch => {
    dispatch({
        type: JOIN
    })
}
const joinNameInput = (text) => {
    return{
        type: JOIN_NAME_INPUT,
        text: text,
    }
}
const joinBirthDateInput = (text) => {
    return{
        type: JOIN_BIRTH_DATE_INPUT,
        text: text,
    }
}
const joinEmailInput = (text) => {
    return{
        type: JOIN_EMAIL_INPUT,
        text: text,
    }
}
const joinEmailAddr = (text) => {
    return{
        type: EMAIL_ADDR,
        text: text,
    }
}
const joinEmailVerify = () => {
    return{
        type: EMAIL_VERIFY_START,
    }
}
const joinEmailVerifyInput = (text) => {
    return{
        type: EMAIL_VERIFY_INPUT,
        text: text
    }
}
const joinTimerStop = (bool) => {
    return{
        type: TIMER,
        end: bool
    }
}
const joinTimer = () => {
    return{
        type: TIMER
    }
}
const joinPwInput = (text) => {
    return{
        type: JOIN_PASSWORD_INPUT,
        text: text,
    }
}
const joinPwCheckInput = (text) => {
    return{
        type: JOIN_PASSWORD_CHECK_INPUT,
        text: text,
    }
}
const joinNicknameDup = (text) => async dispatch => {
    const data = await fetch("account/duplicate", "POST", {
        "nickname": text
    })

    if(data.success){
        dispatch({
            type: JOIN_NICKNAME_DUP_ALERT,
            check: true
        })
    }else{
        dispatch({
            type: JOIN_NICKNAME_DUP_ALERT,
            check: false
        })
    }
}
const joinNicknameInput = (text) => {
    return{
        type: JOIN_NICKNAME_INPUT,
        text: text
    }
}
const joinCheckInput = (checked, index) => {
    return{
        type: CHECK_INPUT,
        checked: checked,
        index: index
    }
}
const joinEmailVerifyCodeGet = (text) => async dispatch => {
    const data = await fetch("email", "POST", { email: text })

    if(data.success){
        dispatch({
            type: JOIN_EMAIL_VERIFY
        })
        dispatch({
            type: EMAIL_VERIFY_CODE,
            code: data.code
        })
        dispatch({
            type: EMAIL_VERIFY_START
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

const joinCodeSubmit = (code) => {
    return{
        type: EMAIL_CODE_SUBMIT,
        code: code
    }
}


const joinAlert = () => {
    return{
        type: JOIN_ALERT
    }
}

export { join, joinReset, joinNameInput, joinBirthDateInput, joinEmailInput, 
        joinTimer, joinEmailVerify, joinEmailVerifyInput, joinTimerStop,
        joinEmailAddr, joinPwInput, joinPwCheckInput,
        joinNicknameInput, joinCheckInput, joinNicknameDup,
        joinEmailVerifyCodeGet, joinConsentGet, joinCodeSubmit,
        joinAlert }
