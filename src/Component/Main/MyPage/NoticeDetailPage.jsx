import React, { useEffect, useState } from "react"
import style from "./SCSS/NoticePage.module.scss"
import SVG from "../../SVG/SVG"
import Button from "../../Common/Button"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { noticeGet } from "../../../Redux/Action/myPageAction"
import { Link } from "react-router-dom"
import { leftBarGet, leftBarOpen } from "../../../Redux/Action/leftBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import Footer from "../Login/Footer"

const NoticeDetailPage = () => {

    const { notice_index } = useParams()
    const dispatch = useDispatch()

    const data = useSelector(state => state.myPage.notice)

    useEffect(() => {
        dispatch(leftBarGet())
        dispatch(rightBarOpen())
        dispatch(leftBarOpen(true))
        dispatch(noticeGet(notice_index))
    }, [])

    return(
        <main id = {style.main}>
                <div id = {style.title}>
                    <Button name = "backBtn">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    <h1>공지사항</h1>
                </div>
                <div id = {style.detailMain}>
                    <div id = {style.detailNotice}>
                        <div id = {style.noticeTitleBox}>
                            <div id = {style.icon}>
                                <SVG width = "60" height = "60" noticeBell/>
                            </div>
                            <div id = {style.textBox}>
                                <div id = {style.titleBox}>
                                    {
                                        data.is_top_fixed &&
                                        <h2 id = {style.fixText} style = {{ minWidth: 0, marginRight: 4 }}>[고정]</h2>
                                    }
                                    <h2>{data.title}</h2>
                                </div>
                                <div id = {style.dateBox}>
                                    <p>{data.date.substring(2).replace("-", "년 ").replace("-", "월 ")}일</p>
                                </div>
                            </div>
                        </div>
                        <section id = {style.noticeContentsBox}>
                            <div id = {style.imgBox}>
                                {
                                    data?.attachment !== null && data?.attachment !== ""?
                                    <img src={`${process.env.REACT_APP_URL}/${data?.attachment}`}/>:
                                    <></>
                                }
                            </div>
                            <p>{data.contents}</p>
                        </section>
                        <div id = {style.btnBox}>
                            <Link id = {style.backBtn} to = "/notice">목록가기</Link>
                        </div>
                    </div>
                    <Footer id = {style.detailFooter}/>
                </div>
        </main>
    )
}

export default NoticeDetailPage