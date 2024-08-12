import React, { useEffect, useState } from "react";
import style from "../../variable.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { myAccountIsPrivate } from "../../Redux/Action/myPageAction";

const OnOffButton = (props) => {

    const dispatch = useDispatch()
    const isPrivate =  useSelector(state => state.myPage.account.is_disabled)

    const onclickEvent = () => {
        dispatch((myAccountIsPrivate(!isPrivate)))
    }
    let buttonStyle = {
        backgroundColor: style.grey02Color
    }
    let divStyle = {
        left: "2px"
    }

    if(isPrivate){
        buttonStyle = {
            backgroundColor: style.mainColor
        }
        divStyle = {
            left: "56%"
        }
    }else{
        buttonStyle = {
            backgroundColor: style.grey02Color
        }
        divStyle = {
            left: "2px"
        }
    }

    return(
        <button id = {props.id} onClick = {onclickEvent} style = {buttonStyle}>
            {
                isPrivate?
                <p style={{marginRight: "auto"}}>on</p>:<p style={{marginLeft: "auto"}}>off</p>
            }
            <div style = {divStyle}></div>
        </button>
    )
}

export default OnOffButton