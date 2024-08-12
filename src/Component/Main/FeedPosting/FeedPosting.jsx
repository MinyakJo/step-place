import React, { useEffect, useState } from "react"
import style from "./SCSS/FeedPosting.module.scss"
import Button from "../../Common/Button"
import RadioButton from "../../Common/RadioButton"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import PostingImgUpload from "./PostingImgUpload"
import ComboBox from "../../Common/ComboBox"
import { postingContentsInput, postingTitleInput, postingTransTimeInput, postingFeedAdd } from "../../../Redux/Action/postingAction"
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const FeedPosting = (props) => {

    const dispatch = useDispatch()
    let index = 0

    if(props.second){
        index = 1
    }else if(props.third){
        index = 2
    }

    const transList = useSelector(state => state.search.transList)
    const spot = useSelector(state => state.posting?.feed[index]?.spot)
    const spotName = spot?.name
    const title = useSelector(state => state?.posting?.feed[index]?.title)
    const contents = useSelector(state => state?.posting?.feed[index]?.contents)
    const trans = useSelector(state => state?.posting?.feed[index]?.transportation)
    const time = useSelector(state => state?.posting?.feed[index]?.travel_time)
    const is_ad = useSelector(state => state?.posting?.feed[index]?.is_ad)
    const editCnt = useSelector(state => state.posting.editCnt)
    
    const onChangeEvent = (event) => {
        switch(event.target.name){
            case `postingTitle${index}`:
                dispatch(postingTitleInput(index, event.target.value))
                break
            case `postingContents${index}`:
                dispatch(postingContentsInput(index, event.target.value))
                break
            case `postingTransTime${index}`:
                dispatch(postingTransTimeInput(index, event.target.value))
                break
        }
    }

    const onClickEvent = (e) => {
        switch(e.target.name){
            case `postingSpot${index}`:
                dispatch(alertIsOpen(`postingMap${index + 1}`, "map", spot))
                break
            case "feedDeleteButton":
                dispatch(postingFeedAdd())
                break
        }
    }

    return(
        <div id = {style.feedPosting}>
            <div id = {style.posting}>
                {/* 제목과 내용 */}
                <div id = {style.contents}>
                    {
                        props.third?
                        <div id = {style.titleBox}>
                            <input onChange={onChangeEvent} id = {style.title} name = {`postingTitle${index}`} type = "text" placeholder = "장소명을 입력해 주세요." value={title}  autoComplete="off"/>
                            {
                                editCnt !== 3 &&
                                <button onClick={onClickEvent} id = {style.feedDeleteButton} name = "feedDeleteButton">
                                    <SVG width="9" height="1" line/>
                                    장소삭제
                                </button>
                            }
                        </div>:
                        <div id = {style.titleBox}>
                            <input onChange={onChangeEvent} id = {style.title} name = {`postingTitle${index}`} type = "text" 
                            placeholder = "장소명을 입력해 주세요." value={title} autoComplete="off"/>
                        </div>
                    }
                    <SVG id = {style.line} width="668" height="1" line/>
                    <textarea onChange={onChangeEvent} name = {`postingContents${index}`} placeholder = "내용을 입력해 주세요." value={contents} autoComplete="off"/>
                </div>
                {/* 이미지올리는 버튼 */}
                {!props.edit && <PostingImgUpload index = {index}/>}

                <SVG id = {style.line} width="668" height="1" line/>
                {/* 장소 선택 */}
                <div id = {style.spot}>
                    <div id = {style.guideBox}>
                        <SVG id = {style.icon} width="18" height="22" spotMark posting/>
                        <p id = {style.guide}>장소</p>
                    </div>
                    {
                        spotName !== undefined && spotName !== null && spotName !== ""?
                        <button onClick={onClickEvent} id = {style.selectSpot} name = {`postingSpot${index}`} style = {{ color: style.mainColor, border: `1px solid ${style.mainColor}` }}>
                            {spotName}
                        </button>:
                        <button onClick={onClickEvent} name = {`postingSpot${index}`}>
                            장소를 선택해 주세요.
                        </button>
                    }
                </div>
                <SVG id = {style.line} width="668" height="1" line/>
                {
                    //두번째 이상 피드부터 적용되는 이동수단, 이동시간
                    (props.second || props.third)&&
                    <>
                        {/* 이동수단 */}
                        <div id = {style.trans}>
                            <SVG id = {style.icon} width="12" height="25" trans/>
                            <p id = {style.guide}>
                                이동수단
                            </p>
                            <div id = {style.styleBox}>
                                <div id = {style.transComboBox}>
                                    <ComboBox id = {style.comboBox} defaultValue = "이동수단 선택" index = {index} posting trans value = {trans} direct>
                                        {transList}
                                    </ComboBox>
                                </div>
                            </div>
                            <div id = {style.radioBox}>
                                <RadioButton name = {`trans${index}`} direct index = {index} value = {trans} posting trans>
                                    {transList}
                                </RadioButton>
                            </div>
                        </div>
                        <SVG id = {style.line} width="668" height="1" line/>
                        {/* 이동시간 */}
                        <div id = {style.transTime}>
                            <div id = {style.guideBox}>
                                <SVG id = {style.icon} width="21" height="21" transTime/>
                                <p id = {style.guide}>
                                    이동시간
                                </p>
                            </div>
                            <div id = {style.inputBox}>
                                <input onChange={onChangeEvent} name = {`postingTransTime${index}`} placeholder = "이동시간을 입력해 주세요." value = {time} autoComplete="off"/>
                            </div>
                        </div>
                        <SVG id = {style.line} width="668" height="1" line/>
                    </>
                }
                {/* 광고 여부 */}
                <div id = {style.ad}>
                    <div id = {style.guideBox}>
                        <SVG id = {style.icon} width="23" height="18" ad posting/>
                        <p id = {style.guide}>
                            광고 여부
                        </p>
                    </div>
                    <div id = {style.adRadio}>
                        <RadioButton name = {`ad${index}`} index = {index} value = {is_ad === null? "" : is_ad? "광고": "비광고" }>
                            {[
                                "광고", "비광고"
                            ]}
                        </RadioButton>
                    </div>
                </div>
                <SVG id = {style.lastLine} width="668" height="1" line/>
            </div>
        </div>
    )
}

export default FeedPosting