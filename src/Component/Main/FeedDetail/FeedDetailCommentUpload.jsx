import React, { useEffect } from "react"
import style from "./SCSS/FeedDetail.module.scss"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { commentInput, commentIsPrivate, commentPost } from "../../../Redux/Action/commentAction"
import { getCookie } from "../../../Hooks/cookie"
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const FeedDetailCommentUpload = () => {

    const dispatch = useDispatch()
    const { feed_index } = useParams()
    const { account_index } = useParams()
    const userData = useSelector(state => state.home.userData)
    const profile = useSelector(state => state.feed.feedDetail[0]?.profile)
    const comment = useSelector(state => state.comment.commentInput)
    const isPrivate = useSelector(state => state.comment.isPrivate)

    const onChangeEvent = (e) => {
        dispatch(commentInput(e.target.value))
    }

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "upload":
                dispatch(commentPost({
                    "feed_index": feed_index,
                    "account_index": account_index,
                    "contents": comment,
                    "is_secret": isPrivate
                }))
                break
            case "private":
                dispatch(commentIsPrivate(!isPrivate))
                break
            case "commentInput":
                if(getCookie("access-token") === undefined){
                    dispatch(alertIsOpen("login", "oneBtn"))
                }
                break
        }
    }

    useEffect(() => {
        dispatch(commentInput(""))
    }, [])

    return(
        <div id = {style.commentInputBox}>
            {/* 모바일용 프로필 */}
            {
                userData?.profile !== null && getCookie("access-token") !== undefined?
                <div id = {style.inputProfile}>
                    <img src = {`${process.env.REACT_APP_URL}/${userData.profile}`}/>
                </div>:
                <div id = {style.inputProfile}>
                    <SVG width = "16" height = "18" account/>
                </div>
            }
            {/* 입력칸 */}
            <textarea onChange={onChangeEvent} onClick = {onClickEvent} name = "commentInput" value = {comment} id = {style.commentInput} placeholder = "공감과 응원의 댓글을 달아주세요."/>
            <input onChange={onChangeEvent} onClick = {onClickEvent} name = "commentInput" value = {comment} id = {style.commentInputMo} type = "text" placeholder = "공감과 응원의 댓글을 달아주세요." autoComplete="off"/>
            {/* 확인 비밀댓글 버튼 */}
            <div id = {style.uploadType}>
                <div id = {style.uploadSecret}>
                    <button name = "private" onClick={onClickEvent} id = {style.secretBtn}>
                        {
                            isPrivate?
                            <SVG width="13" height="16" secret on/>:
                            <SVG width="13" height="16" secret/>
                        }
                        <p style = {{ color: isPrivate? style.mainColor: style.greyColor }}>비밀댓글</p>
                    </button>
                </div>
                <div id = {style.upload}>
                    <button name = "upload" onClick = {onClickEvent} id = {style.uploadBtn}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeedDetailCommentUpload