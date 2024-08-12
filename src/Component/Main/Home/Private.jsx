import React from "react"
import style from "./SCSS/Private.module.scss"
import MoUserInfo from "../../Mobile/MoUserInfo"
import MoTopBar from "../../Mobile/MoTopBar"

const Private = (props) => {
    console.log(props)
    let width = "100%"
    let left = 0
    if(props.is_disabled || (!props.is_disabled && !props.is_myFollowing && props.is_open === undefined) && !props.undefined){
        width = "calc(100% - 290px)"
        left = 290
    }

    return(
        <main id = {style.privateMain} style = {{ 
            width: width, left: left
        }}>
            <MoTopBar/>
            <MoUserInfo private/>
            <div id = {style.guideBox}>
                <svg id = {style.alert} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="41" height="41" fill="white"/>
                    <path d="M17.5798 6.59781L3.11021 30.7536C2.81188 31.2703 2.65403 31.856 2.65236 32.4526C2.65069 33.0492 2.80526 33.6358 3.10069 34.1541C3.39612 34.6724 3.82212 35.1043 4.33629 35.4069C4.85047 35.7094 5.43491 35.8721 6.03146 35.8786H34.9706C35.5672 35.8721 36.1516 35.7094 36.6658 35.4069C37.18 35.1043 37.606 34.6724 37.9014 34.1541C38.1968 33.6358 38.3514 33.0492 38.3497 32.4526C38.3481 31.856 38.1902 31.2703 37.8919 30.7536L23.4223 6.59781C23.1177 6.09574 22.6889 5.68064 22.1773 5.39256C21.6656 5.10447 21.0883 4.95312 20.501 4.95312C19.9138 4.95313 19.3365 5.10447 18.8248 5.39256C18.3131 5.68064 17.8843 6.09574 17.5798 6.59781Z" fill="#E8E8E8"/>
                    <path d="M20.5 15.375V22.2083" stroke="#B0ABB5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.5 29.0391H20.5175" stroke="#B0ABB5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg id = {style.moAlert} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5788 6.59418L3.10923 30.75C2.8109 31.2667 2.65305 31.8524 2.65138 32.449C2.64971 33.0456 2.80428 33.6322 3.09971 34.1505C3.39514 34.6688 3.82114 35.1007 4.33532 35.4033C4.8495 35.7058 5.43393 35.8685 6.03048 35.875H34.9696C35.5662 35.8685 36.1506 35.7058 36.6648 35.4033C37.179 35.1007 37.605 34.6688 37.9004 34.1505C38.1959 33.6322 38.3504 33.0456 38.3488 32.449C38.3471 31.8524 38.1892 31.2667 37.8909 30.75L23.4213 6.59418C23.1168 6.09211 22.688 5.67701 22.1763 5.38892C21.6646 5.10084 21.0873 4.94949 20.5001 4.94949C19.9129 4.94949 19.3355 5.10084 18.8239 5.38892C18.3122 5.67701 17.8834 6.09211 17.5788 6.59418V6.59418Z" fill="#E8E8E8"/>
                    <path d="M20.5 15.375V22.2083" stroke="#B0ABB5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.5 29.0417H20.5175" stroke="#B0ABB5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


                <h1>
                    {
                        props.is_disabled?
                        "비활성화된 계정입니다.":
                        props.is_open === false?
                        "비공개된 피드입니다.":
                        "존재하지 않는 페이지 입니다."
                    }
                </h1>
            </div>
        </main>
    )
}

export default Private