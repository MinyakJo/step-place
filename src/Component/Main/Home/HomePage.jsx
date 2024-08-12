import React, { useEffect } from "react"
import FeedList from "./FeedList"
import style from "./SCSS/Feed.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { addrInfoGet, feedGet, feedReset, myFeedGet } from "../../../Redux/Action/feedAction"
import { useParams } from "react-router-dom"
import { bottomOpen, moTopOpen } from "../../../Redux/Action/mobileStyleAction"
import { leftBarOpen, leftBarSelected, leftBarGet, leftBarReset } from "../../../Redux/Action/leftBarAction"
import { moreViewOpen, moreViewSelected, topBarSelected } from "../../../Redux/Action/topBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import { searchSelected } from "../../../Redux/Action/mobileStyleAction"
import { getCookie } from "../../../Hooks/cookie"
import MoUserInfo from "../../Mobile/MoUserInfo"
import Private from "./Private"
import MoTopBar from "../../Mobile/MoTopBar"
import scrollLoad from "../../../Hooks/scrollLoad"
import { logout } from "../../../Redux/Action/loginAction"
import { throttle } from "lodash" 

const HomePage = (props) => {

    const dispatch = useDispatch()
    const { account_index } = useParams()
    const { address } = useParams()
    const login = useSelector(state => state.login)
    const leftBarData = useSelector(state => state.left.leftBarData)
    const noneLeftData = useSelector(state => state.left.noneData)
    const page = useSelector(state => state.feed.page)
    
    let leftStyle = false
    let isPrivate = false

    if(props.accountFeed && account_index !== getCookie("index-token") || address !== undefined){
        leftStyle = true
    }

    if(props.home === undefined){
        if(leftBarData?.is_disabled && leftBarData?.account_index !== Number(getCookie("index-token"))){
            isPrivate = true
        }else if(noneLeftData){
            isPrivate = true
        }
    }
    
    if(props.accountFeed){
        dispatch(moreViewSelected())
        dispatch(topBarSelected())
        dispatch(moreViewOpen())
        dispatch(rightBarOpen())
        dispatch(searchSelected())
        if(account_index === getCookie("index-token") && getCookie("index-token") !== undefined){
            dispatch(leftBarOpen())
            dispatch(topBarSelected("feed"))
            dispatch(moTopOpen())
            dispatch(leftBarSelected())
        }else if(address !== undefined){
            dispatch(moreViewSelected())
            if(leftBarData?.account_index === null){
                dispatch(leftBarOpen())
                dispatch(moTopOpen())
            }else{
                dispatch(leftBarOpen(true))
                dispatch(moTopOpen(true))
            }
            dispatch(leftBarSelected("feed"))
            dispatch(leftBarSelected("myFeed"))
        }else{
            if(leftBarData?.account_index === null){
                dispatch(leftBarOpen())
                dispatch(moTopOpen())
            }else{
                dispatch(leftBarOpen(true))
                dispatch(moTopOpen(true))
            }
            dispatch(moTopOpen(true))
            dispatch(leftBarSelected("feed"))
        }
        dispatch(bottomOpen())
    }else if(props.my){
        dispatch(topBarSelected())
        dispatch(leftBarSelected("myFeed"))
        dispatch(moreViewSelected("myFeed"))
        if(leftBarData?.account_index === null){
            dispatch(leftBarOpen())
            dispatch(moTopOpen())
        }else{
            dispatch(leftBarOpen(true))
            dispatch(moTopOpen(true))
        }
        dispatch(moTopOpen(true))
        dispatch(bottomOpen())
    }else{
        dispatch(topBarSelected("home"))
        dispatch(moreViewSelected())
        dispatch(leftBarOpen())
        dispatch(moTopOpen())
        dispatch(leftBarSelected())
        dispatch(searchSelected())
    }

    useEffect(() => {
        if(props.accountFeed){
            if(account_index === getCookie("index-token") && getCookie("index-token") !== undefined){
                dispatch(feedGet(account_index))
                dispatch(leftBarGet(account_index))
            }else if(address !== undefined){
                dispatch(addrInfoGet(address))
            }else{
                dispatch(myFeedGet(account_index))
                dispatch(leftBarGet(account_index))
            }
        }else if(props.my){
            dispatch(myFeedGet(getCookie("index-token")))
            dispatch(leftBarGet(getCookie("index-token")))
        }else{
            dispatch(feedGet("main"))
        }

        if((getCookie("index-token") === undefined)){
            dispatch(logout())
        }

        return () => { 
            dispatch(feedReset())
            dispatch(leftBarReset())
        }
    }, [account_index, props.home, address])

    const onScrollEvent = throttle((e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이

        if(scrollLoad(scroll, scrollHeight, mainHeight)){
            if(props.accountFeed){
                if(account_index === getCookie("index-token") && getCookie("index-token") !== undefined){
                    dispatch(feedGet(account_index, page + 1))
                }else if(address !== undefined){
                    dispatch(addrInfoGet(address, page + 1))
                }else{
                    dispatch(myFeedGet(account_index, page + 1))
                }
            }else if(props.my){
                dispatch(myFeedGet(getCookie("index-token"), page + 1))
            }else{
                dispatch(feedGet("main", page + 1))
            }
        }
    }, 300)

    return(
        <>
            {
                isPrivate?
                <Private 
                    is_disabled = {
                        leftBarData?.is_disabled && 
                        leftBarData?.account_index !== Number(getCookie("index-token")) ? true : false}
                    undefined = {leftBarData?.account_index === null}
                    is_myFollowing = {account_index === getCookie("index-token") && getCookie("index-token") !== undefined ? true : false}
                    />:
                <main id = {style.main} onScroll = {onScrollEvent} 
                    style = {{
                        bottom: login ? 70: 0,
                    }}>
                        <MoTopBar/>
                        <MoUserInfo/>
                        <FeedList/>
                </main>
            }
        </>
    )
}

export default HomePage