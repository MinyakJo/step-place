import React, { useEffect } from "react"
import style from "./SCSS/FeedPosting.module.scss"
import ComboBox from "../../Common/ComboBox"
import RadioButton from "../../Common/RadioButton"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { postingDateInput } from "../../../Redux/Action/postingAction"

const FeedPostingTop = () => {

    const dispatch = useDispatch()
    const date = useSelector(state => state.posting?.visit_date)
    const withList = useSelector(state => state.search?.withList)
    const locList = useSelector(state => state.search?.locList)
    const withWhom = useSelector(state => state.posting?.with)
    const loc = useSelector(state => state.posting?.place)

    const onChangeEvent = (e) => {
        switch(e.target.name){
            case "postingDate":
                dispatch(postingDateInput(e.target.value))
                break
            default:
        }
    }

    return(
        <div id = {style.feedPosting}>
            <div id = {style.top}>
                <SVG id = {style.firstLine} width="668" height="1" line/>
                {/* 달력선택 */}
                <div id = {style.date}>
                    <SVG id = {style.icon} width="17" height="17" date/>
                    <p id = {style.guide}>방문날짜</p>
                    <div id = {style.styleBox}>
                        <input id = {style.calendar} onChange={onChangeEvent} name = "postingDate" data-placeholder = "날짜 선택" required aria-required="true" type = "date" value={date}/>
                    </div>
                </div>
                <SVG id = {style.line} width="668" height="1" line/>
                {/* 누구와 함께 */}
                <div id = {style.withWhom}>
                    <SVG id = {style.icon} width="20" height="15" withWhom/>
                    <p id = {style.guide}>누구와 함께</p>
                    <div id = {style.styleBox}>
                        <div id = {style.withBox}>
                            <ComboBox id = {style.comboBox} defaultValue = "인원 선택" posting with value = {withWhom==="" ? "" : withWhom}>
                                {withList}
                            </ComboBox>
                        </div>
                        <SVG id = {style.line} width="668" height="1" line/>
                    </div>
                    <div id = {style.radioBox}>
                        <RadioButton name = "postingWith" value = {withWhom} posting with>
                            {withList}
                        </RadioButton>
                    </div>
                </div>
                <SVG id = {style.line} width="668" height="1" line/>
                <div id = {style.place}>
                    <SVG id = {style.icon} width="18" height="18" place/>
                    <p id = {style.guide}>지역</p>
                    <div id = {style.styleBox}>
                        <div id = {style.locBox}>
                            <ComboBox id = {style.comboBox} defaultValue = "지역 선택" posting loc value = {loc}>
                                {locList}
                            </ComboBox>
                        </div>
                    </div>
                </div>
                <SVG id = {style.line} width="668" height="1" line/>
            </div>
        </div>
    )
}

export default FeedPostingTop