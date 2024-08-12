import React, { useEffect, useState } from "react"
import style from "./SCSS/RightBar.module.scss"
import RightBarTop from "./RightBarTop"
import RightBarAlert from "./RightBarAlert"
import { useSelector, useDispatch } from "react-redux"
import { alarmGet } from "../../Redux/Action/alarmAction"

const RightBar = () => {

    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.alarm.isOpen)
    const dayList = useSelector(state => state.alarm?.dayList)
    const weekList = useSelector(state => state.alarm?.weekList)
    const monthList = useSelector(state => state.alarm?.monthList)
    const restList = useSelector(state => state.alarm?.restList)
    const page = useSelector(state => state.alarm.page)

    const onScrollEvent = (e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이

        if(Math.ceil(scroll) === mainHeight && scrollHeight !== mainHeight){
           dispatch(alarmGet(page + 1))
        }
    }
    
    return(
        <aside id = {style.rightBar} onScroll = {onScrollEvent}
        style = {{
            right: isOpen? 0 : "-100%"
        }}>
            <RightBarTop/>
            <div id = {style.alarmBox}>
                {
                    dayList&&dayList.map((e, index) => 
                        <RightBarAlert today key = {index} data = {e} index = {index}/>
                    )
                }
                {
                    weekList&&weekList.map((e, index) => 
                        <RightBarAlert week key = {index} data = {e} index = {index}/>
                    )
                }
                {
                    monthList&&monthList.map((e, index) => 
                        <RightBarAlert month key = {index} data = {e} index = {index}/>
                    )
                }
                {
                    restList&&restList.map((e, index) => 
                        <RightBarAlert rest key = {index} data = {e} index = {index}/>
                    )
                }
            </div>
        </aside>
    )
}

export default RightBar