import { MOBILE_BOTTOM_OPEN, MOBILE_COMMENT_OPEN, MOBILE_FILTER_SELECTED, MOBILE_SEARCH_SELECTED, MOBILE_TOP_OPEN } from "../Action/mobileStyleAction";

const initState = {
    searchSelect: false,
    filterSelect: false,
    bottomOpen: false,
    comment: {
        commentOpen: false,
        index: null,
        reIndex: null
    },
    moTopOpen: false
}

const mobileStyleReducer = (state = initState, action) => {
    switch(action.type){
        case MOBILE_SEARCH_SELECTED:
            if(action.bool !== undefined){
                return{
                    ...state,
                    searchSelect: action.bool
                }
            }else{
                return{
                    ...state,
                    searchSelect: false
                }
            }
        case MOBILE_FILTER_SELECTED:
            if(action.bool !== undefined){
                return{
                    ...state,
                    filterSelect: action.bool
                }
            }else{
                return{
                    ...state,
                    filterSelect: false
                }
            }
        case MOBILE_BOTTOM_OPEN:
            return{
                ...state,
                bottomOpen: action.bool
            }
        case MOBILE_COMMENT_OPEN:
            const comment = {...state.comment}
            if(action.bool !== undefined){
                comment.commentOpen = action.bool
                comment.index = action.index
                comment.reIndex = action.reIndex
                return{
                    ...state,
                    comment: comment
                }
            }
            comment.commentOpen = false
            comment.index = null
            comment.reIndex = null
            return{
                ...state,
                comment: comment
            }
        case MOBILE_TOP_OPEN:
            if(action.bool !== undefined){
                return{
                    ...state,
                    moTopOpen: action.bool
                }
            }else{
                return{
                    ...state,
                    moTopOpen: false
                }
            }
        default:
            return state
    }   
}

export default mobileStyleReducer