import React from "react";
import style from "./SCSS/RightBar.module.scss";
import SVG from "../SVG/SVG"
import { useDispatch } from "react-redux";
import { rightBarOpen } from "../../Redux/Action/alarmAction"

const RightBarTop = () => {

    const dispatch = useDispatch()

    const onClickEvent = () => {
        dispatch(rightBarOpen())
    }

    return(
        <div id = {style.top}>
            <button onClick={onClickEvent} id = {style.moAlarmBtn}>
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <SVG width="17" height="19" rightBarAlert/>
            <h1>알림</h1>
        </div>
    )
}

export default RightBarTop;