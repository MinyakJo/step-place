import React from "react"
import style from "./SCSS/FeedDetail.module.scss"
import SVG from "../../SVG/SVG"
import { getCookie } from "../../../Hooks/cookie"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { commentBtn } from "../../../Redux/Action/mobileStyleAction"
import { reCommentInput, reCommentInputOpen, reCommentPost } from "../../../Redux/Action/commentAction"
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const CommentDetail = (props) => {

    const dispatch = useDispatch()
    const { feed_index } = useParams()
    const account_index = useSelector(state => state.feed?.feedDetail[0]?.account_index)
    const data = props.data
    const reComment = useSelector(state => state.comment.reCommentInput)
    const moComment = useSelector(state => state.mobile.comment)

    const onClickEvent = (e, comment) => {
        switch(e.currentTarget.name){
            case "reCommentOpen":
                dispatch(reCommentInputOpen(data?.comment_index, data?.reply_index))
                break
            case "reCommentCancel":
                dispatch(reCommentInputOpen("cancel"))
                break
            case "commentReportBefore":
                dispatch(alertIsOpen(props.reComment?"reCommentReport":"commentReport", 
                    "twoBtn", 
                    { 
                        "comment_index": data?.comment_index,
                        "feed_index": feed_index,
                        "re_comment_index": data?.reply_index,
                        "account_index": data?.account_index,
                        "contents": data?.contents,
                        "message": props.reComment? "답글을 신고 하시겠습니까?": "댓글을 신고 하시겠습니까?"
                    }))
                break
            case "commentDeleteBefore":
                dispatch(alertIsOpen(props.reComment?"reCommentDelete":"commentDelete", 
                    "twoBtn", 
                    {
                        "comment_index": data?.comment_index,
                        "feed_index": feed_index,
                        "re_comment_index": data?.reply_index,
                        "account_index": data?.account_index,
                        "message": props.reComment? "답글을 삭제 하시겠습니까?": "댓글을 삭제 하시겠습니까?"
                    }))
                break
            case "reCommentUpload":
                dispatch(reCommentPost({ 
                    "comment_index": data?.comment_index,
                    "feed_index": feed_index,
                    "re_comment_index": data?.reply_index,
                    "account_index": account_index,
                    "contents": reComment?.input,
                }))
                break
            case "loginAlert":
                dispatch(alertIsOpen("login", "oneBtn"))
                break
            default:
                if(comment === "comment"){
                    dispatch(commentBtn(!moComment.commentOpen, data.comment_index, data.reply_index))
                    dispatch(reCommentInputOpen("cancel"))
                }
        }
    }

    const onChangeEvent = (e) => {
        dispatch(reCommentInput(e.target.value))
    }

    return(
        <>
            <div id = {style.commentDetail} style = {{ 
                marginTop: data?.is_secret && !data?.is_show? 20: 16,
                marginBottom: data?.is_secret && !data?.is_show? 20: 0,
            }}>
                {
                    props.reComment&&
                    <SVG id = {style.reCommentSvg} width="16" height="16" reComment/>
                }
                <div id = {props.reComment? style.reComment: style.comment}>
                    {
                        ((!data?.is_secret && data?.is_show === undefined) ||
                        (data?.is_secret && data?.is_show)) &&
                        <div id = {style.writerInfo}>
                            <div id = {style.info}>
                                {
                                    data?.profile === null || data?.profile === undefined?
                                    <div id = {style.profileImg}>
                                        <SVG width = "16" height = "18" account/>
                                    </div>:
                                    <img width="24" height="24" id = {style.profileImg} src = {`${process.env.REACT_APP_URL}/${data?.profile}`}/>
                                }
                                <p id = {style.nickname}>{data?.nickname}</p>
                                    {
                                        data?.is_photographer &&
                                        <SVG id = {style.badge} width = "18" height = "18" badge/>
                                    }
                                <p id = {style.date}>
                                    {
                                        data === undefined || data?.date === undefined?
                                        <></>:
                                        <>
                                            {`${data?.date.split("-")[0]}.${data?.date.split("-")[1]}.${data?.date.split("-")[2]}`}
                                        </>
                                    }
                                </p>
                                <button id = {style.reComment} name = { getCookie("access-token") !== undefined? "reCommentOpen": "loginAlert" } onClick = {onClickEvent}>
                                    답글쓰기
                                </button>
                            </div>
                            <div id = {style.report}>
                                {
                                    data?.account_index !== Number(getCookie("index-token"))?
                                    <button id = {style.reportBtn} name = {getCookie("access-token") !== undefined? "commentReportBefore": "loginAlert"} onClick = {onClickEvent}>
                                        <SVG width="22" height="17" report/>
                                        <p>신고</p>
                                    </button>:
                                    <button id = {style.deleteBtn} name = "commentDeleteBefore" onClick = {onClickEvent}>
                                        <p>삭제</p>
                                    </button>
                                }
                            </div>
                        </div>
                    }
                    <div id = {style.commentContents}>
                        {
                            data?.is_secret?
                            <>
                                {
                                    data?.is_show?
                                    <>
                                        <SVG width="13" height="16" secret on/>
                                        <p>{data?.contents}</p>
                                    </>:
                                    <>
                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.80904 6.1H3.30904V5.6V4C3.30904 2.09038 4.93733 0.5 6.98295 0.5C9.02857 0.5 10.6569 2.09038 10.6569 4V5.6V6.1H11.1569H11.9916C12.6565 6.1 13.1612 6.61358 13.1612 7.2V14.4C13.1612 14.9864 12.6565 15.5 11.9916 15.5H1.97425C1.30936 15.5 0.804688 14.9864 0.804688 14.4V7.2C0.804688 6.61358 1.30936 6.1 1.97425 6.1H2.80904ZM9.4873 6.1H9.9873V5.6V4C9.9873 2.38082 8.61955 1.1 6.98295 1.1C5.34634 1.1 3.9786 2.38082 3.9786 4V5.6V6.1H4.4786H9.4873ZM11.9933 14.9H12.4934L12.4933 14.3999L12.4916 7.19988L12.4915 6.7H11.9916H1.97425H1.47425V7.2V14.4V14.9H1.97425H6.14817H6.64817V14.4V12.5776V12.2843L6.3921 12.1411C6.03621 11.9422 5.81338 11.5887 5.81338 11.2C5.81338 10.6136 6.31806 10.1 6.98295 10.1C7.64784 10.1 8.15251 10.6136 8.15251 11.2C8.15251 11.5893 7.92982 11.9422 7.5738 12.1411L7.31773 12.2843V12.5776V14.4V14.9H7.81773H11.9933Z" fill="black" stroke="black"/>
                                        </svg>
                                        <p>비밀글 입니다.</p>
                                    </>
                                }
                            </>:
                            <p>{data?.contents}</p>
                        }
                    </div>
                </div>
                {
                    (!props.reComment && reComment?.isOpen && reComment?.index === data?.comment_index && reComment.reIndex === undefined) ||
                    (props.reComment && reComment?.isOpen && reComment?.index === data?.comment_index && reComment.reIndex === data?.reply_index)?
                    <div id = {style.reCommentInput}>
                        <input onChange={onChangeEvent} name = "reCommentInput" placeholder = "답글을 입력해주세요."/>
                        <div id = {style.btnBox}>
                            <button name = "reCommentUpload" onClick = {onClickEvent}>
                                확인
                            </button>
                            <button name = "reCommentCancel" onClick = {onClickEvent}>
                                취소
                            </button>
                        </div>
                    </div>:
                    <></>
                }
                <div id = {style.hiddenBox} style = {{ right: -120 }}>
                    <button id = {style.back} name = "back" onClick = {onClickEvent}>
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25002 13.5688L3.66669 8.98543L8.25002 4.4021" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.3334 19.0687V12.652C18.3334 11.6796 17.947 10.7469 17.2594 10.0593C16.5718 9.37166 15.6391 8.98535 14.6667 8.98535H3.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    {
                        data?.account_index !== Number(getCookie("index-token"))?
                        <button onClick = {onClickEvent} name = "commentReportBefore" data =
                        {{ 
                            "comment_index": data?.comment_index,
                            "feed_index": feed_index,
                            "re_comment_index": data?.reply_index,
                            "account_index": data?.account_index,
                            "contents": data?.contents,
                            "message": props.reComment? "답글을 신고 하시겠습니까?": "댓글을 신고 하시겠습니까?"
                        }}>
                            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.00876 17.7354V15.7354H5.61226L7.59158 9.16035C7.72521 8.72702 7.97141 8.38102 8.3302 8.12235C8.68965 7.86435 9.08652 7.73535 9.5208 7.73535H12.5274C12.9616 7.73535 13.3585 7.86435 13.718 8.12235C14.0767 8.38102 14.323 8.72702 14.4566 9.16035L16.4359 15.7354H18.0394V17.7354H4.00876ZM7.71686 15.7354H14.3313L12.5274 9.73535H9.5208L7.71686 15.7354ZM10.0219 5.73535V0.735352H12.0263V5.73535H10.0219ZM15.9849 8.21035L14.5568 6.78535L18.1146 3.26035L19.5176 4.66035L15.9849 8.21035ZM17.0372 12.7354V10.7354H22.0482V12.7354H17.0372ZM6.06324 8.21035L2.53053 4.66035L3.93359 3.26035L7.49136 6.78535L6.06324 8.21035ZM0 12.7354V10.7354H5.01095V12.7354H0Z" fill="black"/>
                            </svg>
                        </button>:
                        <></>
                    }
                </div>
            </div>
            {props.children}
        </>
    )
}

export default CommentDetail