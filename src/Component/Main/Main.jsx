import React, { useEffect } from "react"
import style from "./Home/SCSS/Main.module.scss"
import { Routes, Route, Navigate } from "react-router-dom"
import FeedPostingPage from "./FeedPosting/FeedPostingPage"
import HomePage from "./Home/HomePage"
import JoinPage from "./Join/JoinPage"
import LoginPage from "./Login/LoginPage"
import FeedDetailPage from "./FeedDetail/FeedDetailPage"
import SearchPage from "./Search/SearchPage"
import MyPage from "./MyPage/MyPage.jsx"
import FollowPage from "./MyPage/FollowPage"
import ActivityPage from "./MyPage/ActivityPage"
import AccountPage from "./MyPage/AccountPage"
import WriterAppPage from "./MyPage/WriterAppPage"
import NoticePage from "./MyPage/NoticePage"
import NoticeDetailPage from "./MyPage/NoticeDetailPage"
import InquiryPage from "./MyPage/InquiryPage"
import { getCookie } from "../../Hooks/cookie"
import { useSelector, useDispatch } from "react-redux"
import { refLogin, logout } from "../../Redux/Action/loginAction"
import PasswordPage from "./Login/PasswordPage"
import { userData } from "../../Redux/Action/action"
import Private from "./Home/Private"
import MoSearchPage from "../Mobile/MoSearchPage"

const Main = () => {

    const dispatch = useDispatch()
    const token = getCookie("access-token")
    const login = useSelector(state => state.login.login)
    useEffect(() => {
        if(token !== undefined){
            dispatch(refLogin())
            dispatch(userData())
        }else if(token === undefined){
            dispatch(logout())
        }
    }, [login])

    return(
        <Routes>
            <Route path = "/" element = {<HomePage home/>} />
            <Route path = "/login" element = {<LoginPage/>} />
            <Route path = "/join" element = {<JoinPage/>} />
            <Route path = "/forgotPw" element = {<PasswordPage/>}/>
            <Route path = "/feedPosting" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <FeedPostingPage/>
            } />
            <Route path = "/feedEdit/:account_index/:feed_index" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <FeedPostingPage edit/>
            } />
            <Route path = "/feedDetail/:account_index/:feed_index" element = {
                <FeedDetailPage/>
            } />
            <Route path = "/search/*" element = {
                <SearchPage/>
            } />
            <Route path = "/myPage" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <MyPage/>
            } />
            <Route path = "/follower/:address" element = {
                <FollowPage follower/>
            } />
            <Route path = "/following/:address" element = {
                <FollowPage following/>
            } />
            <Route path = "/feed/:account_index" element = {
                <HomePage accountFeed/>
            } />
            <Route path = "/:address" element = {
                <HomePage accountFeed/>
            } />
            <Route path = "/activity" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <ActivityPage/>
            } />
            <Route path = "/account" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <AccountPage/>
            } />
            <Route path = "/writerApp" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <WriterAppPage/>
            } />
            <Route path = "/notice" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <NoticePage/>
            } />
            <Route path = "/noticeDetail/:notice_index" element = {
                token === undefined?
                <Navigate replace to = "/login"/>:
                <NoticeDetailPage/>
            } />
            <Route path = "/inquiry" element = {<InquiryPage/>} />
            <Route path = "/inquiry/noMember" element = {<InquiryPage noLogin/>} />
            <Route path = "/m/search" element = {<MoSearchPage/>} />
            <Route path = "*" element = {<Private undefined/>} />
        </Routes>
    )
}

export default Main