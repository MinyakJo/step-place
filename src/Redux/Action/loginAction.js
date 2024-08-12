import fetch from "../../Hooks/fetch"
import { IS_OPEN } from "./alertAction"

export const EMAIL_INPUT = "EMAIL_INPUT"
export const PASSWORD_INPUT = "PASSWORD_INPUT"
export const LOGIN = "LOGIN"
export const REF_LOGIN = "REF_LOGIN"
export const LOGOUT = "LOGOUT"
export const LOGIN_KEEP = "LOGIN_KEEP"

const loginEmailInput = (text) => {
    return({
        type: EMAIL_INPUT,
        text: text
    })
}

const loginPwInput = (text) => {
    return({
        type: PASSWORD_INPUT,
        text: text
    })
}

const login = (email = "", pw = "", keep) => async dispatch => {

    const data = await fetch("account/login", "POST", {
        "email": email,
        "password": pw
    })
    if(!data.success){
        dispatch({
            type: IS_OPEN,
            btnType: "oneBtn",
            text: "message",
            data: data,
            keep: keep
        })
    }
    else{
        dispatch({
            type: LOGIN,
            success: data.success,
            data: data
        })
    }
}

const loginKeep = (bool) => {
    return{
        type: LOGIN_KEEP,
        bool: bool
    }
}

const refLogin = () => {
    return{
        type: REF_LOGIN
    }
}

const logout = () => {
    return{
        type: LOGOUT,
    }
}

const forgotPw = (text) => async dispatch => {
    
    const data = await fetch("my_account/search_password", "POST", 
    {
        email: text
    })

    if(data.success){
        dispatch({
            type: IS_OPEN,
            btnType: "oneBtn",
            text: "forgotPwSuccess",
            data: { message: "입력하신 이메일로 보냈습니다." }
        })
    }else{
        dispatch({
            type: IS_OPEN,
            btnType: "oneBtn",
            text: "message",
            data: data
        })
    }
}

export { loginEmailInput, loginPwInput, refLogin, login, logout, loginKeep, forgotPw }