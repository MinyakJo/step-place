import React from "react"
import style from "./SCSS/Account.module.scss"
import SVG from "../../SVG/SVG"
import { getCookie } from "../../../Hooks/cookie"
import { useDispatch } from "react-redux"
import { followUnFollow } from "../../../Redux/Action/followAction"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import { Link, useParams } from "react-router-dom"

const Account = (props) => {

    const { address } = useParams()
    const dispatch = useDispatch()
    const data = props.children
    const onClickEvent = (e) => {
        switch (e.currentTarget.name) {
            case "unfollowBefore":
                dispatch(alertIsOpen("unFollow", "twoBtn", { 
                    account_index: data?.account_index,
                    feed_index: undefined,
                    address: address,
                    message: "팔로잉을 취소하시겠습니까?"}))
                break
            case "follow":
                dispatch(followUnFollow(data?.account_index, undefined, e.currentTarget.name, address))
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
            default:
                break;
        }
    }

    return(
        <article id = {style.accountBox}>
            {
                data?.profile === null?
                <div id = {style.profile}>
                    <SVG width = "16" height = "18" account/>
                </div>:
                <div id = {style.profile}>
                    <img src = {`${process.env.REACT_APP_URL}/${data.profile}`}/>
                </div>
            }
            <Link id = {style.moAccount} to = {`/${data?.address}`}>
                <div id = {style.nickname}>
                    <h1>{data?.nickname}</h1>
                    {
                        data?.is_photographer &&
                        <SVG id = {style.badge} width="18" height="18" badge/>
                    }
                </div>
                {
                    props.search &&
                    <div id = {style.intro}>
                        <p>{data?.introduction}</p>
                    </div>
                }
            </Link>
            <Link id = {style.account} to = {`/${data?.address}`}>
                <div id = {style.nickname}>
                    <h1>{data?.nickname}</h1>
                    {
                        data?.is_photographer &&
                        <SVG id = {style.badge} width="18" height="18" badge/>
                    }
                </div>
                <div id = {style.intro}>
                    <p>{data?.introduction}</p>
                </div>
            </Link>
            <div id = {props.search? style.searchBtnBox: style.btnBox}>
                {
                    data?.account_index !== Number(getCookie("index-token")) &&
                    <>
                        {
                            props.following?
                            <button onClick = {onClickEvent} id = {style.following} name = {getCookie("index-token") !== undefined? "unfollowBefore": "loginAlert"}>팔로잉</button>:
                            <button onClick = {onClickEvent} id = {style.follow} name = {getCookie("index-token") !== undefined? "follow": "loginAlert"}>팔로우</button>
                        }
                    </>
                }
            </div>
        </article>
    )
}

export default Account