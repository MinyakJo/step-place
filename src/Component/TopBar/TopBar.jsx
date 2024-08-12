import React from "react"
import Logo from "./Logo"
import style from "./SCSS/TopBar.module.scss"
import Search from "./Search"
import IconBox from "./IconBox"

const TopBar = () => {
    return(
        <nav id = {style.topBar}>
            <Logo/>
            <Search/>
            <IconBox/>
        </nav>
    )
}

export default TopBar