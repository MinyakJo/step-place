import React from "react"
import Button from "../Common/Button"
import style from "./SCSS/TopBar.module.scss"
import SVG from "../SVG/SVG"

const Logo = () => {

    return(
        <div id = {style.logo}>
            <Button value = "/" name = "home" link>
                <SVG id = {style.logoImg} width="163" height="40" logo/>
            </Button>
        </div>
    )
}

export default Logo