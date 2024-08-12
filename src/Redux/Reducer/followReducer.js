import { FOLLOWER_GET, FOLLOWING_GET, FOLLOW_RESET, NOW_FEED, SEARCH_ACCOUNT_GET } from "../Action/followAction";

const initState = {
    followerList: [],
    followingList: [],
    searchAccountList: [],
    nowFeedIndex: undefined,
    page: 0,
    searchPage: 0,
}

const followReducer = (state = initState, action) => {

    const followerList = [...state.followerList]
    const followingList = [...state.followingList]
    const searchAccountList = [...state.searchAccountList]

    switch(action.type){
        case FOLLOWER_GET:
            if(action.page === 0){
                followerList.splice(0)
            }
            for(let i = 0; i < action.data?.length; i++){
                followerList.push(action.data[i])
            }
            return{
                ...state,
                followerList: followerList,
                page: action.page
            }
        case FOLLOWING_GET:
            if(action.page === 0){
                followingList.splice(0)
            }
            for(let i = 0; i < action.data?.length; i++){
                followingList.push(action.data[i])
            }
            return{
                ...state,
                followingList: followingList,
                page: action.page
            }
        case SEARCH_ACCOUNT_GET:
            if(action.page === 0){
                searchAccountList.splice(0)
            }
            for(let i = 0; i < action.data?.length; i++){
                searchAccountList.push(action.data[i])
            }
            return{
                ...state,
                searchAccountList: searchAccountList,
                page: action.page
            }
        case NOW_FEED:
            return{
                ...state,
                nowFeedIndex: action.index
            }
        case FOLLOW_RESET:
            followerList.splice(0)
            followingList.splice(0)
            return{
                ...state,
                followerList: followerList,
                followingList: followingList,
                page: 0
            }
        default:
            return{
                ...state
            }
    }
}

export default followReducer