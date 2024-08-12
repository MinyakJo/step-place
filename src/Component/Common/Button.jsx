import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { leftBarOpen } from "../../Redux/Action/leftBarAction"
import { rightBarOpen } from "../../Redux/Action/alarmAction"
import { moreViewOpen } from "../../Redux/Action/topBarAction"
import { logout } from "../../Redux/Action/loginAction"
import { alertIsOpen, alertNicknameEdit, alertNicknameDate, alertAddrEdit, alertPwEdit, alertIntroEdit, alertCancelMem, alertLinkEdit, anotherAlertIsOpen, alertInput } from "../../Redux/Action/alertAction"
import { userData } from "../../Redux/Action/action"
import { feedDelete, feedReport } from "../../Redux/Action/feedAction"
import { commentDelete, commentReport } from "../../Redux/Action/commentAction"
import { moTopOpen, bottomOpen } from "../../Redux/Action/mobileStyleAction"
import { followUnFollow } from "../../Redux/Action/followAction"
import { writerAppInput, writerAppPageCount } from "../../Redux/Action/writerAppAction"

const Button = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onClickEvent = () => {
        switch(props?.name){
        case "unFollow":
            dispatch(followUnFollow(props.data?.account_index, props.data?.feed_index, props.name, props.data?.address))
            break
        case "moTopBarClose":
            dispatch(moTopOpen(false))
            break
        case "backBtn":
            navigate(-1)
            break
        //다이얼로그
        case "overlay":
            dispatch(alertIsOpen())
            dispatch(userData())
            break
        case "nicknameEditInput":
            dispatch(alertNicknameDate(props.nickname))
            break
        case "nicknameEdit":
            dispatch(alertNicknameEdit(props?.value))
            break
        case "accountAddrInput":
            dispatch(anotherAlertIsOpen("accountAddrInput", "inputOneBtn"))
            if(props.data?.data !== undefined){ 
                dispatch(alertInput(props.data?.data))
            }
            break
        case "linkEdit":
            dispatch(alertLinkEdit(props?.value))
            break
        case "addrEdit":
            dispatch(alertAddrEdit(props?.value))
            break
        case "pwEdit":
            dispatch(alertPwEdit(props?.value))
            break
        case "introEdit":
            dispatch(alertIntroEdit(props?.value))
            break
        case "accountCancelMem":
            dispatch(alertCancelMem())
            dispatch(alertIsOpen())
            dispatch(leftBarOpen())
            dispatch(rightBarOpen())
            dispatch(moreViewOpen())
            dispatch(logout())
            break
        case "feedReport":
            dispatch(feedReport(props?.data.feed_index, props?.data.account_index))
            break
        case "feedDelete":
            dispatch(feedDelete(props?.data.feed_index))
            break
        case "logout":
            dispatch(alertIsOpen())
            dispatch(leftBarOpen())
            dispatch(rightBarOpen())
            dispatch(moreViewOpen())
            dispatch(bottomOpen())
            dispatch(logout())
            break
        case "writerAppMove":
            dispatch(alertIsOpen())
            break
        case "writerApp":
            dispatch(alertIsOpen())
            dispatch(writerAppPageCount(true))
            dispatch(writerAppInput(""))
            navigate("/", { replace: true })
            break
        case "writerAppFalse":
            dispatch(alertIsOpen())
            dispatch(writerAppPageCount(true))
            dispatch(writerAppInput(""))
            break
        case "commentDelete":
        case "reCommentDelete":
            if(props?.type){
                dispatch(commentDelete(props?.data, props?.type))
            }else{
                dispatch(commentDelete(props?.data))
            }
            break
        case "commentReport":
        case "reCommentReport":
            if(props?.type){
                dispatch(commentReport(props?.data, props?.type))
            }else{
                dispatch(commentReport(props?.data))
            }
            break
        case "forgotPwSuccess":
            navigate("/login")
            break
        default:
       }
    }
    
    return(
        <>
            {/* 버튼, 링크 */}
            {
                props?.link && !props?.navigate?
                <Link id = {props?.id} onClick={onClickEvent} to = {props?.value} style = {props?.style}>
                    {props?.children}
                </Link>:
                <button id = {props?.id} onClick={onClickEvent} value = {props?.value} style = {props?.style} disabled = {props?.disabled}>
                    {props?.children}
                </button>

            }
        </>
    )
}

export default Button