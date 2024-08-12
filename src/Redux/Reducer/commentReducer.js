import { COMMENT_GET, COMMENT_INPUT, COMMENT_IS_PRIVATE,
         RE_COMMENT_INPUT_OPEN, RE_COMMENT_INPUT, ACT_COMMENT_LIST_GET, COMMENT_RESET } from "../Action/commentAction"

const initState = {
    commentList: [],
    reCommentList: [],
    commentInput: "",
    reCommentInput: {
        isOpen: false,
        index: null,
        reIndex: undefined,
        input: ""
    },
    isPrivate: false,
    actCommentList: [],
    page: 0,
    cnt: 0
}

const commentReducer = (state = initState, action) => {

    const commentList = [...state.commentList]
    const reCommentList = [...state.reCommentList]
    const reCommentInput = {...state.reCommentInput}
    const actCommentList = [...state.actCommentList]

    switch(action.type){
        case COMMENT_RESET:
            commentList.splice(0)
            reCommentList.splice(0)
            return{
                ...state,
                commentList: commentList,
                reCommentList: reCommentList
            }
        case COMMENT_GET:
            commentList.splice(0)
            reCommentList.splice(0)
            if(action.commentData !== null){
                for(let i = 0; i < action.commentData.length; i++){
                    commentList.push(action.commentData[i])
                }
            }
            if(action.reCommentData !== null){
                for(let i = 0; i < action.reCommentData.length; i++){
                    reCommentList.push(action.reCommentData[i])
                }
            }
            return{
                ...state,
                commentList: commentList,
                reCommentList: reCommentList
            }
        case COMMENT_INPUT:
            return{
                ...state,
                commentInput: action.text
            }
        case COMMENT_IS_PRIVATE:
            if(action.bool === undefined){
                return{
                    ...state,
                    isPrivate: false
                }
            }
            return{
                ...state,
                isPrivate: action.bool
            }
        case RE_COMMENT_INPUT_OPEN:
            if(action.index === "cancel"){
                reCommentInput.index = null
                reCommentInput.input = ""
                reCommentInput.isOpen = false
                reCommentInput.reIndex = action.reIndex
            }else{
                reCommentInput.index = action.index
                reCommentInput.input = ""
                reCommentInput.isOpen = true
                reCommentInput.reIndex = action.reIndex
            }
            return{
                ...state,
                reCommentInput: reCommentInput
            }
        case RE_COMMENT_INPUT:
            reCommentInput.input = action.text
            return{
                ...state,
                reCommentInput: reCommentInput
            }
        case ACT_COMMENT_LIST_GET:
            if(action.page === 0){
                actCommentList.splice(0)
            }
            for(let i = 0; i < action.data.length; i++){
                actCommentList.push(action.data[i])
                for(let j = 0; j < action.data[i].image1.length; j++){
                    actCommentList[actCommentList.length - 1].image1[j] = JSON.parse(action.data[i].image1[j])
                }
            }
            return{
                ...state,
                actCommentList: actCommentList,
                page: action.page
            }
        default:
            return{
                ...state
            }
    }
}

export default commentReducer