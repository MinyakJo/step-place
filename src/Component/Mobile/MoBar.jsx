import React from "react"
import style from "./SCSS/MoBar.module.scss"
import SVG from "../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { getCookie } from "../../Hooks/cookie"
import MoreView from "../Main/Home/MoreView"
import { Link, useNavigate } from "react-router-dom"
import { alertIsOpen } from "../../Redux/Action/alertAction"

const MoBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentState = useSelector(state => state.top.top)
    const token = getCookie("access-token")
    const profileState = useSelector(state => state.home.userData)
    const searchSelect = useSelector(state => state.mobile.searchSelect)
    
    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "search":
                navigate("/m/search")
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
        }
    }
    return (
        <aside id = {style.bottomBar}>
            <Link id = {style.home} to = "/" name = "home">
                {
                    currentState.homeIsSelected?
                    <SVG width = "25" height = "25" topHome on/>:
                    <SVG width = "25" height = "25" topHome/>
                }
            </Link>
            <button onClick={onClickEvent} id = {style.search} name = "search">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7776 21.2016C16.1776 21.2016 20.5551 16.824 20.5551 11.424C20.5551 6.02405 16.1776 1.64648 10.7776 1.64648C5.37756 1.64648 1 6.02405 1 11.424C1 16.824 5.37756 21.2016 10.7776 21.2016Z" stroke={ searchSelect? style.mainColor : "#6A6A6A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22.9994 23.6465L17.6829 18.3299" stroke={ searchSelect? style.mainColor : "#6A6A6A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {
                token === null || token === undefined ?
                <button onClick={onClickEvent} id = {style.feed} name = "loginAlert">
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.35547 0.75H13.5798L20.9805 7.04058V20.0813C20.9805 20.4311 20.8179 20.7968 20.4759 21.0875C20.1301 21.3814 19.6386 21.5625 19.1055 21.5625H3.35547C2.82235 21.5625 2.3308 21.3814 1.98505 21.0875L1.5042 21.6532L1.98505 21.0875C1.64301 20.7968 1.48047 20.4311 1.48047 20.0813V2.23125C1.48047 1.88138 1.64301 1.51571 1.98505 1.22497C2.3308 0.931082 2.82235 0.75 3.35547 0.75Z" stroke="#6A6A6A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <mask id="path-2-inside-1_3646_8939" fill="white">
                            <path d="M12.8164 0V7.4375H21.1836"/>
                        </mask>
                        <path d="M14.3164 0C14.3164 -0.828427 13.6448 -1.5 12.8164 -1.5C11.988 -1.5 11.3164 -0.828427 11.3164 0H14.3164ZM12.8164 7.4375H11.3164C11.3164 8.26593 11.988 8.9375 12.8164 8.9375V7.4375ZM21.1836 8.9375C22.012 8.9375 22.6836 8.26593 22.6836 7.4375C22.6836 6.60907 22.012 5.9375 21.1836 5.9375V8.9375ZM11.3164 0V7.4375H14.3164V0H11.3164ZM12.8164 8.9375H21.1836V5.9375H12.8164V8.9375Z" fill="#6A6A6A" mask="url(#path-2-inside-1_3646_8939)"/>
                        <path d="M8.73047 17.3125H14.7305" stroke="#6A6A6A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>:
                <Link id = {style.feed} to = {`/feed/${profileState.account_index}`}>
                    {
                        currentState.feedIsSelected?
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.35547 0.75H13.5798L20.9805 7.04058V20.0813C20.9805 20.4311 20.8179 20.7968 20.4759 21.0875C20.1301 21.3814 19.6386 21.5625 19.1055 21.5625H3.35547C2.82236 21.5625 2.3308 21.3814 1.98505 21.0875C1.64301 20.7968 1.48047 20.4311 1.48047 20.0813V2.23125C1.48047 1.88138 1.64301 1.51571 1.98505 1.22497C2.3308 0.931082 2.82235 0.75 3.35547 0.75Z" fill="#4ED0F9" stroke="#4ED0F9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <mask id="path-2-inside-1_3646_7560" fill="white">
                                <path d="M14 0V6.5H21.5"/>
                            </mask>
                            <path d="M14 0V6.5H21.5" fill="white"/>
                            <path d="M14.4912 -0.566767C14.1782 -0.838048 13.7045 -0.804215 13.4332 -0.491198C13.162 -0.178181 13.1958 0.295486 13.5088 0.566767L14.4912 -0.566767ZM21.0088 7.06677C21.3218 7.33805 21.7955 7.30421 22.0668 6.9912C22.338 6.67818 22.3042 6.20451 21.9912 5.93323L21.0088 7.06677ZM21.9912 5.93323L14.4912 -0.566767L13.5088 0.566767L21.0088 7.06677L21.9912 5.93323ZM15.5 0C15.5 -0.828427 14.8284 -1.5 14 -1.5C13.1716 -1.5 12.5 -0.828427 12.5 0H15.5ZM14 6.5H12.5C12.5 7.32843 13.1716 8 14 8V6.5ZM21.5 8C22.3284 8 23 7.32843 23 6.5C23 5.67157 22.3284 5 21.5 5V8ZM12.5 0V6.5H15.5V0H12.5ZM14 8H21.5V5H14V8Z" fill="white" mask="url(#path-2-inside-1_3646_7560)"/>
                            <path d="M8.73047 17.3125H14.7305" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>:
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.35547 0.75H13.5798L20.9805 7.04058V20.0813C20.9805 20.4311 20.8179 20.7968 20.4759 21.0875C20.1301 21.3814 19.6386 21.5625 19.1055 21.5625H3.35547C2.82235 21.5625 2.3308 21.3814 1.98505 21.0875L1.5042 21.6532L1.98505 21.0875C1.64301 20.7968 1.48047 20.4311 1.48047 20.0813V2.23125C1.48047 1.88138 1.64301 1.51571 1.98505 1.22497C2.3308 0.931082 2.82235 0.75 3.35547 0.75Z" stroke="#6A6A6A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <mask id="path-2-inside-1_3646_8939" fill="white">
                                <path d="M12.8164 0V7.4375H21.1836"/>
                            </mask>
                            <path d="M14.3164 0C14.3164 -0.828427 13.6448 -1.5 12.8164 -1.5C11.988 -1.5 11.3164 -0.828427 11.3164 0H14.3164ZM12.8164 7.4375H11.3164C11.3164 8.26593 11.988 8.9375 12.8164 8.9375V7.4375ZM21.1836 8.9375C22.012 8.9375 22.6836 8.26593 22.6836 7.4375C22.6836 6.60907 22.012 5.9375 21.1836 5.9375V8.9375ZM11.3164 0V7.4375H14.3164V0H11.3164ZM12.8164 8.9375H21.1836V5.9375H12.8164V8.9375Z" fill="#6A6A6A" mask="url(#path-2-inside-1_3646_8939)"/>
                            <path d="M8.73047 17.3125H14.7305" stroke="#6A6A6A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    }
                </Link>
            }
            {
                token === null || token === undefined?
                <Link id = {style.login} to = "/login">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z" fill="#4ED0F9"/>
                        <rect x="11.7898" y="8" width="8.28718" height="8.28718" rx="4.14359" fill="white"/>
                        <ellipse cx="15.9333" cy="20.8001" rx="6.93333" ry="3.2" fill="white"/>
                    </svg>
                </Link>:
                <>
                    {
                        profileState !== null&&
                        <>
                            <Link to = {profileState?.address} id = {style.profileBtn}>
                                {
                                    profileState.profile === null?
                                    <SVG id = {style.profileImgNone} width = "16" height = "18" account/>:
                                    <img id = {style.profileImg} src = {`${process.env.REACT_APP_URL}/${profileState.profile}`}/>
                                }
                            </Link>
                            <MoreView top/>
                        </>
                    }
                </>
            }
        </aside>
    )
}

export default MoBar