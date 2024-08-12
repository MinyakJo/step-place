import React from "react"
import style from "./SCSS/LeftBar.module.scss"
import Button from "../Common/Button"
import SVG from "../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { getCookie } from "../../Hooks/cookie"
import { Link } from "react-router-dom"
import { alertIsOpen } from "../../Redux/Action/alertAction"
import { followUnFollow } from "../../Redux/Action/followAction"

const LeftBarProfile = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.left.leftBarData)
    const feed_index = useSelector(state => state.follow.nowFeedIndex)
    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "unFollowBefore":
                dispatch(alertIsOpen("unFollow", "twoBtn", { 
                    account_index: data?.account_index, 
                    feed_index: feed_index,
                    address: data?.address,
                    message: "팔로잉을 취소하시겠습니까?"}))
                break
            case "follow":
                dispatch(followUnFollow(
                    data?.account_index, 
                    feed_index, 
                    e.currentTarget.name, 
                    data?.address))
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
        }
    }
    
    return(
        <div id = {style.profileBox}>
            {/* 프로필 이미지 */}
            <div id ={style.profileImg}>
                {
                    data?.profile === null?
                    <SVG width = "16" height = "18" account/>:
                    <img width = "95" height = "95" src = {`${process.env.REACT_APP_URL}/${data?.profile}`}/>
                }
            </div>
            {/* 프로필 닉네임 */}
            <div id = {style.nickname}>
                <h1>{data?.nickname}</h1>
                {
                    data?.is_photographer &&
                    <SVG width = "18" height = "18" badge/>
                }
            </div>
            {/* 프로필 게시글 수, 팔로워 수, 팔로잉 수 */}
            <div id = {style.stat}>
                <div id = {style.statNum}>
                    <Link to = {`${data?.address}`}>    
                        <h2>{data?.feed_cnt}</h2>
                        <p>게시글</p>
                    </Link>
                </div>
                <div id = {style.statNum}>
                    <Link to = {`/follower/${data?.address}`}>
                        <h2>{data?.follow_cnt}</h2>
                        <p>팔로워</p>
                    </Link>
                </div>
                <div id = {style.statNum}>
                    <Link to = {`/following/${data?.address}`}>
                        <h2>{data?.following_cnt}</h2>
                        <p>팔로잉</p>
                    </Link>
                </div>
            </div>
            {/* 팔로우 버튼 */}
            <div id = {style.followBtn}>
                {
                    data?.account_index === Number(getCookie("index-token"))?
                    <Link id = {style.follow} to = "/myPage" name = "myPage">
                        프로필 편집
                    </Link>:
                    <>
                        {
                            data?.is_following?
                            <button onClick={onClickEvent} id = {style.following} name = "unFollowBefore" data = {{ account_index: data.account_index, feed_index: feed_index, message: "팔로우를 취소 하시겠습니까?" }}>
                                팔로잉
                            </button>:
                            <button onClick={onClickEvent} id = {style.follow} name = {getCookie("index-token") !== undefined? "follow": "loginAlert"} account_index = {data.account_index} feed_index = {feed_index}>
                                팔로우
                            </button>
                        }
                    </>
                }
            </div>
            {/* 소개글 */}
            <div id = {style.intro}>
                {
                    data?.introduction === null?
                    <p></p>:
                    <p>{data?.introduction}</p>
                }
                {
                    data?.link === null || data?.link === "" || data?.link === undefined?
                    <p></p>:
                    <a href={data?.link} id = {style.link} target="_blank">
                        {data?.link}
                    </a>
                }
            </div>
        </div>
    )
}

export default LeftBarProfile