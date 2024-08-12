import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import style from "./SCSS/MoBottomMenu.module.scss"
import { bottomOpen } from "../../Redux/Action/mobileStyleAction"
import { Link } from "react-router-dom"
import { alertIsOpen } from "../../Redux/Action/alertAction"
import SVG from "../SVG/SVG"

const MoBottomMenu = () => {

    const dispatch = useDispatch()
    const buttonTextStyle = {
        color: style.grey02Color
    }
    const buttonTextSelectedStyle = {
        color: style.mainColor
    }
    const userData = useSelector(state => state.left.leftBarData)
    const currentState = useSelector(state => state.left.left)
    const isOpen = useSelector(state => state.mobile.bottomOpen)

    const onClickEvent = (e) => {
        switch(e.target.name){
            case "logout":
                dispatch(alertIsOpen("logout", "twoBtn"))
                break
            default:    
                dispatch(bottomOpen(false))
        }
    }
    
    return(
        <>
            <div id = {style.overlay} style = {{ display: isOpen? "block": "none"}} onClick = {onClickEvent}></div>
            <aside id = {style.moBottomMenu} style = {{ bottom: isOpen? 0: userData?.is_photographer? -440: -530, maxHeight: userData?.is_photographer? 440: 530 }}>
                <div id = {style.btnBox}>
                    <Link to = {`/${userData?.address}`} style = {currentState.myFeedIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.85787 1.46154C9.05415 0.846154 7.94585 0.846154 7.15059 1.46154L1.49069 5.82051C1.17766 6.05983 1 6.42735 1 6.82051V13.6667C1 15.5128 2.48054 17 4.29949 17H5.9577V14.188C5.9577 13.2308 6.72758 12.453 7.67513 12.453H9.32487C10.2724 12.453 11.0423 13.2308 11.0423 14.188V17H12.7005C14.5279 17 16 15.5043 16 13.6667V6.82051C16 6.42735 15.8223 6.05983 15.5093 5.82051L9.85787 1.46154Z" stroke={currentState.myFeedIsSelected? "#4ED0F9": "#B0ABB5"} strokeWidth="1.5"/>
                        </svg>
                        내 피드
                    </Link>
                    <Link to = "/activity" style = {currentState.activityIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.1667 9.02778V2.33796C15.1667 1.98311 15.0423 1.6428 14.8209 1.39188C14.5995 1.14096 14.2992 1 13.9861 1H2.18056C1.86745 1 1.56717 1.14096 1.34578 1.39188C1.12438 1.6428 1 1.98311 1 2.33796V15.7176C1 16.0724 1.12438 16.4128 1.34578 16.6637C1.56717 16.9146 1.86745 17.0556 2.18056 17.0556H8.08333" stroke={currentState.activityIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.4383 17.2654C14.061 17.2654 15.3765 15.9499 15.3765 14.3272C15.3765 12.7044 14.061 11.3889 12.4383 11.3889C10.8155 11.3889 9.5 12.7044 9.5 14.3272C9.5 15.9499 10.8155 17.2654 12.4383 17.2654Z" stroke={currentState.activityIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.1111 18L14.5134 16.4023" stroke={currentState.activityIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="5.27783" y1="4.27777" x2="10.8889" y2="4.27777" stroke={currentState.activityIsSelected? "#4ED0F9" : "#B0ABB5"} strokeLinecap="round"/>
                            <line x1="5.27783" y1="6.16666" x2="10.8889" y2="6.16666" stroke={currentState.activityIsSelected? "#4ED0F9" : "#B0ABB5"} strokeLinecap="round"/>
                        </svg>
                        내 활동
                    </Link>
                    {
                        userData?.is_photographer?
                        <></>:
                        <Link to = "/writerApp" style = {currentState.writerAppIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1667 9.02776V15.7176C15.1667 16.0724 15.0423 16.4127 14.8209 16.6637C14.5995 16.9146 14.2992 17.0555 13.9861 17.0555H2.18056C1.86745 17.0555 1.56717 16.9146 1.34578 16.6637C1.12438 16.4127 1 16.0724 1 15.7176V2.33795C1 1.9831 1.12438 1.64278 1.34578 1.39187C1.56717 1.14095 1.86745 0.999987 2.18056 0.999987H8.08333" stroke={currentState.writerAppIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.8066 7.13994C15.4634 6.4832 15.8323 5.59246 15.8323 4.66369C15.8323 3.73492 15.4634 2.84418 14.8066 2.18744C14.1499 1.5307 13.2591 1.16174 12.3304 1.16174C11.4016 1.16174 10.5109 1.5307 9.85413 2.18744L5.91663 6.12494V11.0833H10.875L14.8066 7.13994Z" stroke={currentState.writerAppIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.3333 4.66663L4.16663 12.8333" stroke="#B0ABB5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.2083 8.75H8.25" stroke="#B0ABB5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            작가신청
                        </Link>
                    }
                    <Link to = "/notice" style = {currentState.noticeIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.51941 11.48H9.47941L9.68941 7.79L9.73941 6.4H8.25941L8.30941 7.79L8.51941 11.48ZM8.99941 14.14C9.51941 14.14 9.91941 13.72 9.91941 13.18C9.91941 12.64 9.51941 12.22 8.99941 12.22C8.47941 12.22 8.08941 12.64 8.08941 13.18C8.08941 13.72 8.47941 14.14 8.99941 14.14Z" fill={currentState.noticeIsSelected?"#4ED0F9":"#B0ABB5"}/>
                            <circle cx="9" cy="9" r="8.25" stroke={currentState.noticeIsSelected?"#4ED0F9":"#B0ABB5"} strokeWidth="1.5"/>
                        </svg>
                        공지사항
                    </Link>
                    <Link to = "/inquiry" style = {currentState.inquiryIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.8873 0.917577L3.8871 0.917643C3.17598 1.1595 2.27699 1.6327 1.81413 2.5311L3.8873 0.917577ZM3.8873 0.917577C4.38553 0.74797 4.92956 0.959736 5.29067 1.4052C5.29071 1.40525 5.29075 1.4053 5.29079 1.40534L6.62404 3.05126L6.6242 3.05147M3.8873 0.917577L6.6242 3.05147M6.74635 12.976L6.74641 12.9761C8.38405 14.6258 10.1211 15.7247 11.7707 15.9123L6.74635 12.976ZM6.74635 12.976C5.11281 11.3308 3.59805 9.15605 2.39114 6.85823L6.74635 12.976ZM14.708 15.0645L14.7081 15.0644C15.2753 14.4675 15.5113 13.683 15.6085 13.1057L15.6085 13.1056C15.6774 12.6965 15.4977 12.285 15.1686 11.9771C15.1685 11.9771 15.1685 11.977 15.1684 11.9769L13.4704 10.3911L13.4704 10.3911C13.2123 10.15 12.8837 9.99792 12.5329 9.95715C12.1821 9.91639 11.8275 9.98906 11.5211 10.1645C11.5211 10.1645 11.521 10.1645 11.521 10.1645C11.521 10.1645 11.521 10.1646 11.521 10.1646L9.87294 11.1086C9.69828 11.212 9.49748 11.2632 9.29441 11.2559C9.08694 11.2485 8.88622 11.1803 8.71715 11.0598L8.70868 11.0538L8.70037 11.0475C7.68006 10.2768 6.37828 9.08431 5.76819 7.64479C5.68335 7.45134 5.66903 7.23404 5.72808 7.03084L5.73193 7.01758L5.73627 7.00447C5.93262 6.41127 6.31692 5.74761 6.6775 5.19948L14.708 15.0645ZM14.708 15.0645C14.1501 15.6518 13.2492 16.0803 11.7708 15.9123L14.708 15.0645ZM6.6242 3.05147C7.1141 3.65581 7.11694 4.53105 6.67759 5.19934L6.6242 3.05147ZM2.39105 6.85806C1.2993 4.77804 1.35706 3.41915 1.81404 2.53128L2.39105 6.85806Z" stroke={currentState.inquiryIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.5"/>
                        </svg>
                        1:1 문의
                    </Link>
                    <Link to = "/account" style = {currentState.accountIsSelected? buttonTextSelectedStyle : buttonTextStyle }>
                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3.71423" y="0.75" width="7.30512" height="7.30512" rx="3.65256" stroke={currentState.accountIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.5"/>
                            <path d="M13.9833 13.6C13.9833 14.07 13.5391 14.7334 12.2614 15.3231C11.0474 15.8834 9.31764 16.25 7.36667 16.25C5.4157 16.25 3.6859 15.8834 2.47194 15.3231C1.19427 14.7334 0.75 14.07 0.75 13.6C0.75 13.1299 1.19427 12.4665 2.47194 11.8768C3.6859 11.3165 5.4157 10.95 7.36667 10.95C9.31764 10.95 11.0474 11.3165 12.2614 11.8768C13.5391 12.4665 13.9833 13.1299 13.9833 13.6Z" stroke={currentState.accountIsSelected? "#4ED0F9" : "#B0ABB5"} strokeWidth="1.5"/>
                        </svg>
                        내 계정
                    </Link>
                    <button name = "logout" onClick={onClickEvent} style = { buttonTextStyle }>
                        <SVG width = "17" height = "18" logout/>
                        로그아웃
                    </button>
                </div>
            </aside>
        </>
    )
}

export default MoBottomMenu