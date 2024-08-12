import React, { useEffect, useState } from "react"
import style from "./SCSS/NoticePage.module.scss"
import Notice from "./Notice"
import SVG from "../../SVG/SVG"
import { useDispatch, useSelector } from "react-redux"
import { noticeListGet } from "../../../Redux/Action/myPageAction"
import Button from "../../Common/Button"
import { bottomOpen } from "../../../Redux/Action/mobileStyleAction"
import { leftBarSelected, leftBarOpen, leftBarGet } from "../../../Redux/Action/leftBarAction"
import { moreViewSelected, moreViewOpen } from "../../../Redux/Action/topBarAction"
import Footer from "../Login/Footer"
import scrollLoad from "../../../Hooks/scrollLoad"
import { throttle } from "lodash" 

const NoticePage = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.myPage.noticeList)
    const page = useSelector(state => state.myPage.page)

    dispatch(moreViewSelected("notice"))
    dispatch(leftBarSelected("notice"))
    dispatch(leftBarOpen(true))
    dispatch(moreViewOpen())
    dispatch(bottomOpen())

    useEffect(() => {
        dispatch(leftBarGet())
        dispatch(noticeListGet())
    }, [])

    const onScrollEvent = throttle((e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이

        if(scrollLoad(scroll, scrollHeight, mainHeight)){
            dispatch(noticeListGet(page + 1))
        }
    }, 300)

    return(
        <main id = {style.listMain}>
            <div id = {style.title}>
                <Button name = "backBtn">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
                <h1>공지사항</h1>
            </div>
            
            <section id = {style.noticeList} onScroll = {onScrollEvent}>
                <div id = {style.notice}>
                {
                    data&&data.map((element, index) =>
                        <React.Fragment key = {index}>
                            <Notice>
                                {element}
                            </Notice>
                            {
                                index < (data.length - 1) &&
                                <SVG id = {style.line} width = "837" height = "1" line/>
                            }
                        </React.Fragment>
                    )
                }
                </div>
                 <Footer id = {style.moFooter}/>
            </section>
            <Footer id = {style.footer}/>
        </main>
    )
}

export default NoticePage