import React from "react"
import style from "./SCSS/FeedDetail.module.scss"
import { useSelector, useDispatch } from "react-redux"
import GoogleMaps from "../Home/GoogleMaps"

const FeedDetailMap = () => {
    
    const tag = useSelector(state => state.feed.feedDetail[0]?.hash_tag)
    const feedData = useSelector(state => state.feed.feedDetail[0]?.feed_place)
    const spot = []
    
    for(let i = 0; i < feedData?.length; i++){
        if(feedData[i].spot.lat !== null){
            spot.push(feedData[i].spot)
        }
    }
    return(
        <div id = {style.map}>
            <div id = {style.mapBox}>
                {
                    spot.length !== 0 &&
                    <GoogleMaps direction spotList = {spot}/>
                }
            </div>
            <p id = {style.notice}>
                스텝플레이스의 모든 콘텐츠는 관련 법에 의해 보호 받고 있습니다. 콘텐츠를 무단으로 사용하는 경우 법적 처벌의 대상이 될수 있습니다.
            </p>
            <div id = {style.tagBox}>
                {
                    tag?.split("#").map((e, index) =>
                        e !== "" &&
                        <article key = {index} id = {style.tag}>
                            {`#${e}`}
                        </article>
                    )
                }
            </div>
        </div>
    )
}

export default FeedDetailMap