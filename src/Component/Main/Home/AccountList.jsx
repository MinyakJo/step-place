import React, { useEffect } from "react"
import Account from "./Account"
import style from "./SCSS/Account.module.scss"
import SVG from "../../SVG/SVG"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router"
import { followGet, followReset } from "../../../Redux/Action/followAction"
import { searchGet } from "../../../Redux/Action/searchAction"
import scrollLoad from "../../../Hooks/scrollLoad"
import { throttle } from "lodash" 

const AccountList = (props) => {
    
    const { address } = useParams()
    const location = useLocation()
    const search_input = decodeURI(location.pathname.split("/")[2])
    const dispatch = useDispatch()
    const followPage = useSelector(state => state.follow.page)
    const searchPage = useSelector(state => state.follow.searchPage)
    const followerData = useSelector(state => state.follow.followerList)
    const followingData = useSelector(state => state.follow.followingList)
    const accountList = useSelector(state => state.follow.searchAccountList)

    const onScrollEvent = throttle((e) => {
        const scrollHeight = e.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = e.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = e.target.scrollHeight //진짜 스크롤 높이

        if(scrollLoad(scroll, scrollHeight, mainHeight)){
            if(props.following){
                dispatch(followGet(address, "following", followPage + 1))
            }else if(props.follow){
                dispatch(followGet(address, "following/follow", followPage + 1))
            }else{
                dispatch(searchGet(search_input, "basic/account", searchPage + 1))
            }
        }
    }, 300)

    useEffect(() => {
        if(props.following){
            dispatch(followGet(address, "following"))
        }else if(props.follow){
            dispatch(followGet(address, "following/follow"))
        }else{
            dispatch(searchGet(search_input, "basic/account"))
        }

        return () => { dispatch(followReset()) }
    }, [props.following, address])

    return(
        <section id = {props.search? style.searchAccountList : style.accountList } onScroll = {onScrollEvent}>
            {
                props.following?
                <>
                    {
                        followingData&&followingData.map((e, index) =>
                            <React.Fragment key = {index}>
                                <Account following = {props.following}>
                                    {e}
                                </Account>
                                {
                                    index < (followingData.length - 1)?
                                    <SVG id = {style.line} width="837" height="1" line/>:
                                    <></>
                                }
                            </React.Fragment>
                            
                        )
                    }
                </>:
                props.follow?
                <>
                    {
                        followerData&&followerData.map((e, index) =>
                            <React.Fragment key = {index}>
                                <Account follow = {props.follow}>
                                    {e}
                                </Account>
                                {
                                    index < (followerData.length - 1)?
                                    <SVG id = {style.line} width="837" height="1" line/>:
                                    <></>
                                }
                            </React.Fragment>
                            
                        )
                    }
                </>:
                <>
                    {
                        accountList&&accountList.map((e, index) =>
                            <React.Fragment key = {index}>
                                <Account search>
                                    {e}
                                </Account>
                                {
                                    index < (accountList.length - 1)?
                                    <SVG id = {style.line} width="837" height="1" line/>:
                                    <></>
                                }
                            </React.Fragment> 
                        )
                    }
                </>
            }
        </section>
    )
}

export default AccountList