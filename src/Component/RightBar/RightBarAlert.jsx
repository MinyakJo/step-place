import React from "react"
import style from "./SCSS/RightBar.module.scss"
import Button from "../Common/Button"
import SVG from "../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { alertIsOpen } from "../../Redux/Action/alertAction"
import { Link, useNavigate } from "react-router-dom"
import { getCookie } from "../../Hooks/cookie"
import { followUnFollow } from "../../Redux/Action/followAction"

const RightBarAlert = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isWriter = useSelector(state => state.home.userData.is_photographer)
    const data = props?.data
    // data.alarm_type === 0
    //     //작가의 신규 피드
    // data.alarm_type === 1
    //     //댓글
    // data.alarm_type === 2
    //     //답글
    // data.alarm_type === 3
    //     //고마워요
    // data.alarm_type === 4
    //     //팔로잉
    // data.alarm_type === 5
    //     //작가신청
    // data.alarm_type === 6
    //     //공지사항

    const onClickEvent = (e, evnData) => {
        switch(evnData){
            case 0:
            case 1:
            case 2:
            case 3:
                navigate(`/feedDetail/${data.account_index}/${data.alarm_move_index}`)
                break
            case 4:
                navigate(`/${data.address}`)
                break
            case 5:
                if(data.alarm_move_index === 1){
                    dispatch(alertIsOpen("message", "oneBtn", { message: `${data.nickname}님의 작가 신청이 승인되었습니다.` }))
                }else{
                    dispatch(alertIsOpen("message", "oneBtn", { message: `${data.nickname}님의 작가 신청이 반려되었습니다.\n자세한 내용은 이메일을 참고해주세요.` }))
                }
                break
            case 6:
                navigate(`/noticeDetail/${data.alarm_move_index}`)
                break
            case "unFollowBefore":
                dispatch(alertIsOpen("unFollow", "twoBtn", {
                    address: data.address,
                    message: "팔로잉을 취소하시겠습니까?"}))
                break
            case "follow":
                dispatch(followUnFollow(undefined, undefined, e.currentTarget.name, data.address))
                break
            default:
                break;
        }
    }


    return data !== null && (
        <button id = {style.alertBox} onClick={(e) => onClickEvent(e, data?.alarm_type)}>
            {
                props.index === 0 &&
                <>
                    {
                        props.today?
                        <h2>오늘</h2>:
                        props.week?
                        <h2>이번 주</h2>:
                        props.month?
                        <h2>이번 달</h2>:
                        <h2>이전 활동</h2>
                    }
                </>
            }
            <div id = {style.alert}>
                <div id = {style.profile}>
                    {
                        data.alarm_type === 6 ?
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17.5" cy="17.5" r="17.5" fill="#F0FBFF"/>
                                <path d="M13.0454 15.8486V18.9686C13.0454 19.0307 13.0326 19.092 13.0076 19.1487L12.0249 21.3755H22.9803L21.9979 19.1487C21.9728 19.092 21.9598 19.0306 21.9598 18.9686V15.8486C21.9598 13.3868 19.9644 11.3914 17.5026 11.3914C15.0412 11.3914 13.0454 13.3868 13.0454 15.8486ZM15.3632 22.2669H11.888C11.7545 22.2669 11.6232 22.2336 11.5059 22.17C11.3885 22.1063 11.2889 22.0145 11.2161 21.9027C11.1432 21.7909 11.0994 21.6626 11.0886 21.5296C11.0778 21.3966 11.1003 21.263 11.1542 21.1409L12.154 18.8748V15.8486C12.154 12.8947 14.5487 10.5 17.5026 10.5C20.4565 10.5 22.8512 12.8947 22.8512 15.8486V18.8745L23.851 21.1409C23.9049 21.263 23.9274 21.3966 23.9166 21.5296C23.9058 21.6626 23.862 21.7909 23.7891 21.9027C23.7163 22.0145 23.6167 22.1063 23.4993 22.17C23.382 22.2336 23.2507 22.2669 23.1172 22.2669H19.642V22.6235C19.642 23.1909 19.4166 23.7351 19.0154 24.1363C18.6142 24.5375 18.07 24.7629 17.5026 24.7629C16.9352 24.7629 16.391 24.5375 15.9898 24.1363C15.5886 23.7351 15.3632 23.1909 15.3632 22.6235V22.2669ZM18.7506 22.2669H16.2546V22.6235C16.2546 22.9545 16.3861 23.2719 16.6201 23.506C16.8542 23.74 17.1716 23.8715 17.5026 23.8715C17.8336 23.8715 18.151 23.74 18.3851 23.506C18.6191 23.2719 18.7506 22.9545 18.7506 22.6235V22.2669Z" fill="#4ED0F9" stroke="#4ED0F9" strokeWidth="0.5"/>
                                <ellipse cx="24.5026" cy="10.5026" rx="1.16667" ry="1.16667" fill="#4ED0F9"/>
                            </svg>:
                        data.alarm_type === 5 ?
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17.5" cy="17.5" r="17.5" fill="#4ED0F9"/>
                                <path d="M24.71 17.7095C25.6951 16.7244 26.2485 15.3883 26.2485 13.9951C26.2485 12.6019 25.6951 11.2658 24.71 10.2807C23.7249 9.29562 22.3888 8.74219 20.9956 8.74219C19.6025 8.74219 18.2664 9.29562 17.2812 10.2807L11.375 16.187V23.6245H18.8125L24.71 17.7095Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 14L8.75 26.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22.3125 20.125H14.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>:
                        <>
                            {                       
                                data?.profile === null || data?.profile === undefined?
                                <SVG width = "16" height = "18" account/>:
                                <img width="35px" height="35px" src = {`${process.env.REACT_APP_URL}/${data?.profile}`}/>                          
                            }
                        </>
                    }
                </div>
                <div id = {style.alertDetail}>
                    {
                        data !== undefined?
                        <>
                            <article>
                                {
                                    data.alarm_type === 6 ?
                                    <>
                                        <p id = {style.noticeAccent}>[공지]</p>
                                    </>:
                                    <>
                                        <p id = {style.accent}>{data?.nickname}</p>님
                                    </>
                                }
                                {
                                    data.alarm_type === 0?
                                    <>
                                        의 새 게시물이 등록되었습니다.
                                    </>:
                                    data.alarm_type === 1?
                                    <>
                                        이 작가님의 글에 댓글을 달았습니다.
                                    </>:
                                    data.alarm_type === 2?
                                    <>
                                        이 답글을 달았습니다.
                                    </>:
                                    data.alarm_type === 3?
                                    <>
                                        이 작가님 글을 고마워합니다.
                                    </>:
                                    data.alarm_type === 4?
                                    <>
                                        이 { isWriter? "작가": "회원" }님을 팔로우하기 시작했습니다.
                                    </>:
                                    data.alarm_type === 5?
                                    <>
                                        의 작가신청이
                                        {` ${data.alarm_move_index === 1 ? "승인" : "반려" }되었습니다.`}
                                    </>:
                                    data.alarm_type === 6?
                                    <p>
                                        {data?.title}
                                    </p>:
                                    <></>
                                }
                                {/* {
                                    data.alarm_type !== 1 &&
                                    <br/>
                                } */}
                                <p id = {style.time}>
                                    {data?.date}
                                </p>
                            </article>
                            {
                                data.alarm_type === 1 &&
                                <Link to = {`/feedDetail/${data?.account_index}/${data?.feed_index}`}>
                                    답글 달기
                                </Link>
                            }
                        </>:
                        <></>
                    }
                </div>
                {
                    data.alarm_type === 1?
                    <div id = {style.alertImg}>
                        {
                            data?.image?
                            <img width="45px" height="45px" src = "/img/test.png"/>:
                            <img width="45px" height="45px" src = {`${process.env.REACT_APP_URL}/${JSON.parse(data?.image1[0]).file_path}`}/>
                        }
                    </div>:
                    <div id = {style.followBtnBox}>
                        {
                            data.alarm_type === 4?
                            // data.is_follow?
                            //<button onClick = {onClickEvent} id = {style.following} name = "unFollowBefore">팔로잉</button>:
                           <button onClick = {(ev) => onClickEvent(ev, "follow")} id = {style.follow}>팔로우</button>:
                           <></>
                        }
                    </div>
                }
            </div>
        </button>
    )
}

export default RightBarAlert