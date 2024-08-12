import React, { useState } from "react"
import style from "./SCSS/TopBar.module.scss"
import SVG from "../SVG/SVG"
import { Link, useNavigate } from "react-router-dom"

const Search = () => {
    const [ input, setInput ] = useState("")
    const navigate = useNavigate()
    const onChangeEvnet = (e) => {
        setInput(e.target.value)
    }

    const onkeyupEvent = (e) => {
        if(e.keyCode === 13){
            navigate(`search/${input}`)
        }
    }

    return(
        <div id = {style.search}>
            <div id = {style.searchBox}>
                <Link to = {`search/${input}`}>
                    <SVG width="20" height="20" search/>
                </Link>
                <input onChange={onChangeEvnet} onKeyUp={onkeyupEvent} type = "text" placeholder = "검색"/>
            </div>
        </div>
    )
}

export default Search