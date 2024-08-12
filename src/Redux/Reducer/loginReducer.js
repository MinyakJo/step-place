import { LOGIN, EMAIL_INPUT, PASSWORD_INPUT, LOGOUT, REF_LOGIN, LOGIN_KEEP } from "../Action/loginAction"
import { delCookie, setCookie } from "../../Hooks/cookie"

const initState = {
    email: {
        text: "",
        check: false
    },
    pw: {
        text: "",
        check: false
    },
    login: false,
    keep: false
}

const loginReducer = ( state = initState, action ) => {
    const email = {...state.email}
    const pw = {...state.pw}
    
    switch( action.type ){   
        case EMAIL_INPUT:
            if(action.text.length > 0){
                email.check = true
            }else{
                email.check = false
            }
            email.text = action.text
            return{
                ...state,
                email: email
            }

        case PASSWORD_INPUT:
            if(action.text.length > 0){
                pw.check = true
            }else{
                pw.check = false
            }
            pw.text = action.text
            return{
                ...state,
                pw: pw
            }
        case LOGIN_KEEP:
            return{
                ...state,
                keep: action.bool,
            }
        case LOGIN:
            if(state.email.check && state.pw.check){
                email.check = false
                email.text = ""
                pw.check = false
                pw.text = ""
                if(action.success){
                    if(state.keep){
                        let date = new Date()
                        date.setDate(date.getDate() + 365)
                        setCookie("access-token", action.data.token, date)
                        setCookie("index-token", action.data.data.account_index, date)
                    }else{
                        setCookie("access-token", action.data.token, 0)
                        setCookie("index-token", action.data.data.account_index, 0)
                    }
                    return {
                        ...state,
                        login: true,
                        email: email,
                        pw: pw,
                        keep: false
                    }
                }
            }
            return {
                ...state,
                login: false,
            }
        case REF_LOGIN:
            return{
                ...state,
                login: true
            }
        case LOGOUT:
            delCookie("index-token")
            delCookie("access-token")
            return{
                ...state,
                login: false,
            }
        default:
            return state
    }
}

export default loginReducer