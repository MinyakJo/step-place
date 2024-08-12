import React from "react"
import style from "./SCSS/Comment.module.scss"
import SVG from "../../SVG/SVG"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Comment = (props) => {

    const navigate = useNavigate()
    const data = props.children
    const profile = useSelector(state => state.home.userData.profile)
    
    const onClickEvent = (e) => {
        navigate(`/feedDetail/${data?.account_index}/${data?.feed_index}`)
    }

    return(
        <article id = {style.comment} onClick={onClickEvent}>
            <div id = {style.profileImg}>
                {
                    profile === null || profile === undefined?
                    <SVG width = "16" height = "18" account/>:
                    <img src = {`${process.env.REACT_APP_URL}/${profile}`}/>
                }
            </div>
            <div id = {style.link}>
                <div id = {style.contentsBox}>
                    <p id = {style.contents}>{data?.contents}</p>
                    <p id = {style.time}>
                        {data?.date}
                    </p>
                </div>
                <div id = {style.spot}>
                    {
                        data?.feed_place&&data.feed_place.map((e, index) =>
                            <p key={index}>
                                {
                                    e !== ""&&
                                    <>
                                        {
                                            e.title !== "" &&
                                            <SVG width="14" height="17" commentSpotMark/>
                                        }
                                        {e.title}
                                        {
                                            data?.feed_place[index + 1]?.title !== "" && data?.feed_place[index + 1]?.title !== undefined &&
                                            <SVG id = {style.commentLine} width="14" height="1" commentSpotLine/>
                                        }
                                    </>
                                }
                            </p>
                        )
                    }
                </div>
            </div>
            <img id = {style.feedImg} src={`${process.env.REACT_APP_URL}/${data?.image1[0]?.file_path}`}/>
            <div id = {style.moSpot}>
                    {
                        data?.feed_place&&data.feed_place.map((e, index) =>
                            <p key={index}>
                                {
                                    e !== ""&&
                                    <>
                                        <SVG width="14" height="17" commentSpotMark/>
                                        {e.title}
                                        {
                                            data?.feed_place[index + 1]?.title !== "" && data?.feed_place[index + 1]?.title !== undefined &&
                                            <SVG width="14" height="1" commentSpotLine/>
                                        }
                                    </>
                                }
                            </p>
                        )
                    }
                </div>
        </article>
    )
}

export default Comment