import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { IS_OPEN } from "./alertAction"

export const WRITER_APP_INPUT = "WRITER_APP_INPUT"
export const WRITER_APP_PAGE_COUNT = "WRITER_APP_PAGE_COUNT"

const writerAppInput = (textType, text) => {
    return{
        type: WRITER_APP_INPUT,
        text: text,
        textType: textType
    }
}

const wirterAppPost = (text1 = "", text2 = "", text3 = "") => async dispatch => {
    const data = await fetch("account/application_photographer", "POST", {
        "account_index": getCookie("index-token"),
        "introduction": text1,
        "question": text2,
        "active_sns": text3
    }, null, {
        "token": getCookie("access-token")
    })
    if(data.success){
        dispatch({
            type: IS_OPEN,
            text: "writerApp",
            btnType: "oneBtn",
            data: { message: "작가 신청이 접수되었습니다." }
        })
    }
    else{
        dispatch({
            type: IS_OPEN,
            text: "writerAppFalse",
            btnType: "oneBtn",
            data: data
        })
    }
}

const writerAppPageCount = (bool) => {
    return{
        type: WRITER_APP_PAGE_COUNT,
        isReset: bool
    }
}

export { writerAppInput, wirterAppPost, writerAppPageCount }
