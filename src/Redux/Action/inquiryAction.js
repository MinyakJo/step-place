import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { IS_OPEN } from "./alertAction"

export const INQUIRY_ADD = "INQUIRY_ADD"
export const INQUIRY_DELETE = "INQUIRY_DELETE"
export const INQUIRY_INPUT = "INQUIRY_INPUT"
export const INQUIRY_CHECK = "INQUIRY_CHECK"
export const INQUIRY_CHECK_GET = "INQUIRY_CHECK_GET" 
export const INQUIRY_RESET = "INQUIRY_RESET"


const inquiryReset = () => {
    return{
        type: INQUIRY_RESET
    }
}

const inquiryAdd = (data) => {
    return{
        type: INQUIRY_ADD,
        data: data
    }
}

const inquiryDelete = (index) => {
    return{
        type: INQUIRY_DELETE,
        index: index
    }
}

// const inquiryTerms = () => async dispatch => {
    
//     const data = await fetch("terms_of_service", "GET")
//     dispatch({
//         type: INQUIRY_CHECK_GET,
//         data: data.data
//     })
// }

const inquiryPost = (userData, fileData, input) => async dispatch => {
    
    if(input.check){
        if(fileData !== undefined && fileData.size !== null){
            const data = await fetch("contact_us", "POST", {
                "account_index": getCookie("index-token"),
                "email": userData.email,
                "nickname": userData.nickname,
                "title": input.title,
                "contents": input.contents,
                "is_member": getCookie("index-token") === undefined ? false : true,
                "attachment": fileData
            }, null, {
                "token": getCookie("access-token"),
                "Content-Type": "multipart/form-data"
            })

            if(data.success){
                dispatch({
                    type: IS_OPEN,
                    text: "inquiry",
                    btnType: "oneBtn",
                    data: { message: "문의가 접수 되었습니다." }
                })
            }else{
                dispatch({
                    type: IS_OPEN,
                    text: "message",
                    btnType: "oneBtn",
                    data: data
                })
            }
        }else{
            return
        }
    }else{
        dispatch({
            type: IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "약관에 동의 해주세요" }
        })
    }
}

const inquiryText = (textType, text) => {
    return{
        type: INQUIRY_INPUT,
        text: text,
        textType: textType
    }
}

const inquiryCheck = (check = false) => {
    return{
        type: INQUIRY_CHECK,
        check: check,
    }
}

export { inquiryAdd, inquiryDelete, inquiryPost, inquiryText, inquiryCheck, inquiryReset }