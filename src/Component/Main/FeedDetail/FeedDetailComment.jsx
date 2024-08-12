import React from "react"
import style from "./SCSS/FeedDetail.module.scss"
import FeedDetailCommentIcon from "./FeedDetailCommentIcon"
import FeedDetailCommentUpload from "./FeedDetailCommentUpload"
import CommentDetail from "./CommentDetail"
import SVG from "../../SVG/SVG"
import { useSelector } from "react-redux" 

const FeedDetailComment = () => {

    const data = useSelector(state => state.feed?.feedDetail[0])
    const comment = useSelector(state => state.comment?.commentList)
    const reComment = useSelector(state => state.comment?.reCommentList)
    const thanks = useSelector(state => state.feed?.feedDetail[0]?.thanks_cnt)
    const comments = useSelector(state => state.feed?.feedDetail[0]?.comment_cnt)
    const views = useSelector(state => state.feed?.feedDetail[0]?.views)

    return(
        <div id = {style.commentBox}>
            {/* 고마워요, 조회수, 댓글수 모음 */}
            <div id = {style.iconsBox}>
                <div id = {style.leftIcon}>
                    <FeedDetailCommentIcon thanks>{thanks}</FeedDetailCommentIcon>
                    <FeedDetailCommentIcon comment>{comments}</FeedDetailCommentIcon>
                    <FeedDetailCommentIcon view>{views}</FeedDetailCommentIcon>
                </div>
                <div id = {style.rightIcon}>
                    <FeedDetailCommentIcon scrap/>
                </div>
            </div>
            {/* 댓글 입력창 */}
            <FeedDetailCommentUpload/> 
            {/* 댓글창 */}
            <div id = {style.commentDetailBox}>
                {
                    comment&&comment.map((e, index) =>
                        <CommentDetail key = {index} data = {e} isPrivate = {e.is_comment_secret} feedWriter = {data?.account_index}>
                            {
                                reComment&&reComment.map((el, reIndex) => 
                                    el.comment_index === e.comment_index &&
                                    <CommentDetail key = {reIndex} data = {el} isPrivate = {e.is_comment_secret} reComment/>
                                )
                            }
                        </CommentDetail>
                    )
                }
            </div>
            <SVG id = {style.line} width = "960" height = "1" line/>
        </div>
    )
}

export default FeedDetailComment