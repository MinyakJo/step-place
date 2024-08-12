import React from "react"
import FeedImgBox from "./FeedImgBox"
import style from "./SCSS/Feed.module.scss"
import SVG from "../../SVG/SVG"

const Feed = (props) => {

    const data = props.children
    const feed_place = data.feed_place
    
    return(
        // 피드
        <article id = {style.feedBox}>
            {/* 피드 상단 방문날짜와 방문자 */}
            <div id = {style.feedText}>
                {
                    !data?.is_open && data?.is_open !== undefined &&
                    <div id = {style.isSecret}>
                        <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.1875 7.85H3.6875V7.35V5.25C3.6875 2.63685 5.84123 0.5 8.5 0.5C11.1588 0.5 13.3125 2.63685 13.3125 5.25V7.35V7.85H13.8125H14.875C15.7764 7.85 16.5 8.57355 16.5 9.45V18.9C16.5 19.7764 15.7764 20.5 14.875 20.5H2.125C1.22361 20.5 0.5 19.7764 0.5 18.9V9.45C0.5 8.57355 1.22361 7.85 2.125 7.85H3.1875ZM11.6875 7.85H12.1875V7.35V5.25C12.1875 3.2316 10.5279 1.6 8.5 1.6C6.47208 1.6 4.8125 3.2316 4.8125 5.25V7.35V7.85H5.3125H11.6875ZM14.8771 19.4H15.3772L15.3771 18.8999L15.375 9.44989L15.3749 8.95H14.875H2.125H1.625V9.45V18.9V19.4H2.125H7.4375H7.9375V18.9V16.5081V16.2192L7.68717 16.0749C7.19765 15.7928 6.875 15.2804 6.875 14.7C6.875 13.8236 7.59861 13.1 8.5 13.1C9.40139 13.1 10.125 13.8236 10.125 14.7C10.125 15.2813 9.80248 15.7927 9.31283 16.0749L9.0625 16.2192V16.5081V18.9V19.4H9.5625H14.8771Z" fill="#4ED0F9" stroke="#4ED0F9"/>
                        </svg>
                    </div>
                }
                <div id = {style.text}>
                    <SVG id = {style.visitMark} width = "35" height = "22" visitMark/>
                    <p>{`${data?.visit_date?.split("-")[0].substr(2)}년 ${data?.visit_date?.split("-")[1]}월 ${data?.visit_date?.split("-")[2]}일`}</p>
                    <p id = {style.accent}>with</p>
                    <p>{data.together}</p>
                </div>
            </div>

            {/* 피드 사진과 지역이름, 화살표 */}
            <div id = {style.feed}>
                {
                    feed_place&&
                    feed_place.map((e, index) => 
                        <React.Fragment key = {index}>
                            <FeedImgBox 
                                account_index = {data.account_index}
                                feed_index = {data.feed_index}
                                thanks_cnt = {data.thanks_cnt}
                                comment_cnt = {data.comment_cnt} 
                                img = {
                                    index === 0? data.image1: index === 1? data.image2: data.image3
                                } 
                                index = {index}
                            >
                                {e}
                            </FeedImgBox>
                            {
                                index < 2?
                                <div id = {style.arrowBox} style = {{ 
                                    visibility: feed_place[index + 1]?.title !== ""? "visible": "hidden"
                                }}>
                                    <SVG id = {style.nextFeed} width = "39" height = "9" feedArrow/>
                                    <SVG id = {style.nextFeedSmall} width="8" height="8" feedArrow small style = {{ left: `calc(33% * ${index + 1})` }}/>
                                </div>:
                                <></>
                            }
                        </React.Fragment>
                    )
                }
            </div>
        </article>
    )
}

export default Feed