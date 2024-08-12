import React from "react"
import Feed from "./Feed"
import style from "./SCSS/Feed.module.scss"
import { useSelector } from "react-redux"

const FeedList = (props) => {
    const data = useSelector(state => state.feed.feedList)
    return(
        <section id = {props.search? style.searchFeedList: style.feedList}>
            {
                data&&data.map((element, index) =>
                    <Feed key = {index}>
                        {element}
                    </Feed>
                )
            }
        </section>
    )
}

export default FeedList