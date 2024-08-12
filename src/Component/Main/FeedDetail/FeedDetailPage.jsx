import React, { useEffect } from "react"
import style from "./SCSS/FeedDetail.module.scss"
import FeedDetailTop from "./FeedDetailTop"
import FeedDetailContents from "./FeedDetailContents"
import FeedDetailMap from "./FeedDetailMap"
import FeedDetailComment from "./FeedDetailComment"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { feedDetailGet, feedDetailReset, feedMoreView } from "../../../Redux/Action/feedAction"
import { commentGet } from "../../../Redux/Action/commentAction"
import { commentBtn } from "../../../Redux/Action/mobileStyleAction"
import { topBarSelected, moreViewOpen, moreViewSelected } from "../../../Redux/Action/topBarAction"
import { leftBarOpen } from "../../../Redux/Action/leftBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import Private from "../Home/Private"
import Footer from "../Login/Footer"
import { reCommentInputOpen, commentReset } from "../../../Redux/Action/commentAction"

const FeedDetailPage = () => {

    const dispatch = useDispatch()
    const { feed_index } = useParams()
    const { account_index } = useParams()
    const feedContents = useSelector(state => state.feed.feedDetail[0]?.feed_place)
    const isOpen = useSelector(state => state.feed.isOpen)
    const noneData = useSelector(state => state.feed.noneData)
    
    dispatch(topBarSelected("feed"))
    dispatch(leftBarOpen())
    dispatch(moreViewSelected())
    dispatch(moreViewOpen())
    dispatch(rightBarOpen())
    dispatch(commentBtn())
    dispatch(feedMoreView())
    dispatch(reCommentInputOpen("cancel"))

    useEffect(() => {
        dispatch(commentGet(feed_index))
        dispatch(feedDetailGet(feed_index, account_index))

        return () => { 
            dispatch(feedDetailReset())
            dispatch(commentReset())
        }
    }, [feed_index])

    return(
        <>
            {
                isOpen === false && feedContents === undefined && noneData?
                <Private is_open = {false}/>:
                noneData?
                <Private undefined/>:
                <main id = {style.main}>
                    <div id = {style.feedBox}>
                        <FeedDetailTop/>
                        {
                            feedContents&&feedContents.map((e, index) =>
                                index === 0?
                                <FeedDetailContents key = {index} data = {e} index = {index}/>:
                                e.title !== "" &&
                                <FeedDetailContents key = {index} additional data = {e} index = {index}/>
                            )
                        }
                        <div id = {style.lastLineBox}>
                            <svg id = {style.lastLine} width="960" height="1" viewBox="0 0 960 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="960" y2="0.5" stroke="#E8E8E8"></line>
                            </svg>
                        </div>
                        <FeedDetailMap/>
                        <FeedDetailComment/>
                    </div>
                    <Footer id = {style.footer}/>
                </main>
            }
        </>
    )
}

export default FeedDetailPage