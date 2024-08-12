import React from "react"
import style from "./SCSS/LeftBar.module.scss"
import Button from "../Common/Button"
import SVG from "../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { alertIsOpen } from "../../Redux/Action/alertAction"

const LeftBarButton = (props) => {

    const dispatch = useDispatch()
    const currentState = useSelector(state => state.left.left)
    const addr = useSelector(state => state.left.leftBarData?.address)
    const buttonTextStyle = {
        color: style.grey02Color
    }
    const buttonTextSelectedStyle = {
        color: style.mainColor
    }
    const svgVisible = {
        visibility: "visible"
    }
    const svgHidden = {
        visibility: "hidden"
    }
    
    const onClickEvent = () => {
        dispatch(alertIsOpen("logout", "twoBtn"))
    }
    return(
        <div id = {style.menuBtn}>
            {
                props.feed?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.feedIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = {`/${addr}`} style = {currentState.feedIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                                currentState.feedIsSelected?
                                <SVG width = "17" height = "18" home on/>:
                                <SVG width = "17" height = "18" home/>
                        }
                        피드
                    </Link>
                </>:
                props.myFeed?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.myFeedIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = {`/${addr}`} style = {currentState.myFeedIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                                currentState.myFeedIsSelected?
                                <SVG width = "17" height = "18" home on/>:
                                <SVG width = "17" height = "18" home/>
                        }
                        내 피드
                    </Link>
                </>:
                props.activity?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.activityIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = "/activity" name = "activity" style = {currentState.activityIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                            currentState.activityIsSelected?
                            <SVG width = "17" height = "18" activity on/>:
                            <SVG width = "17" height = "18" activity/>
                        }
                        내 활동
                    </Link>
                </>:
                props.writerApp?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.writerAppIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = "/writerApp" name = "writerApp" style = {currentState.writerAppIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                            currentState.writerAppIsSelected?
                            <SVG width = "17" height = "18" writerApp on/>:
                            <SVG width = "17" height = "18" writerApp/>
                        }
                        작가신청
                    </Link>
                </>:
                props.notice?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.noticeIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = "/notice" name = "notice" style = {currentState.noticeIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                            currentState.noticeIsSelected?
                            <SVG width = "18" height = "18" notice on/>:
                            <SVG width = "18" height = "18" notice/>
                        }
                        공지사항
                    </Link>
                </>:
                props.inquiry?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.inquiryIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = "/inquiry" name = "inquiry" style = {currentState.inquiryIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                            currentState.inquiryIsSelected?
                            <SVG width = "17" height = "18" inquiry on/>:
                            <SVG width = "17" height = "18" inquiry/>
                        }
                        1:1문의
                    </Link>
                </>:
                props.account?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {currentState.accountIsSelected? svgVisible : svgHidden} menuClicked/>
                    <Link to = "/account" name = "account" style = {currentState.accountIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        {
                            currentState.accountIsSelected?
                            <SVG width = "17" height = "18" account on/>:
                            <SVG width = "17" height = "18" account/>
                        }
                        내 계정
                    </Link>
                </>:
                props.logout?
                <>
                    <SVG id = {style.clicked} width="6" height="30" style = {svgHidden} menuClicked/>
                    <button onClick={onClickEvent}>
                        <SVG width = "17" height = "18" logout/>
                        로그아웃
                    </button>
                </>:
                <></>
            }
        </div>
    )
}

export default LeftBarButton