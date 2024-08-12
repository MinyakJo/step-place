import React, { useEffect } from "react"
import style from "./SCSS/FeedDetail.module.scss"
import SVG from "../../SVG/SVG"
import MoreView from "../../Main/Home/MoreView"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getCookie } from "../../../Hooks/cookie"
import { nowFeed } from "../../../Redux/Action/followAction"
import { Link } from "react-router-dom"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import { followUnFollow } from "../../../Redux/Action/followAction"
import { leftBarOpen } from "../../../Redux/Action/leftBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import { feedMoreView } from "../../../Redux/Action/feedAction"

const FeedDetailTop = () => {

    const dispatch = useDispatch()
    const { feed_index } = useParams()
    const feedData = useSelector(state => state.feed.feedDetail[0])
    const isFollowing = useSelector(state => state.feed.isFollowing)
    const isOpen = useSelector(state => state.feed?.feedMoreView?.isOpen)
    const addr = feedData?.address
    const token = getCookie("access-token")

    useEffect(() => { 
        dispatch(nowFeed(feed_index)) 
    }, [])

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "unFollowBefore":
                dispatch(alertIsOpen("unFollow", "twoBtn", { account_index: feedData?.account_index, feed_index: feed_index, address: addr, message: "팔로잉을 취소하시겠습니까?"}))
                break
            case "follow":
                dispatch(followUnFollow(feedData?.account_index, feed_index, e.currentTarget.name, addr))
                break
            case "feedMoreView":
                dispatch(feedMoreView(!isOpen))
                dispatch(leftBarOpen())
                dispatch(rightBarOpen())
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
        }
    }

    return(
        <>
            <div id = {style.top}>
                {/* 뒤로가기 버튼 */}
                <Link id = {style.back} to = {-1}>
                    <SVG width="11" height="20" back/>
                </Link>
                {/* 작성자 정보 */}
                <div id = {style.writerInfo}>
                    {/* 프로필 사진, 닉네임 */}
                    <Link id = {style.writer} to = {`/${addr}`}>
                        <div id = {style.profile}>
                            {
                                feedData !== undefined && feedData.profile !== undefined?
                                <img width="48px" height="48px" src={`${process.env.REACT_APP_URL}/${feedData?.profile}`} alt = ""/>:
                                <SVG width = "16" height = "18" account/>
                            }
                        </div>
                        <h1>{feedData?.nickname}</h1>
                        {
                            feedData?.is_photographer&&
                            <SVG width = "18" height = "18" badge/>
                        }
                    </Link>
                    {/* 글을 작성한 날짜 */}
                    {
                        feedData === undefined?
                        <></>:
                        <p id = {style.date}>
                            {`${feedData?.date.split("-")[0].substr(2)}년 
                            ${feedData?.date.split("-")[1]}월 
                            ${feedData?.date.split("-")[2]}일`}
                        </p>
                    }
                    {/* 팔로우 버튼 */}
                    {
                        feedData?.account_index !== Number(getCookie("index-token")) &&
                        <>
                            {
                                isFollowing?
                                <button onClick={onClickEvent} id = {style.following} name = "unFollowBefore">
                                    팔로잉
                                </button>:
                                <button onClick={onClickEvent} id = {style.follow} name = {token !== undefined? "follow": "loginAlert"}>
                                    팔로우
                                </button>
                            }
                        </>
                    }
                </div>
                {/* 방문했을 당시 정보 */}
                <div id = {style.visitInfo}>
                    {/* 방문 마크 */}
                    <div id = {style.bgAccent}>
                        <SVG width = "35" height = "22" visitMark/>
                    </div>
                    {/* 자세한 방문 정보 */}
                    {
                        feedData === undefined?
                        <></>:
                        <>
                            <p id = {style.date}>
                                {`${feedData?.visit_date.split("-")[0].substr(2)}년 
                                ${feedData?.visit_date.split("-")[1]}월 
                                ${feedData?.visit_date.split("-")[2]}일`}
                            </p>
                            <p>{feedData?.place}</p>
                            <p id = {style.accent}>with</p>
                            <p>{feedData?.together}</p>
                        </>
                    }
                </div>
                {/* 더보기 */}
                <div id = {style.moreViewBox}>
                    {
                        token !== undefined &&
                        <>
                            <button onClick={onClickEvent} id = {style.moreView} name = "feedMoreView">
                                <SVG width = "4" height = "18" moreView/>
                            </button>
                            <MoreView feed account_index = {feedData?.account_index} feed_index = {feed_index}/>
                        </>
                    }
                </div>
            </div>
            {/* 모바일 버전 */}
            <div id = {style.topMo}>
                <div id = {style.writerInfo}>
                    <Link id = {style.writer} to = {`/${addr}`}>
                        {
                            feedData?.profile?
                            <div id = {style.profile}>
                                <img width="48px" height="48px" src={`${process.env.REACT_APP_URL}/${feedData?.profile}`}/>
                            </div>:
                            <div id = {style.profile}>
                                <SVG width = "16" height = "18" account/>
                            </div>
                        }
                        <div id = {style.textBox}>
                            <div id = {style.nickname}>
                                <h1>{feedData?.nickname}</h1>
                                {
                                    feedData?.is_photographer &&
                                    <SVG width = "18" height = "18" badge/>
                                }
                            </div>
                            {
                                feedData === undefined?
                                <></>:
                                <p id = {style.date}>
                                    {`${feedData?.date.split("-")[0].substr(2)}년 
                                    ${feedData?.date.split("-")[1]}월 
                                    ${feedData?.date.split("-")[2]}일`}
                                </p>
                            }
                        </div>
                    </Link>
                    {
                        feedData?.account_index !== Number(getCookie("index-token")) &&
                        <>
                            {
                                isFollowing?
                                <button onClick={onClickEvent} id = {style.following} name = "unFollowBefore">
                                    팔로잉
                                </button>:
                                <button onClick={onClickEvent} id = {style.follow} name = {token !== undefined? "follow": "loginAlert"}>
                                    팔로우
                                </button>
                            }
                        </>
                    }
                </div>
                <div id = {style.visitInfo}>
                    <div id = {style.bgAccent}>
                        <SVG width = "35" height = "22" visitMark/>
                    </div>
                    {
                        feedData === undefined?
                        <></>:
                        <>
                            <p id = {style.date}>
                                {`${feedData?.visit_date.split("-")[0].substr(2)}년 
                                ${feedData?.visit_date.split("-")[1]}월 
                                ${feedData?.visit_date.split("-")[2]}일`}
                            </p>
                            <p>{feedData?.place}</p>
                            <p id = {style.accent}>with</p>
                            <p>{feedData?.together}</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default FeedDetailTop