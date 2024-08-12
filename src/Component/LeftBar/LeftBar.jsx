import React, { useEffect } from "react"
import style from "./SCSS/LeftBar.module.scss"
import LeftBarButton from "./LeftBarButton"
import LeftBarProfile from "./LeftBarProfile"
import { useSelector, useDispatch } from "react-redux"
import { getCookie } from "../../Hooks/cookie"
import { moreViewOpen } from "../../Redux/Action/topBarAction"
import { rightBarOpen } from "../../Redux/Action/alarmAction"

const LeftBar = () => {

    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.left.left.isOpen)
    const data = useSelector(state => state.left.leftBarData)
    const isWriter = data.is_photographer

    let left = {
        left: "-290px"
    }
    
    if(isOpen){
        left.left = "0"
    }else{
        left.left = "-290px"
    }

    return(
        <aside id = {style.leftBar} style = {left}>
            {/* 위쪽 프로필 */}
            {
                data&&
                <>
                    <LeftBarProfile/>
                    {/* 중간 메뉴 */}
                    {
                        data.account_index === Number(getCookie("index-token")) ?
                        <div id = {style.menu}>
                            <LeftBarButton myFeed account_index = {data.account_index}/>
                            <LeftBarButton activity/>
                            {
                                !isWriter &&
                                <LeftBarButton writerApp/>
                            }
                            <LeftBarButton notice/>
                            <LeftBarButton inquiry/>
                            <LeftBarButton account/>
                        </div>:
                        <div id = {style.menu}>
                            <LeftBarButton feed account_index = {data.account_index}/>
                        </div>
                    }
                    {/* 로그아웃 */}
                    {/* <div id = {style.logout}>
                        <LeftBarButton logout/>
                    </div> */}
                </>
            }
        </aside>
    )
}

export default LeftBar