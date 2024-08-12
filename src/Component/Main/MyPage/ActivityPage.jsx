import React, { useEffect } from "react"
import style from "./SCSS/ActivityPage.module.scss"
import Button from "../../Common/Button"
import FeedList from "../Home/FeedList"
import CommentList from "./CommentList"
import { useSelector, useDispatch } from "react-redux"
import { bottomOpen } from "../../../Redux/Action/mobileStyleAction"
import { leftBarGet, leftBarOpen, leftBarSelected } from "../../../Redux/Action/leftBarAction"
import { activityTypeSelected, feedActivityListGet, commentActivityListGet } from "../../../Redux/Action/activityAction"
import { moreViewOpen, topBarSelected } from "../../../Redux/Action/topBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import Footer from "../Login/Footer"
import { feedReset } from "../../../Redux/Action/feedAction"
import scrollLoad from "../../../Hooks/scrollLoad"
import { throttle } from "lodash" 

const ActivityPage = () => {

    const dispatch = useDispatch()
    const currentState = useSelector(state => state.act.activity)
    const feedPage = useSelector(state => state.feed.page)

    // 고마워요, 스크랩, 댓글 버튼 클릭시 스타일
    let thanksStyle = {
        borderBottom: "2px solid black",
        color: style.blackColor,
        fontWeight: 800
    }
    let scrapStyle = {
        borderBottom: 0,
        color: style.greyColor,
        fontWeight: 600
    }
    let commentStyle = {
        borderBottom: 0,
        color: style.greyColor,
        fontWeight: 600
    }

    if(currentState.thanksSelected){
        thanksStyle = {
            borderBottom: "2px solid black",
            color: style.blackColor,
            fontWeight: 800
        }
        scrapStyle = {
            borderBottom: 0,
            color: style.greyColor,
            fontWeight: 600
        }
        commentStyle = {
            borderBottom: 0,
            color: style.greyColor,
            fontWeight: 600
        }
    }else if(currentState.scrapSelected){
        thanksStyle = {
            borderBottom: 0,
            color: style.greyColor,
            fontWeight: 600
        }
        scrapStyle = {
            borderBottom: "2px solid black",
            color: style.blackColor,
            fontWeight: 800
        }
        commentStyle = {
            borderBottom: 0,
            color: style.greyColor,
            fontWeight: 600
        }
    }else{
        thanksStyle = {
            borderBottom: 0,
            color: style.greyColor,
            fontWeight: 600
        }
        scrapStyle = {
            borderBottom: 0,
            color: style.greyColor,
            fontWeight: 600
        }
        commentStyle = {
            borderBottom: "2px solid black",
            color: style.blackColor,
            fontWeight: 800
        }
    }

    useEffect(() => {
        if(currentState.thanksSelected){
            dispatch(feedActivityListGet("thanks"))
        }else if(currentState.scrapSelected){
            dispatch(feedActivityListGet("scrap"))
        }else{
            dispatch(commentActivityListGet())
        }
        dispatch(leftBarGet())
        dispatch(leftBarSelected("activity"))
        dispatch(topBarSelected())
        dispatch(leftBarOpen(true))
        dispatch(moreViewOpen())
        dispatch(rightBarOpen())
        dispatch(bottomOpen())

        return () => { dispatch(feedReset()) }
    }, [currentState])

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "activityThanks":
            case "activityScrap":
            case "activityComment":
                dispatch(activityTypeSelected(e.currentTarget.name))
                break
        }
    }

    const onScrollEvent = throttle((e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이

        if(scrollLoad(scroll, scrollHeight, mainHeight)){
            if(currentState.thanksSelected){
                dispatch(feedActivityListGet("thanks", feedPage + 1))
            }else if(currentState.scrapSelected){
                dispatch(feedActivityListGet("scrap", feedPage + 1))
            }else{
                dispatch(commentActivityListGet())
            }
        }
    }, 300)

    return(
        // 내 활동
        <main id = {style.main} onScroll = {onScrollEvent}>
                <div id = {style.title}>
                    <Button name = "backBtn">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    <h1>내 활동</h1>
                </div>
                {/* 고마워요, 스크랩, 댓글 버튼 */}
                <div id = {style.activityTypeBox}>
                    <button onClick={onClickEvent} id = {style.thanks} name = "activityThanks" style = {thanksStyle}>고마워요</button>
                    <button onClick={onClickEvent} id = {style.scrap} name = "activityScrap" style = {scrapStyle}>스크랩</button>
                    <button onClick={onClickEvent} id = {style.comment} name = "activityComment" style = {commentStyle}>댓글</button>
                </div>
                {
                    currentState.thanksSelected || currentState.scrapSelected?
                    <FeedList/>:
                    <CommentList/>
                }
                {
                    !currentState.thanksSelected && !currentState.scrapSelected &&
                    <Footer id = {style.footer}/>
                }
        </main>
    )
}

export default ActivityPage