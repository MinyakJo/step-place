import { LEFT_BAR_GET, LEFT_BAR_OPEN, LEFT_BAR_SELECTED } from "../Action/leftBarAction"

const initState = {
    leftBarData: {
        account_index: null,
        feed_count: 0,
        follow: 0,
        following: 0,
        introduction: "",
        is_photographer: null,
        link: "",
        name: "",
        nickname: "",
        profile: null,
        is_following: false,
        is_disabled: null,
        address: "",
    },
    left: {
        feedIsSelected: false,
        myFeedIsSelected: false,
        activityIsSelected: false,
        writerAppIsSelected: false,
        noticeIsSelected: false,
        inquiryIsSelected: false,
        accountIsSelected: false,
        isOpen: false,
    },
    noneData: false,
}

const leftBarReducer = ( state = initState, action ) => {

    const left = {...state.left}

    switch( action.type ){
        
        case LEFT_BAR_GET:
            if(action.data === undefined || action.data === null || action.data === "reset"){
                return{
                    ...state,
                    leftBarData: {
                        account_index: null,
                        feed_count: 0,
                        follow: 0,
                        following: 0,
                        introduction: "",
                        is_photographer: null,
                        link: "",
                        name: "",
                        nickname: "",
                        profile: null,
                        is_following: false,
                        is_disabled: null,
                        address: "",
                    },
                    noneData: action.data === "reset"? false: true
                }
            }
            return{
                ...state,
                leftBarData: action.data,
            }

        case LEFT_BAR_OPEN:
            if(action.bool){
                left.isOpen = action.bool
                return{
                    ...state,
                    left: left
                }
            }
            left.isOpen = false
            return{
                ...state,
                left: left
            }

        case LEFT_BAR_SELECTED:
            if(action.text === "feed"){
                left.feedIsSelected = true
                left.myFeedIsSelected = true
                left.accountIsSelected= false
                left.writerAppIsSelected= false
                left.noticeIsSelected= false
                left.inquiryIsSelected= false
                left.activityIsSelected= false
            }
            else if(action.text === "myFeed"){
                left.feedIsSelected = true
                left.myFeedIsSelected = true
                left.accountIsSelected= false
                left.writerAppIsSelected= false
                left.noticeIsSelected= false
                left.inquiryIsSelected= false
                left.activityIsSelected= false
            }else if(action.text === "activity"){
                left.feedIsSelected = false
                left.myFeedIsSelected = false
                left.accountIsSelected= false
                left.writerAppIsSelected= false
                left.noticeIsSelected= false
                left.inquiryIsSelected= false
                left.activityIsSelected= true
            }else if(action.text === "writerApp"){
                left.feedIsSelected = false
                left.myFeedIsSelected = false
                left.accountIsSelected= false
                left.writerAppIsSelected= true
                left.noticeIsSelected= false
                left.inquiryIsSelected= false
                left.activityIsSelected= false
            }else if(action.text === "notice"){
                left.feedIsSelected = false
                left.myFeedIsSelected = false
                left.accountIsSelected= false
                left.writerAppIsSelected= false
                left.noticeIsSelected= true
                left.inquiryIsSelected= false
                left.activityIsSelected= false
            }else if(action.text === "inquiry"){
                left.feedIsSelected = false
                left.myFeedIsSelected = false
                left.accountIsSelected= false
                left.writerAppIsSelected= false
                left.noticeIsSelected= false
                left.inquiryIsSelected= true
                left.activityIsSelected= false
            }else if(action.text === "account"){
                left.feedIsSelected = false
                left.myFeedIsSelected = false
                left.accountIsSelected= true
                left.writerAppIsSelected= false
                left.noticeIsSelected= false
                left.inquiryIsSelected= false
                left.activityIsSelected= false
            }else{
                left.feedIsSelected = false
                left.myFeedIsSelected = false
                left.accountIsSelected= false
                left.writerAppIsSelected= false
                left.noticeIsSelected= false
                left.inquiryIsSelected= false
                left.activityIsSelected= false
            }
            return{
                ...state,
                left: left
            }
        
        default:
            return state
    }
}

export default leftBarReducer