import { JOIN_NAME_INPUT, JOIN_BIRTH_DATE_INPUT, JOIN_EMAIL_INPUT, 
    JOIN_PASSWORD_INPUT, JOIN_PASSWORD_CHECK_INPUT, JOIN_NICKNAME_INPUT, 
    CHECK_INPUT, EMAIL_ADDR, EMAIL_VERIFY_START,
    EMAIL_VERIFY_INPUT, TIMER, JOIN,
    EMAIL_VERIFY_CODE, JOIN_CONSENT_GET, EMAIL_CODE_SUBMIT, 
    JOIN_NICKNAME_DUP_ALERT, JOIN_EMAIL_VERIFY, JOIN_ALERT } from "../Action/joinAction"


const initState = {
    name: {
        text: "",
        check: false,
    },
    birthDate: {
        text: "",
        check: false,
    },
    email: {
        text: "",
        addr: "",
        check: false,
    },
    verify: {
        code: null,
        text: "",
        check: false,
        submitCheck: null,
        start: false,
        end: false,
        sec: 0,
        min: 3
    },
    pw: {
        text: "",
        check: false,
    },
    pwCheck: {
        text: "",
        check: false,
    },
    nickname: {
        text: "",
        duplicate: false,
    },
    check: [],
    consent: [],
    err: "",
    allCheck: 0,
    pwIsSame: false,

    style: {
        alert: false,
        verifyOpen: false,
        verifyCode: false,
        verifyMessage: false,
        nickCheck: true,
    },
}

