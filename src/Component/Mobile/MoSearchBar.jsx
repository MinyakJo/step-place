import React, { useState, useEffect } from "react"
import style from "./SCSS/MoTopBar.module.scss"
import { useDispatch } from "react-redux"
import { filterSelected, searchSelected } from "../../Redux/Action/mobileStyleAction"
import { searchFilterGet, searchFilterSelected } from "../../Redux/Action/searchAction"
import { useNavigate } from "react-router-dom"

const MoSearchBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ text, setText ] = useState("")
    let link = `/search/${text}`

    const onChangeEvnet = (e) => {
        setText(e.target.value)
    }
    
    const onClickEvent = (e) => {
        const name = e.currentTarget.name
        switch(name){
            case "search":
                dispatch(filterSelected())
                dispatch(searchFilterSelected())
                navigate(`${link}`)
                break
            case "cancel":
                setText("")
                break
            case "more":
                dispatch(filterSelected(true))
                dispatch(searchFilterGet())
                break
            default:
        }
    }

    const onKeyUpEvent = (e) => {
        if(e.keyCode === 13){
            navigate(`${link}`)
        }
    }

    useEffect(() => {
        dispatch(searchSelected(true))
    }, [])

    return(
        <div id = { style.searchBox }>
            <div id = {style.left}>
                <button name = "search" onClick={onClickEvent}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00004 17.0001C13.4183 17.0001 17.0001 13.4183 17.0001 9.00004C17.0001 4.58174 13.4183 1 9.00004 1C4.58174 1 1 4.58174 1 9.00004C1 13.4183 4.58174 17.0001 9.00004 17.0001Z" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.9997 19.0002L14.6497 14.6501" stroke="#4ED0F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div id = {style.inputBox}>
                    <input type = "text" onChange={onChangeEvnet} onKeyUp = {onKeyUpEvent} placeholder="검색" value = {text} autoComplete = "off"/>
                    <button id = {style.cancel} name = "cancel" onClick={onClickEvent} style = {{ display: text === ""? "none": "flex" }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15" stroke="#6A6A6A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 5L15 15" stroke="#6A6A6A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div id = {style.right}>
                <button  name = "more" onClick={onClickEvent}>
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9999 3.59998H12.3999" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.6 3.59998H1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20 11.4H9.8667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.06667 11.4H1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.3999 1V4.9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.06641 10.1V14" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default MoSearchBar