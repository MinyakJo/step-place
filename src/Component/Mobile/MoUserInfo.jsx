import React, { useEffect } from "react"
import style from "./SCSS/MoUserInfo.module.scss"
import SVG from "../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { moTopOpen } from "../../Redux/Action/mobileStyleAction"
import { getCookie } from "../../Hooks/cookie"
import { Link } from "react-router-dom"
import { alertIsOpen } from "../../Redux/Action/alertAction"
import { alarmGet, rightBarOpen } from "../../Redux/Action/alarmAction"
import { leftBarOpen } from "../../Redux/Action/leftBarAction"
import { moreViewOpen } from "../../Redux/Action/topBarAction"
import { followUnFollow } from "../../Redux/Action/followAction"

const MoUserInfo = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.left?.leftBarData)
    const isOpen = useSelector(state => state.mobile.moTopOpen)

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "moTopBtn":
                dispatch(moTopOpen(false))
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
            case "rightBar":
                dispatch(rightBarOpen(true))
                dispatch(alarmGet())
                dispatch(leftBarOpen())
                dispatch(moreViewOpen())
                break
            case "rightBarClose":
                dispatch(rightBarOpen())
                break
            case "unFollowBefore":
                dispatch(alertIsOpen("unFollow", "twoBtn", { address: userInfo?.address , message: "팔로우를 취소 하시겠습니까?" }))
                break
            case "follow":
                dispatch(followUnFollow(undefined, undefined, e.currentTarget.name, userInfo?.address))
                break
        }
    }

    return isOpen &&(
        <div id = {style.moTop}>
            <div id = {style.infoBox}>
                <div id = {style.profileBox}>
                    {
                        userInfo?.profile !== undefined && userInfo?.profile !== null?
                        <img src={`${process.env.REACT_APP_URL}/${userInfo?.profile}`}/>:
                        <SVG id = {style.profileImgNone} width = "16" height = "18" account/>
                    }
                </div>
                <div id = {style.cntBox}>
                    <Link id = {style.cnt} to = {`/${userInfo?.address}`}>
                        <p>{userInfo?.feed_cnt}</p>
                        <p id = {style.guide}>게시글</p>
                    </Link>
                    <Link id = {style.cnt} to = {`/follower/${userInfo?.address}`}>
                        <p>{userInfo?.follow_cnt}</p>
                        <p id = {style.guide}>팔로우</p>
                    </Link>
                    <Link id = {style.cnt} to = {`/following/${userInfo?.address}`}>
                        <p>{userInfo?.following_cnt}</p>
                        <p id = {style.guide}>팔로잉</p>
                    </Link>
                </div>
            </div>
            <div id = {style.followBtn}>
                {
                    userInfo?.account_index === Number(getCookie("index-token"))?
                    <Link id = {style.follow} to = "/myPage">
                        프로필 편집
                    </Link>:
                    userInfo?.is_following?
                    <button onClick={onClickEvent} id = {style.following} name = "unFollowBefore">
                        팔로잉
                    </button>:
                    <button onClick={onClickEvent} id = {style.follow} name = "follow">
                        팔로우
                    </button>
                }
            </div>
            <div id = {style.textBox}>
                <div id = {style.intro}>
                    <p>{userInfo?.introduction}</p>
                </div>
                <div id = {style.addr}>
                    <a href = {userInfo?.link} target = "_blank">
                        {userInfo?.link}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MoUserInfo