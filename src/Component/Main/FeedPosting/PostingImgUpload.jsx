import React, { useRef } from "react"
import style from "./SCSS/FeedPosting.module.scss"
import SVG from "../../SVG/SVG"
import { useDispatch, useSelector } from "react-redux"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import { postingImgChange, postingImgDelete, postingImgInput } from "../../../Redux/Action/postingAction"

const PostingImgUpload = (props) => {

    const ref = useRef(null)
    const dispatch = useDispatch()
    const index = props.index
    let file = null
    const file1 = useSelector(state => state.posting.img1)
    const file2 = useSelector(state => state.posting.img2)
    const file3 = useSelector(state => state.posting.img3)
    const preview = useSelector(state => state.posting.preview[index])
    
    if(index === 0){
        file = file1
    }else if(index === 1){
        file = file2
    }else{
        file = file3
    }

    let startIndex
    
    const onClickEvent = (event, imgIndex) => {
        if(event.currentTarget.name === "cancel"){
            dispatch(postingImgDelete(index, imgIndex))
        }
        else if(file?.length >= 8){
            dispatch(alertIsOpen("message", "oneBtn", { message: "더 이상 이미지를 등록할 수 없습니다."}))
        }else{
            ref.current?.click()
        }
    }

    const onChangeEvent = (event) => {
        if(event.target.files.length > 0){
            dispatch(postingImgInput(index, event.target.files, preview.length))
        }
    }

    const onDragStartEvnet = (event, dragStartIndex) => {
        startIndex = dragStartIndex
    }

    const onDropEvent = (event, dropIndex) => {
        dispatch(postingImgChange(index, startIndex, dropIndex))
    }

    return(
            <div id = {style.upload}>
                <div id = {style.guideBox}>
                    <SVG id = {style.icon} width="20" height="20" imgUpload/>
                    {
                        file?.length === 0 &&
                        <div id = {style.uploadList}>
                            <p>선택된 파일 없음</p>
                        </div>
                    }
                </div>
                <div id = {style.imgUploadBtn} style = {{ cursor: "pointer" }}>
                    {
                        file?.length !== 0?
                        <>
                            {
                                file&&file.map((e, i) => 
                                    <div 
                                        id = {style.previewBox} key = {i} 
                                        onDragStart = {(event) => onDragStartEvnet(event, i)}
                                        onDragOver = {(e) => { e.preventDefault() }}
                                        onDrop = {(event) => onDropEvent(event, i)}
                                    >
                                        <button name = "cancel" onClick = {(event) => onClickEvent(event, i)}>
                                            <svg id = {style.cancelBtn} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.65625 2.65625L2.65613 6.65637" stroke="black"/>
                                                <path d="M6.65625 6.65625L2.65613 2.65613" stroke="black"/>
                                            </svg>
                                        </button>
                                        {
                                            i === 0 &&
                                            <div id = {style.firstImg}>
                                                대표<br/>이미지
                                            </div>
                                        }
                                        <img src={preview[i]}/>
                                    </div>
                                )
                            }
                        </>:
                        <></>
                    }
                    <div id = {style.fileAddBtn} onClick = {(event) => onClickEvent(event, null)}>
                        <svg id = {style.big} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="13" x2="25" y2="13" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round"/>
                            <line x1="13" y1="1" x2="13" y2="25" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <svg id = {style.small} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1.75366" y1="7.86954" x2="14.8261" y2="7.86954" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round"/>
                            <line x1="8.71021" y1="1.7536" x2="8.7102" y2="14.8261" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>

                </div>
                <input type = "file" name = "postingImgUpload" style = {{ display: "none" }}
                    ref = { ref } onChange={onChangeEvent} multiple accept="image/png, image/jpeg, image/webp, image/jpg"/>
        </div>
    )
}

export default PostingImgUpload