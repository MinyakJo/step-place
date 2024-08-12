import { SEARCH_FILTER_APPLY, SEARCH_FILTER_LIST_GET, SEARCH_FILTER_OPEN, SEARCH_FILTER_SELECTED, SEARCH_INPUT, SEARCH_TRANS_LIST_GET, SEARCH_TYPE_SELECTED } from "../Action/searchAction"

const initState = {
    withList: [],
    locList: [],
    transList: [],
    dateList: [ "전체", "오늘", "일주일", "한달", "1년" ],
    sortList: [ "업로드 날짜", "조회수", "고마워요" ],
    length: 0,
    select: {
        with: 0,
        date: 0,
        sort: 0,
        loc: 0,
        apply: false
    },
    style:{
        isOpen: false,
        isFeed: true,
    },
    searchInput: "",
    page: 0,
    searchReq: "",
}

const searchReducer = ( state = initState, action ) => {

    const withList = [...state.withList]
    const locList = [...state.locList]
    const transList = [...state.transList]
    const select = {...state.select}
    const style = {...state.style}
    let length = state.length

    switch( action.type ){
    
        case SEARCH_FILTER_LIST_GET:
            withList.splice(0)
            locList.splice(0)
            transList.splice(0)

            for(let i = 0; i < action.withData.length; i++){
                withList.push(action.withData[i])
            }
            for(let i = 0; i < action.locData.length; i++){
                locList.push(action.locData[i])
            }

            length = withList.length > locList.length ? withList.length : locList.length
            length = length > transList.length ? length : transList.length 
            return{
                ...state,
                withList: withList,
                locList: locList,
                length: length
            }
        case SEARCH_TRANS_LIST_GET:
            transList.splice(0)
            for(let i = 0; i < action.transData.length; i++){
                transList.push(action.transData[i])
            }
            length = length > transList.length ? length : transList.length 
            return{
                ...state,
                transList: transList,
                length: length
            }
        case SEARCH_FILTER_SELECTED:

            if(action.text === "searchWith"){
                select.with = action.index
            }else if(action.text === "searchDate"){
                select.date = action.index
            }else if(action.text === "searchSort"){
                select.sort = action.index
            }else if(action.text === "searchLoc"){
                select.loc = action.index
            }else{
                return{
                    ...state,
                    select: {
                        with: 0,
                        date: 0,
                        sort: 0,
                        loc: 0,
                        apply: false
                    },
                    searchReq: ""
                }
            }
            return{
                ...state,
                select: select,
            }

        case SEARCH_FILTER_OPEN:
            if(action.bool){
                style.isOpen = true
            }else{
                style.isOpen = false
                select.apply = false
            }
            return{
                ...state,
                style: style,
                select: select
            }
        case SEARCH_TYPE_SELECTED:
            if(action.bool){
                style.isFeed = action.bool
            }else{
                style.isFeed = false
            }
            return{
                ...state,
                style: style
            }
        case SEARCH_INPUT:
            return{
                ...state,
                searchInput: action.text
            }
        case SEARCH_FILTER_APPLY:
            select.apply = true
            return{
                ...state,
                select: select,
                searchReq: action.text
            }
        default:
            return state
    }
}

export default searchReducer