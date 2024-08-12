import React from "react"
import style from "./SCSS/MoreView.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const MoreView = (props) => {

    const dispatch = useDispatch()
    const topIsOpen = useSelector(state => state.top.moreView?.isOpen)
    const feedIsOpen = useSelector(state => state.feed.feedMoreView?.isOpen)
    const currentStat = useSelector(state => state.top?.moreView)
    const feedCurrentStat = useSelector(state => state.feed?.feedMoreView)
    const profileState = useSelector(state => state.home?.userData)
    
    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "isLogout":
                dispatch(alertIsOpen("logout", "twoBtn"))
                break
            case "feedReportBefore":
                dispatch(alertIsOpen("feedReport", "twoBtn", { message: "피드를 신고 하시겠습니까?", feed_index: props?.feed_index, account_index: props?.account_index }))
                break
            case "feedDeleteBefore":
                dispatch(alertIsOpen("feedDelete", "twoBtn", { message: "피드를 삭제 하시겠습니까?", feed_index: props?.feed_index }))
                break
            default:
        }
    }

    return (topIsOpen || feedIsOpen) && (
        <div id = {props.top? style.topMoreViewBox: style.feedMoreViewBox}>
            <div id = {style.polygonBox}>
                
            </div>
            <div id = {style.moreView}>
                {
                    props?.top && topIsOpen?
                    <>
                        <div id = {style.myFeed}>
                            <Link to = {`${profileState?.address}`}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.6693 17.5V15.8333C16.6693 14.9493 16.3181 14.1014 15.693 13.4763C15.0678 12.8512 14.22 12.5 13.3359 12.5H6.66927C5.78522 12.5 4.93737 12.8512 4.31225 13.4763C3.68713 14.1014 3.33594 14.9493 3.33594 15.8333V17.5" stroke={currentStat.myFeed? style.mainColor : "black"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9.9974 9.16667C11.8383 9.16667 13.3307 7.67428 13.3307 5.83333C13.3307 3.99238 11.8383 2.5 9.9974 2.5C8.15645 2.5 6.66406 3.99238 6.66406 5.83333C6.66406 7.67428 8.15645 9.16667 9.9974 9.16667Z" stroke={currentStat.myFeed? style.mainColor : "black"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p style = {{ color: currentStat.myFeed? style.mainColor: style.blackColor }}>내 피드</p>
                            </Link>
                        </div>
                        {
                            !profileState?.is_photographer&&
                            <div id = {style.writerApp}>
                                <Link to = "/writerApp">
                                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.1667 9.02691V15.7167C15.1667 16.0716 15.0423 16.4119 14.8209 16.6628C14.5995 16.9137 14.2992 17.0547 13.9861 17.0547H2.18056C1.86745 17.0547 1.56717 16.9137 1.34578 16.6628C1.12438 16.4119 1 16.0716 1 15.7167V2.3371C1 1.98225 1.12438 1.64193 1.34578 1.39101C1.56717 1.1401 1.86745 0.999132 2.18056 0.999132H8.08333" stroke={currentStat.writerApp? style.mainColor : "black"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M14.8041 7.14226C15.4608 6.48552 15.8298 5.59478 15.8298 4.66601C15.8298 3.73723 15.4608 2.8465 14.8041 2.18976C14.1473 1.53302 13.2566 1.16406 12.3278 1.16406C11.399 1.16406 10.5083 1.53302 9.85156 2.18976L5.91406 6.12726V11.0856H10.8724L14.8041 7.14226Z" stroke={currentStat.writerApp? style.mainColor : "black"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12.3307 4.66406L4.16406 12.8307" stroke={currentStat.writerApp? style.mainColor : "black"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M13.2083 8.75H8.25" stroke={currentStat.writerApp? style.mainColor : "black"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p style = {{ color: currentStat.writerApp? style.mainColor: style.blackColor }}>작가신청</p>
                                </Link>
                            </div>
                        }
                        <div id = {style.logout}>
                            <button name = "isLogout" onClick={onClickEvent}>
                                <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33333 1H2.66667C2.22464 1 1.80072 1.17559 1.48816 1.48816C1.17559 1.80072 1 2.22464 1 2.66667V14.3333C1 14.7754 1.17559 15.1993 1.48816 15.5118C1.80072 15.8244 2.22464 16 2.66667 16H9.33333M12.6667 8.5L9.33333 5.16667M12.6667 8.5L9.33333 11.8333M12.6667 8.5H4.33333" stroke={currentStat.logout? style.mainColor : "black"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p style = {{ color: currentStat.logout? style.mainColor: style.blackColor }}>로그아웃</p>
                            </button>
                        </div>
                    </>:
                    props?.feed && feedIsOpen?
                    <>
                        {
                            Number(props.account_index) === profileState?.account_index?
                            <>
                                <div id = {style.edit}>
                                    <Link to = {`/feedEdit/${props.account_index}/${props.feed_index}`}>
                                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.1667 9.02691V15.7167C15.1667 16.0716 15.0423 16.4119 14.8209 16.6628C14.5995 16.9137 14.2992 17.0547 13.9861 17.0547H2.18056C1.86745 17.0547 1.56717 16.9137 1.34578 16.6628C1.12438 16.4119 1 16.0716 1 15.7167V2.3371C1 1.98225 1.12438 1.64193 1.34578 1.39101C1.56717 1.1401 1.86745 0.999132 2.18056 0.999132H8.08333" stroke={feedCurrentStat.edit? style.mainColor : "black"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M14.8041 7.14226C15.4608 6.48552 15.8298 5.59478 15.8298 4.66601C15.8298 3.73723 15.4608 2.8465 14.8041 2.18976C14.1473 1.53302 13.2566 1.16406 12.3278 1.16406C11.399 1.16406 10.5083 1.53302 9.85156 2.18976L5.91406 6.12726V11.0856H10.8724L14.8041 7.14226Z" stroke={feedCurrentStat.edit? style.mainColor : "black"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12.3307 4.66406L4.16406 12.8307" stroke={feedCurrentStat.edit? style.mainColor : "black"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M13.2083 8.75H8.25" stroke={feedCurrentStat.edit? style.mainColor : "black"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <p style = {{ color: feedCurrentStat.edit? style.mainColor: style.blackColor }}>수정하기</p>
                                    </Link>
                                </div>
                                <div id = {style.delete}>
                                    <button onClick={onClickEvent} name = "feedDeleteBefore">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.51941 10.48H9.47941L9.68941 6.79L9.73941 5.4H8.25941L8.30941 6.79L8.51941 10.48ZM8.99941 13.14C9.51941 13.14 9.91941 12.72 9.91941 12.18C9.91941 11.64 9.51941 11.22 8.99941 11.22C8.47941 11.22 8.08941 11.64 8.08941 12.18C8.08941 12.72 8.47941 13.14 8.99941 13.14Z" fill={feedCurrentStat.delete? style.mainColor : "black"}/>
                                            <circle cx="9" cy="9" r="8.25" stroke={feedCurrentStat.delete? style.mainColor : "black"} strokeWidth="1.5"/>
                                        </svg>
                                        <p style = {{ color: feedCurrentStat.delete? style.mainColor: style.blackColor }}>삭제하기</p>
                                    </button>
                                </div>
                            </>:
                            <div id = {style.report}>
                                <button onClick={onClickEvent} name = "feedReportBefore">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.63636 15.4208V13.6066H5.09091L6.88636 7.64236C7.00758 7.24928 7.23091 6.93542 7.55636 6.70079C7.88242 6.46675 8.24242 6.34974 8.63636 6.34974H11.3636C11.7576 6.34974 12.1176 6.46675 12.4436 6.70079C12.7691 6.93542 12.9924 7.24928 13.1136 7.64236L14.9091 13.6066H16.3636V15.4208H3.63636ZM7 13.6066H13L11.3636 8.16395H8.63636L7 13.6066ZM9.09091 4.53553V0H10.9091V4.53553H9.09091ZM14.5 6.78061L13.2045 5.48799L16.4318 2.29044L17.7045 3.56039L14.5 6.78061ZM15.4545 10.8853V9.07105H20V10.8853H15.4545ZM5.5 6.78061L2.29545 3.56039L3.56818 2.29044L6.79545 5.48799L5.5 6.78061ZM0 10.8853V9.07105H4.54545V10.8853H0Z" fill={feedCurrentStat.report? style.mainColor : "black"}/>
                                    </svg>
                                    <p style = {{ color: feedCurrentStat.report? style.mainColor: style.blackColor }}>신고하기</p>
                                </button>
                            </div> 
                        }
                    </>:
                    <></>
                }
            </div>
        </div>
    )
}

export default MoreView