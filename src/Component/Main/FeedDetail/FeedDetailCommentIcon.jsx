import React from "react"
import style from "./SCSS/FeedDetail.module.scss"
import SVG from "../../SVG/SVG"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { feedBtnFetch, feedBtnUpload } from "../../../Redux/Action/feedAction"
import { getCookie } from "../../../Hooks/cookie"
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const FeedDetailCommentIcon = (props) => {

    const dispatch = useDispatch()
    const { feed_index } = useParams()
    const { account_index } = useParams()
    const data = {
        feed_index: feed_index,
        account_index: account_index
    }
    const isThx = useSelector(state => state.feed.isThx)
    const isScrap = useSelector(state => state.feed.isScrap)
    const myIndex = getCookie("index-token")

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "thanks":
                if(isThx){
                    dispatch(feedBtnFetch(data, e.currentTarget.name, "DELETE"))
                }else{
                    dispatch(feedBtnUpload(data, e.currentTarget.name,"POST"))
                }
                break
            case "scrap":
                if(isScrap){
                    dispatch(feedBtnFetch(data, e.currentTarget.name, "DELETE"))
                }else{
                    dispatch(feedBtnUpload(data, e.currentTarget.name,"POST"))
                }
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
        }
    }

    return(
        <>
            {
                props.thanks?
                <div id = {style.iconBox}>
                    <button onClick={onClickEvent} id = {style.icon} name = {getCookie("access-token") !== undefined? "thanks": "loginAlert"}>
                        {
                            isThx?
                            <SVG width="26" height="22" thanks on/>:
                            <SVG width="26" height="22" thanks/>
                        }
                    </button>
                    <p id = {style.num}>{props.children}</p>
                </div>:
                props.comment?
                <div id = {style.iconBox}>
                    <div id = {style.icon}>
                        <SVG width="26" height="22" comment/>
                    </div>
                    <p id = {style.num}>{props.children}</p>
                </div>:
                props.view && account_index === myIndex?
                <div id = {style.iconBox}>
                    <div id = {style.icon}>
                        <SVG width="24" height="18" view/>
                    </div>
                    <p id = {style.num}>{props.children}</p>
                </div>:
                props.scrap?
                <div id = {style.iconBox}>
                    <button onClick={onClickEvent} id = {style.icon} name = {getCookie("access-token") !== undefined? "scrap": "loginAlert"}>
                        {
                            isScrap?
                            <SVG width="21" height="20" scrap on/>:
                            <SVG width="21" height="20" scrap/>
                        }
                    </button>
                </div>:
                <></>
            }
        </>     
    )
}

export default FeedDetailCommentIcon