import React, { useEffect } from "react"
import style from "./SCSS/Timer.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { forgotCodeGet, forgotCodeInput, forgotCodePost, timer } from "../../../Redux/Action/loginAction"

const Timer = (props) => {

    const dispatch = useDispatch()
    const verifyState = useSelector(state => state.login.verify)
    const min = verifyState.min
    const sec = verifyState.sec
    const start = verifyState.start
    const end = verifyState.end
    const isCode = verifyState.alert
    const check = verifyState.check

    useEffect(() => {
        if(start){
            const count = setInterval(() => {
                dispatch(timer())
            }, 1000)
            if(end){
                clearInterval(count)
            }
            return () => clearInterval(count)
        }
    })

    let hiddenMsgStyle = {
        display: "none"
    }
    let inputLineStyle = {
        border: `1px solid ${style.grey02Color}`
    }

    if(isCode){
        hiddenMsgStyle.display = "flex"
        inputLineStyle.border = `1px solid red`
    }else{
        hiddenMsgStyle.display = "none"
        inputLineStyle.border = `1px solid ${style.grey02Color}`
    }

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "resend":
                dispatch(forgotCodeGet(props.email))
                break
            case "sumbit":
                dispatch(forgotCodePost(check))
                break
            default:
        }
    }

    const onChangeEvent = (e) => {
        dispatch(forgotCodeInput(e.target.value))
    }
    return(
        <>
            <div id = {style.verifyInput}>
                <h1 id = {style.inputGuide}>코드 입력</h1>
                    <input type = "text" placeholder = "인증번호 입력"  maxLength = {6} onChange = {onChangeEvent} value = {verifyState.text}/>
                    <p id = {style.timer}>
                        {
                            sec < 10?
                            `0${min}:0${sec}`:
                            `0${min}:${sec}`
                        }
                    </p>
                <p id = {style.hiddenMsg} style = {!isCode? { display: "none" }: { display: "flex" }}>
                    올바른 인증코드가 아닙니다.
                </p>
                <button id = {style.resend} name = "resend" onClick = {onClickEvent}>인증코드 재전송</button>
            </div>
            <div id = {style.btnBox}>
                <button id = {style.sumbit} name = "sumbit" onClick={onClickEvent}>확인</button>
            </div>
        </>
    )
}

export default Timer