import React from "react"
import style from "./SCSS/NoticePage.module.scss"
import SVG from "../../SVG/SVG"
import { Link } from "react-router-dom"

const Notice = (props) => {

    const data = props.children

    return(
        <article id = {style.noticeBox}>
            <Link id = {style.notice} to = {`/noticeDetail/${data.notice_index}`}>
                <div id = {style.icon}>
                    <SVG id = {style.icon} width = "60" height = "60" noticeBell/>
                </div>
                <div id = {style.textBox}>
                    <div id = {style.titleBox}>
                        {
                            data.is_top_fixed &&
                            <h1 id = {style.fixText}>[고정]</h1>
                        }
                        <h1 id = {style.title}>{data.title}</h1>
                    </div>
                    <div id = {style.dateBox}>
                        <p id = {style.date}>{data.date.substring(2).replace("-", "년 ").replace("-", "월 ")}일</p>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default Notice