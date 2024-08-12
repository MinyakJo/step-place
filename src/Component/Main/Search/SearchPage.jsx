import React, { useEffect } from "react"
import style from "./SCSS/Search.module.scss"
import FeedList from "../Home/FeedList"
import AccountList from "../Home/AccountList"
import SearchType from "./SearchType"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router"
import MoTopBar from "../../Mobile/MoTopBar"
import { leftBarOpen } from "../../../Redux/Action/leftBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import { moreViewOpen, topBarSelected } from "../../../Redux/Action/topBarAction"
import { moTopOpen } from "../../../Redux/Action/mobileStyleAction"
import { searchFilterOpen, searchFilterSelected, searchGet } from "../../../Redux/Action/searchAction"
import { feedReset } from "../../../Redux/Action/feedAction"
import scrollLoad from "../../../Hooks/scrollLoad"
import { throttle } from "lodash" 

const SearchPage = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const searchTypeFeedIsSelected = useSelector(state => state.search.style.isFeed)
    const search_input = decodeURI(location.pathname.split("/")[2])
    const page = useSelector(state => state.feed.page)
    const req = useSelector(state => state.search.searchReq)

    dispatch(leftBarOpen())
    dispatch(rightBarOpen())
    dispatch(moreViewOpen())
    dispatch(moTopOpen())
    dispatch(topBarSelected())
    dispatch(searchFilterOpen(false))

    useEffect(() => {
        if(search_input !== undefined){
            const type = searchTypeFeedIsSelected? "basic/feed": "basic/account"
            dispatch(searchGet(search_input, type))
            dispatch(searchFilterSelected())
        }

        return () => { 
            dispatch(feedReset())
        }
    }, [location, searchTypeFeedIsSelected])

    const onScrollEvent = throttle((e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이

        if(scrollLoad(scroll, scrollHeight, mainHeight)){
            if(req === ""){
                dispatch(searchGet(search_input, "basic/feed", page + 1))
            }else{
                dispatch(searchGet(req, "advanced", page + 1))
            }
        }
    }, 300)

    return(
        <main id = {style.main} onScroll = {onScrollEvent}>
            <MoTopBar/>
            <SearchType/>
            {
                searchTypeFeedIsSelected?
                <FeedList search/>:
                <AccountList search/>
            }
        </main>
    )
}

export default SearchPage