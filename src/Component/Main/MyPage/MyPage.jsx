import React, { useEffect, useRef, useState } from "react"
import style from "./SCSS/MyPage.module.scss"
import Button from "../../Common/Button"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { alertInput, alertIsOpen } from "../../../Redux/Action/alertAction"
import { myAccountProfileImgUpload } from "../../../Redux/Action/myPageAction"
import { leftBarOpen, leftBarGet, leftBarSelected } from "../../../Redux/Action/leftBarAction"
import { moreViewOpen } from "../../../Redux/Action/topBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import { feedMoreView } from "../../../Redux/Action/feedAction"
import Footer from "../Login/Footer"
import { bottomOpen } from "../../../Redux/Action/mobileStyleAction"

const MyPage = () => {

    const ref = useRef(null)
    const dispatch = useDispatch()
    const data = useSelector(state => state.home.userData)
    
    useEffect(() => {
        dispatch(rightBarOpen())
        dispatch(leftBarGet())
        dispatch(leftBarSelected())
        dispatch(leftBarOpen(true))
        dispatch(moreViewOpen())
        dispatch(feedMoreView())
        dispatch(bottomOpen())
    }, [])

    const onChangeEvent = (e) => {
        if(e.target.files.length > 0){
            dispatch(myAccountProfileImgUpload(e.target.files[0]))
        }
    }

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "imgChange":
                ref.current?.click()
                break
            case "nicknameAlert":
                dispatch(alertIsOpen("nickname", "twoBtn"))
                dispatch(alertInput(data.nickname))
                break
            case "introAlert":
                dispatch(alertIsOpen("accountIntroInput", "inputOneBtn"))
                dispatch(alertInput(data.introduction))
                break
            case "linkEdit":
                dispatch(alertIsOpen("accountLinkInput", "inputOneBtn"))
                dispatch(alertInput(data.link))
                break
            default:
        }
    }

    return(
        <main id = {style.main}>
            {/* 프로필 편집 */}
            <div id = {style.moTitle}>
                <Button name = "backBtn">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
                <h1>프로필 편집</h1>
            </div>
            {
                data&&
                <>
                    <div id = {style.profileEdit}>
                        {/* 상단 */}
                        <div id = {style.title}>
                            <h1>프로필 편집</h1>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        {/* 변경할 타입 */}
                        <div id = {style.profileBox}>
                            <div id = {style.profileImgBox}>
                                <div id = {style.profile}>
                                    {
                                        data.profile === null?
                                        <SVG width = "16" height = "18" account/>:
                                        <img src={`${process.env.REACT_APP_URL}/${data.profile}`}/>
                                    }
                                </div>
                                <div id = {style.nameBox}>
                                    <h2>{data.name}</h2>
                                    <input type = "file" name = "inquiryUpload" style = {{ display: "none" }}
                                            ref = { ref } onChange={onChangeEvent} accept="image/png, image/jpeg, image/webp, image/jpg"/>
                                    <button name = "imgChange" onClick = {onClickEvent}>프로필사진 변경하기</button>
                                </div>
                            </div>
                            <SVG id = {style.line} width = "898" height = "1" line/>
                            <div id = {style.profileTextBox}>
                                <p id = {style.guide}>닉네임</p>
                                <p id = {style.text}>{data.nickname}</p>
                                <button onClick = {onClickEvent} name = "nicknameAlert">수정하기</button>
                            </div>
                            <SVG id = {style.line} width = "898" height = "1" line/>
                            <div id = {style.profileTextBox}>
                                <p id = {style.guide}>자기소개</p>
                                {
                                    data.introduction === null?
                                    <p id = {style.text}></p>:
                                    <p id = {style.text}>{data.introduction}</p>
                                }
                                <button onClick = {onClickEvent} name = "introAlert">수정하기</button>
                            </div>
                            <SVG id = {style.line} width = "898" height = "1" line/>
                            <div id = {style.profileTextBox}>
                                <p id = {style.guide}>링크</p>
                                {
                                    data.link === null || data.link === "" || data.link === undefined?
                                    <p id = {style.text}></p>:
                                    <p id = {style.text}>{data.link}</p>
                                }
                                <button onClick = {onClickEvent} name = "linkEdit">수정하기</button>
                            </div>
                            <SVG id = {style.line} width = "898" height = "1" line/>
                        </div>
                    </div>
                </>
            }
            <Footer id = {style.footer}/>
        </main>
    )
}

export default MyPage