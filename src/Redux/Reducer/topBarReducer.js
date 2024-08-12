import { MORE_VIEW_OPEN, MORE_VIEW_SELECTED, TOP_BAR_SELECTED } from "../Action/topBarAction"

const initState = {
    top: {
        homeIsSelected: false,
        postingIsSelected: false,
        feedIsSelected: false,
        isOpen: false
    },

    moreView: {
        myFeed: false,
        writerApp: false,
        notice: false,
        logout: false,
        isOpen: false
    },
}

const styleReducer = ( state = initState, action ) => {

    const top = {...state.top}
    const moreView = {...state.moreView}

    switch( action.type ){
    //상단바
    case TOP_BAR_SELECTED:
        //home이면 나머지 초기화
        if(action.text === "home"){
            top.homeIsSelected = true
            top.postingIsSelected = false
            top.feedIsSelected = false
        //posting이면 나머지 초기화
        }else if(action.text === "posting"){
            top.postingIsSelected = true
            top.homeIsSelected = false
            top.feedIsSelected = false
            //feed면 나머지 초기화
        }else if(action.text === "feed"){
            top.feedIsSelected = true
            top.homeIsSelected = false
            top.postingIsSelected = false
        }else{
            top.feedIsSelected = false
            top.homeIsSelected = false
            top.postingIsSelected = false
        }
        return{
            ...state,
            top: top,
        }
    
    case MORE_VIEW_SELECTED:
        if(action.text === "myFeed"){
            moreView.myFeed = true
            moreView.notice = false
            moreView.writerApp = false
            moreView.logout = false
        }else if(action.text === "notice"){
            moreView.myFeed = false
            moreView.notice = true
            moreView.writerApp = false
            moreView.logout = false
        }else if(action.text === "writerApp"){
            moreView.myFeed = false
            moreView.notice = false
            moreView.writerApp = true
            moreView.logout = false
        }else if(action.text === "logout"){
            moreView.myFeed = false
            moreView.notice = false
            moreView.writerApp = false
            moreView.logout = true
        }else{
            moreView.myFeed = false
            moreView.notice = false
            moreView.writerApp = false
            moreView.logout = false
        }
        return{
            ...state,
            moreView: moreView,
        }

    case MORE_VIEW_OPEN:
        
        if(action.bool){
            moreView.isOpen = action.bool
        }
        else{
            moreView.isOpen = false
        }
        return{
            ...state,
            moreView: moreView
        }

    default:
        return state
    }
}

export default styleReducer