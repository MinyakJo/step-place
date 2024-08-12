import React, { useMemo } from "react"
import style from "./SCSS/Comment.module.scss"
import SVG from "../../SVG/SVG"
import Comment from "./Comment"
import { useSelector, useDispatch } from "react-redux"
import Footer from "../Login/Footer"
import { commentActivityListGet } from "../../../Redux/Action/activityAction"
import scrollLoad from "../../../Hooks/scrollLoad"
import { throttle } from "lodash" 
 
const CommentList = () => {

    const dispatch = useDispatch()
    const commentData = useSelector(state => state.comment?.actCommentList)
    const page = useSelector(state => state.comment.page)

    const onScrollEvent = throttle((e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이
        
        if(scrollLoad(scroll, scrollHeight, mainHeight)){
            dispatch(commentActivityListGet(page + 1))
        }
    }, 300)
    
    return(
        <section id = {style.commentList} onScroll = {onScrollEvent}>
            <div id = {style.commentBox}>
                {
                    commentData&&commentData?.map((e, index) =>
                        <React.Fragment key = {index}>
                            <Comment>
                                {e}
                            </Comment>
                            <SVG id = {style.line} width="837" height="1" line/>
                        </React.Fragment>
                        
                    )
                }
            </div>
            <Footer id = {style.moFooter}/>
        </section>
    )
}

export default CommentList