import React, { useState } from "react"
import style from "./SCSS/Feed.module.scss"
import SVG from "../../SVG/SVG"
import { Link } from "react-router-dom"

const FeedImgBox = (props) => {

    const data = props.children
    const [ hover, setHover ] = useState(false)
    
    const onMouseEnterEvent = () => {
        setHover(true)
    }
    const onMouseLeaveEvent = () => {
        setHover(false)
    }

    return (
        <div id = {style.infoBox}>
            {/* 사진 */}
            <Link to = {`/feedDetail/${props.account_index}/${props.feed_index}`} link id = {style.imgBox}>
                <div id = {style.img}>
                    {
                        props?.img[0] !== undefined?
                        <img src = {`${process.env.REACT_APP_URL}/${props?.img[0]?.file_path}`} onMouseEnter = {onMouseEnterEvent}/>:
                        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="240" height="240" rx="10" fill="#F0FBFF"/>
                            <g opacity="0.3">
                                <path d="M137.855 109.506L120.008 123.8V96.582C124.079 96.582 128.144 97.8784 131.567 100.551C134.541 102.91 136.73 106.02 137.855 109.506Z" fill="#4ED0F9"/>
                                <path d="M138.782 115.357V144.866H120.008V123.8L137.855 109.506C138.475 111.354 138.782 113.338 138.782 115.357Z" fill="#4ED0F9"/>
                                <path d="M120.007 96.582V144.86H101.238V115.351C101.238 109.54 103.871 104.138 108.454 100.545C111.871 97.8841 115.942 96.582 120.007 96.582Z" fill="#4ED0F9"/>
                                <path d="M120.008 96.5815C124.079 96.5815 128.145 97.8778 131.567 100.55C134.541 102.91 136.73 106.02 137.861 109.511C138.476 111.359 138.783 113.337 138.783 115.356V144.865H120.008H101.239V115.356C101.239 109.545 103.872 104.144 108.455 100.55C111.872 97.8835 115.943 96.5815 120.008 96.5815ZM120.008 90.2305C114.345 90.2305 108.995 92.067 104.543 95.541C98.4023 100.351 94.8828 107.572 94.8828 115.356V144.865V151.216H101.234H120.003H138.771H145.122V144.865V115.356C145.122 112.627 144.701 109.988 143.871 107.498C142.37 102.864 139.471 98.7193 135.502 95.5694C131.022 92.067 125.671 90.2305 120.008 90.2305Z" fill="#4ED0F9"/>
                                <path d="M134.099 125.596C134.099 127.211 132.791 128.524 131.17 128.524C129.556 128.524 128.242 127.217 128.242 125.596C128.242 123.981 129.55 122.668 131.17 122.668C132.791 122.668 134.099 123.981 134.099 125.596Z" fill="white"/>
                            </g>
                        </svg>

                    }
                </div>
                {
                    data.is_ad&&
                    <SVG width = "37" height = "25" id = {style.ad} ad/>
                }
                {
                    props.index === 0 &&
                    <div id = {style.hoverIconBox} style = {{display: hover ? "flex" : "none"}} onMouseLeave = {onMouseLeaveEvent}>
                        <div id = {style.hoverIcon}>
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.95 1C3.21625 1 1 3.21625 1 5.95C1 10.9 6.85 15.4 10 16.4467C13.15 15.4 19 10.9 19 5.95C19 3.21625 16.7837 1 14.05 1C12.376 1 10.8955 1.83115 10 3.1033C9.54356 2.45314 8.93717 1.92254 8.23219 1.55642C7.52721 1.1903 6.74438 0.99944 5.95 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {props.thanks_cnt}
                        </div>
                        <div id = {style.hoverIcon}>
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33907 15.6149L2 16.0529L3.35393 13.2819C2.64952 12.0752 2.2653 10.7612 2.2653 9.27733C2.2653 4.70067 6.06177 1 10.7365 1C15.4112 1 19.2077 4.7096 19.2077 9.27733C19.2077 13.8451 15.4112 17.5547 10.7365 17.5547C8.669 17.5547 6.81192 16.8217 5.33907 15.6149Z" stroke="white" strokeWidth="1.65547" strokeMiterlimit="10"/>
                            </svg>
                            {props.comment_cnt}
                        </div>
                    </div>
                }
            </Link>
            {/* 지역이름 */}
            <div id = {style.spotText} style = {{ visibility: data?.title !== ""? "visible": "hidden" }}>
                <Link to = {`/feedDetail/${props.account_index}/${props.feed_index}`} name = "feedDetail" link>
                    <div id = {style.spotMark}>
                        <SVG width="16" height="19" spotMark/>
                    </div>
                    <p>{data.title}</p>
                </Link>
            </div>
        </div>
    )
}

export default FeedImgBox