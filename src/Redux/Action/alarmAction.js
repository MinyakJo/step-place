import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { IS_OPEN } from "./alertAction"

export const ALARM_GET = "ALARM_GET"
export const RIGHT_BAR_OPEN = "RIGHT_BAR_OPEN"

const alarmGet = (page = 0) => async dispatch => {
    const data = await fetch("alarm", "GET", null,
    [
        { name: "account_index", query: getCookie("index-token") },
        { name: "offset", query: page }
    ],
    { token: getCookie("access-token") })

    if(data.success){
        dispatch({
            type: ALARM_GET,
            data: data,
            page: page
        })
    }
}

const rightBarOpen = (bool) => {
    return{
        type: RIGHT_BAR_OPEN,
        bool: bool
    }
}

export { alarmGet, rightBarOpen }