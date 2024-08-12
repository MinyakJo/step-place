import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { joinCheckInput } from "../../../Redux/Action/joinAction"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import style from "./SCSS/Join.module.scss"

const JoinCheck = (props) => {

    const dispatch = useDispatch()
    const checkState = useSelector(state => state.join.check[props.index])
    const data = props.data

    const onChangeEvent = (e) => {
        dispatch(joinCheckInput(e.target.checked, props.index))
    }

    const onClickEvent = () => {
        dispatch(alertIsOpen("contents", "contents", { title: data.title, contents: data.contents, index: props.index }))
    }
    
    return(
        <div id = {style.check}>
            <input onChange = {onChangeEvent} type = "checkbox" checked = {checkState}/>
            <span id = {style.accent}>필수)</span>
            <p>{data?.title}</p>
            <button onClick={onClickEvent}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    )
}

export default JoinCheck