const reducer = ( state = initState, action ) => {

    const email = {...state.email}
    const verify = {...state.verify}
    const consent = [...state.consent]
    const check = [...state.check]
    const nickname = {...state.nickname}
    const pw = {...state.pw}
    const pwCheck = {...state.pwCheck}
    const style = {...state.style}

    switch( action.type ){
        case JOIN:
            return{
                ...state,
                name: {
                    text: "",
                    check: false,
                },
                birthDate: {
                    text: "",
                    check: false,
                },
                email: {
                    text: "",
                    addr: "",
                    check: false,
                },
                verify: {
                    code: null,
                    text: "",
                    check: false,
                    submitCheck: false,
                    start: false,
                    end: false,
                    sec: 0,
                    min: 3
                },
                pw: {
                    text: "",
                    check: false,
                },
                pwCheck: {
                    text: "",
                    check: false,
                },
                nickname: {
                    text: "",
                    duplicate: false,
                },
                check: [],
                consent: [],
                err: "",
                allCheck: 0,
                pwIsSame: false,
            
                style: {
                    alert: false,
                    verifyOpen: false,
                    verifyCode: false,
                    verifyMessage: true,
                    nickCheck: true,
                }
            }
        case JOIN_NAME_INPUT:
            const name = {...state.name}
            if(action.text.length > 0){
                name.check = true
            }else{
                name.check = false
            }
            name.text = action.text
            return{
                ...state,
                name: name
            }
        case JOIN_BIRTH_DATE_INPUT:
            const birthDate = {...state.birthDate}
            if(action.text.length > 0){
                birthDate.check = true
            }else{
                birthDate.check = false
            }
            birthDate.text = action.text
            return{
                ...state,
                birthDate: birthDate
            }
        case JOIN_EMAIL_INPUT:
            if(action.text.length > 0 && email.addr.length > 0){
                email.check = true
            }else{
                email.check = false
            }
            email.text = action.text
            return{
                ...state,
                email: email
            }
        case EMAIL_ADDR:
            if(action.text.length > 0 && email.text.length > 0 && action.text !== "reset"){
                email.check = true
            }else{
                email.check = false
            }
            if(action.text === "reset"){
                email.addr = ""
            }else{
                email.addr = action.text
            }
            return{
                ...state,
                email: email
            }
        case TIMER:
            if(action.end === true){
                verify.end = true
                return{
                    ...state,
                    verify: verify
                }
            }
            verify.sec -= 1
            if(verify.sec < 0){
                verify.sec = 59
                verify.min -= 1
            }if(verify.min < 0){
                verify.end = true
                verify.sec = 0
                verify.min = 0
                verify.code = null
            }
            return{
                ...state,
                verify: verify
            }
        case EMAIL_VERIFY_START:
            verify.start = true
            verify.min = 3
            verify.sec = 0
            verify.end = false
            return{
                ...state,
                verify: verify
            }
        case EMAIL_VERIFY_INPUT:
            verify.check = Number(action.text) === verify.code ? true : false
            verify.text = action.text
            return{
                ...state,
                verify: verify
            }
        case EMAIL_VERIFY_CODE:
            if(action.data !== null){
                verify.code = action.code
                return{
                    ...state,
                    verify: verify
                }
            }
            return{
                ...state,
                verify: {
                    ...state.verify,
                    check: false
                }
            }
        case JOIN_NICKNAME_INPUT:
            nickname.text = action.text
            return{
                ...state,
                nickname: nickname,
            }
        case JOIN_PASSWORD_INPUT:
            if(action.text.length > 0){
                pw.check = true
            }else{
                pw.check = false
            }
            pw.text = action.text
            if(pw.text === pwCheck.text && pw.text !== "" && pwCheck.text !== ""){
                return{
                    ...state,
                    pw: pw,
                    pwIsSame: true
                }
            }else{
                return{
                    ...state,
                    pw: pw,
                    pwIsSame: false
                }
            }
        case JOIN_PASSWORD_CHECK_INPUT:
            if(action.text.length > 0){
                pwCheck.check = true
            }else{
                pwCheck.check = false
            }
            pwCheck.text = action.text
            if(pw.text === pwCheck.text && pw.text !== "" && pwCheck.text !== ""){
                return{
                    ...state,
                    pwCheck: pwCheck,
                    pwIsSame: true
                }
            }else{
                return{
                    ...state,
                    pwCheck: pwCheck,
                    pwIsSame: false
                }
            }
        case CHECK_INPUT:
            let allCheck = state.allCheck
            if(action.index === "all"){
                for(let i = 0; i < check.length; i++){
                    check.splice(i, 1, action.checked)
                }
                if(action.checked){
                    allCheck = check.length
                }else{
                    allCheck = 0
                }
            }else{
                if(action.checked){
                    allCheck += 1
                }else{
                    allCheck -= 1
                }
                check.splice(action.index, 1, !state.check[action.index])
            }
            return{
                ...state,
                check: check,
                allCheck: allCheck
            }
        
        case JOIN_CONSENT_GET:
            consent.splice(0)
            if(action.data !== null){
                for(let i = 0; i < action.data.length; i++){
                    consent.push(action.data[i])
                    check.push(false)
                }
            }
            return{
                ...state,
                consent: consent,
                check: check
            }
        case EMAIL_CODE_SUBMIT:
            if(Number(verify.text) === verify.code){
                verify.submitCheck = true
                style.verifyMessage = true
                style.verifyOpen = false
            }else{
                verify.submitCheck = false
                style.verifyMessage = false
            }
            return{
                ...state,
                verify: verify,
                style: style
            }
        case JOIN_ALERT:
            style.alert = true
            return{
                ...state,
                style: style
            }
        case JOIN_EMAIL_VERIFY:
            style.verifyOpen = true
            return{
                ...state,
                style: style
            }
        case JOIN_NICKNAME_DUP_ALERT:
            if(action.check === undefined){
                nickname.duplicate = false
                style.nickCheck = false
            }else{           
                nickname.duplicate = action.check
                style.nickCheck = action.check
            }
            console.log(nickname)
            console.log(style)
            return{
                ...state,
                nickname: nickname,
                style: style
            }
        default:
            return state
    }
}

export default reducer