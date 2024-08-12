import { FEED_DETAIL_GET, FEED_GET, FEED_MORE_VIEW_OPEN, 
    FEED_MORE_VIEW_SELECTED, IMG_CHANGE,
    FEED_RESET, FEED_DETAIL_RESET } from "../Action/feedAction"

const initState = {
    feedList: [],
    feedDetail: [],
    isFollowing: false,
    isThx: false,
    isScrap: false,
    isOpen: null,
    page: 0,
    feedMoreView: {
        report: false,
        share: false,
        edit: false,
        delete: false,
        isOpen: false
    },
    noneData: false,
    cnt: 0,
}

const feedReducer = (state = initState, action) => {

    const feedList = [...state.feedList]
    const feedDetail = [...state.feedDetail]
    const feedMoreView = {...state.feedMoreView}

    switch(action.type){

        case FEED_GET:
            if(action.page === 0){
                feedList.splice(0)
            }
            if(action.data !== null){
                for(let i = 0; i < action.data.length; i++){
                    feedList.push(action.data[i])
                    for(let j = 0; j < action.data[i].image1.length; j++){
                        feedList[feedList.length - 1].image1[j] = JSON.parse(action.data[i].image1[j])
                    }
                    for(let j = 0; j < action.data[i].image2.length; j++){
                        feedList[feedList.length - 1].image2[j] = JSON.parse(action.data[i].image2[j])
                    }
                    for(let j = 0; j < action.data[i].image3.length; j++){
                        feedList[feedList.length - 1].image3[j] = JSON.parse(action.data[i].image3[j])
                    }
                }
            }
            return{
                ...state,
                feedList: feedList,
                page: action.page,
                cnt: action.cnt !== undefined? action.cnt: 0
            }
        case FEED_RESET:
            feedList.splice(0)
            return{
                ...state,
                feedList: feedList,
                page: 0
            }
        case FEED_DETAIL_GET:
            feedDetail.splice(0)
            if(action.data !== null){
                feedDetail.push(action.data)
                for(let i = 0; i < feedDetail[0].image1.length; i++){
                    let image1 = JSON.parse(feedDetail[0].image1[i])
                    feedDetail[0].image1[i] = image1
                }
                for(let i = 0; i < feedDetail[0].image2.length; i++){
                    let image2 = JSON.parse(feedDetail[0].image2[i])
                    feedDetail[0].image2[i] = image2
                }
                if(feedDetail[0].image3 !== null){
                    for(let i = 0; i < feedDetail[0].image3.length; i++){
                        let image3 = JSON.parse(feedDetail[0].image3[i])
                        feedDetail[0].image3[i] = image3
                    }
                }
            }
            return{
                ...state,
                feedDetail: feedDetail,
                isFollowing: action.isFollowing,
                isThx: action.isThx,
                isScrap: action.isScrap,
                isOpen: action.isOpen,
                noneData: action.data !== null? false: true
            }
        case FEED_DETAIL_RESET:
            feedDetail.splice(0)
            return{
                ...state,
                feedDetail: feedDetail,
                noneData: false
            }
        case IMG_CHANGE:
            const feed = feedDetail[0].feed_place[action.index]
            if(action.text === "next"){
                feed.imgIndex += 1
                if(feed.imgIndex === feed?.img?.length){
                    feed.imgIndex = 0
                }
            }else if(action.text === "back"){
                feed.imgIndex -= 1
                if(feed.imgIndex < 0){
                    feed.imgIndex = feed?.img?.length - 1
                }
            }
            return{
                ...state,
                feedDetail: feedDetail
            }

        case FEED_MORE_VIEW_OPEN:
            if(action.bool){
                feedMoreView.isOpen = action.bool
                return{
                    ...state,
                    feedMoreView: feedMoreView
                }
            }
            feedMoreView.isOpen = false
            return{
                ...state,
                feedMoreView: feedMoreView
            }
        case FEED_MORE_VIEW_SELECTED:
            if (action.text === "report"){
                feedMoreView.report = true
                feedMoreView.edit = false
                feedMoreView.delete = false
            }else if (action.text === "feedEdit"){
                feedMoreView.report = false
                feedMoreView.edit = true
                feedMoreView.delete = false
            }else if (action.text === "feedDelete"){
                feedMoreView.report = false
                feedMoreView.edit = false
                feedMoreView.delete = true
            }else{
                feedMoreView.report = false
                feedMoreView.edit = false
                feedMoreView.delete = false
            }
            return{
                ...state,
                feedMoreView: feedMoreView,
            }
        default:
            return{
                ...state
            }
    }
}

export default feedReducer