import React from "react"
import style from "./SCSS/FeedPosting.module.scss"
import RadioButton from "../../Common/RadioButton"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { feedUpload, postingHashTag } from "../../../Redux/Action/postingAction"
import { Link } from "react-router-dom"

const FeedPostingBottom = () => {

    const { feed_index } = useParams()
    const dispatch = useDispatch()
    const withData = useSelector(state => state.posting.with)
    const feedData = useSelector(state => state.posting.feed)
    const placeData = useSelector(state => state.posting.place)
    const isPrivate = useSelector(state => state.posting.isPrivate)
    const hashTag = useSelector(state => state.posting.hashTag)
    const imgData1 = useSelector(state => state.posting.img1)
    const imgData2 = useSelector(state => state.posting.img2)
    const imgData3 = useSelector(state => state.posting.img3)
    const dateData = useSelector(state => state.posting.visit_date)

    const onChangeEvent = (e) => {
        dispatch(postingHashTag(e.target.value))
    }
    
    const onClickEvent = () => {
        dispatch(feedUpload({
            feed_index: feed_index,
            together: withData,
            is_open: isPrivate,
            hash_tag: hashTag,
            place: placeData,
            feedData: feedData,
            imgDataList: [ imgData1, imgData2, imgData3 ],
            visit_date: dateData
        }, feed_index !== undefined ? "edit" : ""))
    }

    return(
        <>
            <div id = {style.feedPostingBottom}>
                <SVG id = {style.firstLine} width="668" height="1" line/>
                {/* 해시태그 */}
                <div id = {style.tag}>
                    <SVG id = {style.icon} width="10" height="14" tag/>
                    <p id = {style.guide}>해시태그</p>
                    <input name = "postingHashTag" placeholder = "해시태그를 적어주세요."
                        onChange={onChangeEvent} value = {hashTag} autoCompolete = "off"/>
                </div>
                <SVG id = {style.line} width="668" height="1" line/>
                {/* 공개/비공개 */}
                <div id = {style.private}>
                    <SVG id = {style.icon} width="20" height="12" private/>
                    <p id = {style.guide}>공개/비공개</p>
                    <div id = {style.privateRadio}>
                        <RadioButton name = "private" value = {
                            isPrivate === null? "" :
                            isPrivate? "공개": "비공개"}>
                            {[
                                "공개", "비공개"
                            ]}
                        </RadioButton>
                    </div>
                </div>
                <SVG id = {style.lastLine} width="668" height="1" line/>
                {/* 저장/취소 버튼 */}
                <div id = {style.btnBox}>
                    <button onClick={onClickEvent} id = {style.saveBtn} name = "feedUploadBtn">
                        저장
                    </button>
                    <Link id = {style.cancelBtn} to = "/">
                        취소
                    </Link>
                </div>
            </div>
            <div id = {style.moBtnBox}>
                <button onClick={onClickEvent} id = {style.saveBtn} name = "feedUploadBtn">
                    저장
                </button>
                <Link id = {style.cancelBtn} to = "/">
                    취소
                </Link>
            </div>
        </>
    )
}

export default FeedPostingBottom