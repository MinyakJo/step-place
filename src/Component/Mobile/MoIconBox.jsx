import React, { useEffect } from "react"
import style from "./SCSS/MoIcons.module.scss"
import SVG from "../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { getCookie } from "../../Hooks/cookie"
import { Link } from "react-router-dom"
import { rightBarOpen, alarmGet } from "../../Redux/Action/alarmAction"
import { moreViewOpen } from "../../Redux/Action/topBarAction"
import { alertIsOpen } from "../../Redux/Action/alertAction"
import { bottomOpen } from "../../Redux/Action/mobileStyleAction"

const MoIconBox = () => {

    const dispatch = useDispatch()
    const currentState = useSelector(state => state.top.top)
    const token = getCookie("access-token")
    const rightBarIsOpen = useSelector(state => state.alarm?.isOpen)
    const isOpen = useSelector(state => state.mobile.moTopOpen)

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
            break
            case "rightBar":
                dispatch(rightBarOpen(true))
                dispatch(alarmGet())
                dispatch(moreViewOpen())
                break
            case "rightBarClose":
                dispatch(rightBarOpen())
                break
            case "move":
                dispatch(bottomOpen(true))
                break
        }
    }

    return (token !== undefined) && (
        <div id = {style.currentStat}>

            {/* 아이콘 박스 */}
            <div id = {style.iconBox}>
                {/* 글쓰기 */}
                {
                    token === null || token === undefined ?
                    <button onClick={onClickEvent} id = {style.write} name = "loginAlert">
                        <SVG width = "25" height = "25" feedPosting/>
                    </button>:
                    <Link id = {style.write} to = "/feedPosting">
                        {
                            currentState.postingIsSelected?
                            <SVG width = "25" height = "25" feedPosting on/>:
                            <SVG width = "25" height = "25" feedPosting/>
                        }
                    </Link>
                }

                {/* 알림창 */}
                {
                    token === null || token === undefined ?
                    <button onClick={onClickEvent} id = {style.alert} name = "loginAlert">
                        <SVG width = "25" height = "25" alert/>
                    </button>:
                    <button onClick={onClickEvent} id = {style.alert} name = { rightBarIsOpen? "rightBarClose": "rightBar"}>
                        {
                            currentState.alertIsSelected?
                            <SVG width = "25" height = "25" alert on/>:
                            <SVG width = "25" height = "25" alert/>
                        }
                    </button>
                }

                {/* 내피드 들어갔을 때 보일 창 */}
                {
                    (token !== null && token !== undefined) &&
                    isOpen &&
                    <button onClick={onClickEvent} name="move" id = {style.moTopBarOpen}>
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="21.7895" height="2.84211" fill="#6A6A6A"/>
                            <rect y="7.57895" width="21.7895" height="2.84211" fill="#6A6A6A"/>
                            <rect y="15.1579" width="21.7895" height="2.84211" fill="#6A6A6A"/>
                        </svg>
                    </button>
                }
            </div>
        </div>
    )
}

export default MoIconBox