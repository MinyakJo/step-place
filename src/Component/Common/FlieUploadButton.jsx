import React, { useRef } from "react"
import style from "../Main/MyPage/SCSS/InquiryPage.module.scss"
import SVG from "../SVG/SVG"
import { useDispatch, useSelector } from "react-redux"
import { inquiryAdd, inquiryDelete } from "../../Redux/Action/inquiryAction"
import { alertIsOpen } from "../../Redux/Action/alertAction"

const FileUploadButton = (props) => {

    const ref = useRef(null)
    const maxSize = props.maxSize
    const dispatch = useDispatch()
    const file = useSelector(state => state.inquiry?.file)

    const onClickEvent = (event) => {
        if(file?.data.length >= 5){
            dispatch(alertIsOpen("message", "oneBtn", { message: "더 이상 첨부파일을 등록할 수 없습니다."}))
        }else{
            if(event.target.name === "cancel"){
                dispatch(inquiryDelete(event.target.value))
            }else{
                ref.current?.click()
            }
        }
    }

    const onChangeEvent = (event) => {
        if(event.target.files.length > 0){
            if((file?.size + event.target.files[0].size) >= maxSize){
                dispatch(alertIsOpen("message", "oneBtn", { message: "더 이상 첨부파일을 등록할 수 없습니다."}))
            }else{
                dispatch(inquiryAdd(event.target.files[0]))
            }
        }
    }

    return(
        <>
            <div id = {style.imgUploadBox}>
                <div id = {style.clip} onClick = {onClickEvent} style = {{ cursor: "pointer" }}>
                    <SVG width="16" height="18" imgClip/>
                </div>
                <input type = "file" name = "inquiryUpload" style = {{ display: "none" }}
                    ref = { ref } onChange={onChangeEvent} accept="image/png, image/jpeg, image/webp, image/jpg"/>
                <div id = {style.file}>
                    {
                        file?.data.length === 0?
                        <p id = {style.nullText}>첨부파일은 최대5개, 30MB까지 가능 합니다.</p>:
                        <>
                            {
                                file&&file.data.map((element, index) => 
                                    <div id = {style.nameBox} key={index}>
                                        <p>
                                            {element.name}
                                        </p>
                                        <button name="cancel" value = {index} onClick={onClickEvent}>x</button>
                                    </div>
                                )
                            }
                        </>
                    }
                    {
                        file?.data.length === 0?
                        <></>:
                        <>
                            <p>크기: {Math.floor(file.size/1024/1024)}MB</p>
                            <p>개수: {file?.data.length}개</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default FileUploadButton