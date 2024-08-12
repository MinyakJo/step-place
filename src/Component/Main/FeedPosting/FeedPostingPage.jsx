import React, { useEffect } from "react"
import style from "./SCSS/FeedPosting.module.scss"
import FeedPostingTop from "./FeedPostingTop"
import FeedPosting from "./FeedPosting"
import FeedPostingBottom from "./FeedPostingBottom"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import { postingFeedAdd, postingReset } from "../../../Redux/Action/postingAction"
import { searchFilterGet, searchTransGet } from "../../../Redux/Action/searchAction"
import { useParams } from "react-router-dom"
import { feedMoreView } from "../../../Redux/Action/feedAction"
import { moreViewSelected, topBarSelected, moreViewOpen } from "../../../Redux/Action/topBarAction"
import { leftBarOpen, leftBarSelected } from "../../../Redux/Action/leftBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import { moTopOpen } from "../../../Redux/Action/mobileStyleAction"
import MoTopBar from "../../Mobile/MoTopBar"
import { getCookie } from "../../../Hooks/cookie"
import Footer from "../Login/Footer"

const FeedPostingPage = (props) => {

    const dispatch = useDispatch()
    const { feed_index } = useParams()
    const { account_index } = useParams()
    const navigate = useNavigate()
    const isAdd = useSelector(state => state.posting.add)
    const isWriter = useSelector(state => state.home.userData.is_photographer)
    const postingData = useSelector(state => state.posting)
    const editCnt = useSelector(state => state.posting.editCnt)

    useEffect(() => {
        if(!isWriter && isWriter !== null){
            dispatch(alertIsOpen("writerApp", "twoBtn"))
            navigate("/", {replace:true})
        }
        if(props.edit && account_index !== getCookie("index-token")){
            navigate("/", {replace:true})
        }
        if(!props.edit){
            dispatch(postingReset())
        }
        dispatch(topBarSelected("posting"))
        dispatch(leftBarOpen())
        dispatch(moTopOpen())
        dispatch(rightBarOpen())
        dispatch(leftBarSelected())
        dispatch(moreViewSelected())
        dispatch(moreViewOpen())
        dispatch(feedMoreView())
        dispatch(searchFilterGet())
        dispatch(searchTransGet())
    }, [account_index])

    const onClickEvent = () => {
        dispatch(postingFeedAdd())
    }
    return(
        <main id = {style.main}>
            <MoTopBar/>
            <FeedPostingTop edit = {props.edit}/>
            <FeedPosting edit = {props.edit}/>
            <FeedPosting second edit = {props.edit}/>
            {
                isAdd?
                <FeedPosting third edit = {props.edit}/>:
                editCnt !== 2 ?
                <div id = {style.feedAdd}>
                    <button onClick={onClickEvent} name = "feedAdd">
                        <SVG width = "40" height = "40" feedAdd/>
                        장소추가
                    </button>
                </div>:
                <></>
            }
            <FeedPostingBottom edit = {props.edit} isPrivate = {postingData.isPrivate}/>
            <Footer/>
        </main>
    )
}

export default FeedPostingPage