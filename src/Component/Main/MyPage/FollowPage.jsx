import React from "react"
import style from "./SCSS/FollowPage.module.scss"
import AccountList from "../../Main/Home/AccountList"
import { useDispatch, useSelector } from "react-redux"
import { moTopOpen } from "../../../Redux/Action/mobileStyleAction"
import Button from "../../Common/Button"
import { leftBarOpen, leftBarSelected } from "../../../Redux/Action/leftBarAction"
import { moreViewOpen, topBarSelected } from "../../../Redux/Action/topBarAction"
import { rightBarOpen } from "../../../Redux/Action/alarmAction"
import Private from "../Home/Private"
import Footer from "../Login/Footer"

const FollowPage = (props) => {

    const dispatch = useDispatch()
    const account_index = useSelector(state => state.left.leftBarData?.account_index)

    dispatch(topBarSelected())
    dispatch(leftBarSelected())
    dispatch(rightBarOpen())
    if(account_index !== null){
        dispatch(leftBarOpen(true))
    }else{
        dispatch(leftBarOpen())
    }
    dispatch(moreViewOpen())
    dispatch(moTopOpen())

    return(
        <main id = {style.main}>
            {
                props.following?
                <>
                    <div id = {style.title}>
                        <Button name = "backBtn">
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Button>
                        <h1>팔로잉</h1>
                    </div>
                    <AccountList following/>
                </>:
                <>
                    <div id = {style.title}>
                        <Button name = "backBtn">
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Button>
                    <h1>팔로워</h1>
                    </div>
                    <AccountList follow/>
                </>
            }
            <Footer id = {style.footer}/>
        </main>
    )
}

export default FollowPage