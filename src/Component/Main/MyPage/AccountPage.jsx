import React, { useEffect, useState } from "react"
import style from "./SCSS/AccountPage.module.scss"
import Button from "../../Common/Button"
import SVG from "../../SVG/SVG"
import OnOffButton from "../../Common/OnOffButton"
import { useSelector, useDispatch } from "react-redux"
import { myAccountGet } from "../../../Redux/Action/myPageAction"
import { bottomOpen } from "../../../Redux/Action/mobileStyleAction"
import { leftBarSelected, leftBarOpen, leftBarGet } from "../../../Redux/Action/leftBarAction"
import { moreViewOpen, topBarSelected } from "../../../Redux/Action/topBarAction"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import Footer from "../Login/Footer"

const AccountPage = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.myPage.account)

    useEffect(() => {
        dispatch(myAccountGet())
        dispatch(leftBarGet())
        dispatch(topBarSelected("account"))
        dispatch(leftBarSelected("account"))
        dispatch(leftBarOpen(true))
        dispatch(moreViewOpen())
        dispatch(rightBarOpen())
        dispatch(bottomOpen())
    }, [data.address])
    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "accountAddrEditAlert":
                dispatch(alertIsOpen("accountAddrInput", "twoBtn", { message: "3개월 후에 주소를 변경 하실 수 있습니다\n주소를 변경 하시겠습니까?", data: data.address }))
                break
            case "pwChangeAlert":
                dispatch(alertIsOpen("accountPwInput", "inputOneBtn"))
                break
            case "cancelMem":
                dispatch(alertIsOpen("accountCancelMem", "twoBtn"))
                break
            
        }
    }
    
    return(
        <main id = {style.main}>
            {/* 내 계정 */}
            <div id = {style.title}>
                <Button name = "backBtn">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
                <h1>내 계정</h1>
            </div>
            {
                data&&
                <div id = {style.profileInfo}>
                    {/* 상단 */}
                    {/* 내 정보 */}
                    <div id = {style.profileBox}>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        <div id = {style.profileTextBox}>
                            <p id = {style.guide}>이름</p>
                            <div id = {style.info}>
                                <p id = {style.text}>{data.name}</p>
                                <div id = {style.empty}></div>
                            </div>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        <div id = {style.profileTextBox}>
                            <p id = {style.guide}>이메일</p>
                            <div id = {style.info}>
                                <p id = {style.text}>{data.email}</p>
                                <div id = {style.empty}></div>
                            </div>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        <div id = {style.profileTextBox}>
                            <p id = {style.guide}>생년월일</p>
                            <div id = {style.info}>
                                <p id = {style.text}>{data.birth_date}</p>
                                <div id = {style.empty}></div>
                            </div>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        <div id = {style.profileTextBox}>
                            <p id = {style.guide}>주소</p>
                            <div id = {style.info}>
                                <div id = {style.text}>
                                    <p>stepplace.co.kr/</p>
                                    <p>{data.address}</p>
                                </div>
                                <button onClick={onClickEvent} id = {style.smallEdit} name = "accountAddrEditAlert">수정</button>
                                <button onClick={onClickEvent} id = {style.bigEdit} name = "accountAddrEditAlert">수정하기</button>
                            </div>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                    </div>
                    {/* 비밀번호 변경, 계정 비활성화, 회원탈퇴 */}
                    <div id = {style.privateBox}>
                        <div id = {style.private}>
                            <button onClick={onClickEvent} name = "pwChangeAlert">비밀번호 변경</button>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        <div id = {style.private}>
                            <p>계정 비활성화</p>
                            <OnOffButton id = {style.onOff}/>
                        </div>
                        <SVG id = {style.line} width = "898" height = "1" line/>
                        <div id = {style.private}>
                            <button name = "cancelMem" onClick={onClickEvent}>회원 탈퇴</button>
                        </div>
                    </div>
                </div>
            }
            <Footer id = {style.footer}/>
        </main>
    )
}

export default AccountPage