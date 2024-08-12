import React, { useEffect } from "react"
import style from "./SCSS/Join.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { joinTimer } from "../../../Redux/Action/joinAction"

const Timer = () => {

    const dispatch = useDispatch()
    const verifyState = useSelector(state => state.join.verify)
    const min = verifyState.min
    const sec = verifyState.sec
    const start = verifyState.start
    const end = verifyState.end
    useEffect(() => {
        if(start){
            const count = setInterval(() => {
                dispatch(joinTimer())
            }, 1000)
            if(end){
                clearInterval(count)
            }
            return () => clearInterval(count)
        }
    })

    return(
        <p id = {style.timer}>
            {
                sec < 10?
                `0${min}:0${sec}`:
                `0${min}:${sec}`
            }
        </p>
    )
}

export default Timer