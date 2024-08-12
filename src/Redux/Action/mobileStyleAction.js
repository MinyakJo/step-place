import fetch from "../../Hooks/fetch"
import cookie from "../../Hooks/cookie"

export const MOBILE_SEARCH_SELECTED = "SEARCH_SELECTED"
export const MOBILE_FILTER_SELECTED = "MOBILE_FILTER_SELECTED"
export const MOBILE_BOTTOM_OPEN = "MOBILE_BOTTOM_OPEN"
export const MOBILE_COMMENT_OPEN = "MOBILE_COMMENT_OPEN"
export const MOBILE_TOP_OPEN = "MOBILE_TOP_OPEN"

const searchSelected = (bool) => {
    return{
        type: MOBILE_SEARCH_SELECTED,
        bool: bool
    }
}

const filterSelected = (bool) => {
    return{
        type: MOBILE_FILTER_SELECTED,
        bool: bool
    }
}

const bottomOpen = (bool) => {
    return{
        type: MOBILE_BOTTOM_OPEN,
        bool: bool,
    }
}

const commentBtn = (bool, index, reIndex) => {
    return{
        type: MOBILE_COMMENT_OPEN,
        bool: bool,
        index: index,
        reIndex: reIndex
    }
}

const moTopOpen = (bool) => {
    return{
        type: MOBILE_TOP_OPEN,
        bool: bool
    }
}


export { searchSelected, filterSelected, bottomOpen, commentBtn, moTopOpen }