import React from "react"
import style from "./SCSS/MoTopBar.module.scss"
import MoLogo from "./MoLogo"
import MoIconBox from "./MoIconBox"
import { useSelector } from "react-redux"
import MoSearchBar from "./MoSearchBar"
import MoSearchFilter from "./MoSearchFilter"

const MoTopBar = () => {

    const login = useSelector(state => state.login.login)
    const isSearch = useSelector(state => state.mobile.searchSelect)
    const isFeed = useSelector(state => state.top.top.feedIsSelected)
    
    return(
        <nav id = {style.moTopBar} style = {{  
            justifyContent: login ? "space-between": "center",
            boxShadow: isFeed? "none": "0px 1px 1px rgba(141, 134, 134, 0.1)" }}>
            {
                isSearch?
                <>
                    <MoSearchBar/>
                    <MoSearchFilter/>
                </>:
                <>
                    <MoLogo/>
                    <MoIconBox/>
                </>
            }
        </nav>
    )
}

export default MoTopBar