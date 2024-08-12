import fetch from "../../Hooks/fetch"
import { getCookie } from "../../Hooks/cookie"
import { FEED_GET } from "./feedAction"
import { SEARCH_ACCOUNT_GET } from "./followAction"
import { IS_OPEN } from "./alertAction"

export const SEARCH_FILTER_LIST_GET = "SEARCH_FILTER_LIST_GET"
export const SEARCH_TRANS_LIST_GET = "SEARCH_TRANS_LIST_GET"
export const SEARCH_INPUT = "SEARCH_INPUT"
export const SEARCH_GET = "SEARCH_GET"
export const SEARCH_FILTER_OPEN = "SEARCH_FILTER_OPEN"
export const SEARCH_TYPE_SELECTED = "SEARCH_TYPE_SELECTED"
export const SEARCH_FILTER_SELECTED = "SEARCH_FILTER_SELECTED"
export const SELECTED_RESET = "SELECTED_RESET"
export const SEARCH_FILTER_RESET = "SEARCH_FILTER_RESET"
export const SEARCH_FILTER_APPLY = "SEARCH_FILTER_APPLY"

const searchFilterGet = () => async dispatch => {

    const withData = await fetch("editor_management/together", "GET")

    const locData = await fetch("editor_management/location", "GET")

    dispatch({
        type: SEARCH_FILTER_LIST_GET,
        withData: withData.data.together,
        locData: locData.data.location,
    })
}

const searchTransGet = () => async dispatch => {
    const transList = await fetch("editor_management/transportation", "GET", null, null,
    { token: getCookie("access-token") })

    dispatch({
        type: SEARCH_TRANS_LIST_GET,
        transData: transList.data.transportation
    })
}

const searchFilterSelected = (name, index) => {
    return{
        type: SEARCH_FILTER_SELECTED,
        text: name,
        index: index
    }
} 

const searchInput = (text) => {
    return{
        type: SEARCH_INPUT,
        text: text
    }
}

const searchGet = (text, searchType, page = 0) => async dispatch => {
    const data = await fetch(`search_client/${searchType}?keyword=${text}&offset=${page}`, "GET")
    
    if(data.success){
        if(searchType === "basic/account"){
            if(data.data.length !== 0 || page === 0){
                dispatch({
                    type: SEARCH_ACCOUNT_GET,
                    data: data.data,
                    page: page,
                    cnt: data.count
                })
            }
        }else{
            if(data.data.length !== 0 || page === 0){
                dispatch({
                    type: FEED_GET,
                    data: data.data,
                    page: page,
                    cnt: data.count
                })
            }
        }
    }else{
        dispatch({
            type: FEED_GET,
            data: null,
            page: 0,
        })
        dispatch({
            type: IS_OPEN,
            btnType: "oneBtn",
            text: "message",
            data: data
        })
    }
}

const searchFilterOpen = (bool) => {
    return{
        type: SEARCH_FILTER_OPEN,
        bool: bool,
    }
}

const searchTypeSelected = (bool) => {
    return{
        type: SEARCH_TYPE_SELECTED,
        bool: bool
    }
}

const searchFilterApply = (text) => {
    return{
        type: SEARCH_FILTER_APPLY,
        text: text
    }
}

export { searchFilterGet, searchTransGet, searchFilterSelected, 
         searchInput, searchGet,
         searchTypeSelected, searchFilterOpen, searchFilterApply }