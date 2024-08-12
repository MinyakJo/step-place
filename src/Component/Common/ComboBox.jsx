import React, { useState }  from "react"
import { useDispatch, useSelector } from "react-redux"
import { joinEmailAddr } from "../../Redux/Action/joinAction"
import { postingPlaceInput, postingTransInput, postingWithWhomInput } from "../../Redux/Action/postingAction"

const ComboBox = (props) => {

    //state써서
    const [ upBtn, setUpBtn ] = useState("hidden")
    const [ downBtn, setDownBtn ] = useState("visible")
    const [ isInput, setIsInput ] = useState(false)

    const dispatch = useDispatch()
    const addr = props?.children
    const inputVal = useSelector(state => state.join.email.addr)
    const locText = useSelector(state => state.posting.place)
    const withText = useSelector(state => state.posting.with)
    const transText = useSelector(state => state?.posting?.feed[props.index]?.transportation)
    let style = props.style
    let isDisabled = true

    if(props.posting && props.direct || props.join){
        let cnt = 0
        const text = props.join? inputVal: transText
        for(let i = 0; i < addr.length; i++){
            if(text === addr[i]){
                cnt += 1
            }
        }
        if(cnt === 0){
            isDisabled = false
        }
    }
    
    //화살표 위아래 변경
    const onClickEvent = () => {
        if(downBtn === "visible"){
            setDownBtn("hidden")
            setUpBtn("visible")
        }else{
            setDownBtn("visible")
            setUpBtn("hidden")
        }
    }

    const liClickEvent = (event) => {
        if(event.target.value < addr.length && event.target.value !== undefined && props.join){
            dispatch(joinEmailAddr(addr[event.target.value]))
        }
        if(props.posting){
            if(props.loc){
                dispatch(postingPlaceInput(addr[event.target.value]))
            }else if(props.with){
                dispatch(postingWithWhomInput(addr[event.target.value]))
            }else if(props.trans){
                dispatch(postingTransInput(props.index, addr[event.target.value]))
            }
        }
        if(event.target.value === undefined){
            if(props.join){
                dispatch(joinEmailAddr("reset"))
            }
            else if(props.posting){
                if(props.loc){
                    dispatch(postingPlaceInput(""))
                }else if(props.with){
                    dispatch(postingWithWhomInput(""))
                }else if(props.trans){
                    dispatch(postingTransInput(props.index, ""))
                }
            }
            setIsInput(false)
            return
        }
        setIsInput(true)
    }

    const onChangeEvnet = (e) => {
        if(props.join){
            dispatch(joinEmailAddr(e.target.value))
        }else if(props.posting){
            if(props.loc){
                dispatch(postingPlaceInput(e.target.value))
            }else if(props.with){
                dispatch(postingWithWhomInput(e.target.value))
            }else if(props.trans){
                dispatch(postingTransInput(props.index, e.target.value))
            }
        }
    }

    return (props.children !== undefined) && (
        <>
            {
                isInput?
                <>
                    <input onChange={onChangeEvnet} id = {props.id} type = "text" name = "joinAddr" placeholder = "입력해 주세요."  style = {style}
                        readOnly = { isDisabled }
                        value = {
                            props.join?inputVal:
                            props.posting && props.with? withText:
                            props.posting && props.loc? locText:
                            props.posting && props.trans? transText:
                            ""
                        }
                        autoComplete = "off"
                    />
                    {
                        !props.disabled&&
                        <svg onClick = {liClickEvent} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0293 1L1 12.0293" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 1L12.0293 12.0293" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    }

                </>:
                <>
                    <button id = {props.id} onClick={onClickEvent} style = {style}>
                        {
                            props.value !== "" && props.value !== null && props.value !== undefined ?
                            props.value:
                            props.defaultValue
                        }
                    </button>
                    <ul onClick = {onClickEvent} style = {{visibility: upBtn}}>
                        {
                            addr&&addr.map((element, index) => 
                                <React.Fragment key = {index}>
                                    {
                                        element !== "전체" &&
                                        <li value = {index} onClick = {liClickEvent}>
                                            {element}
                                        </li>
                                    }
                                </React.Fragment>
                            )
                        }
                        {
                            props.direct&&
                            <li onClick = {liClickEvent} value = {addr.length}>직접입력</li>
                        }
                    </ul>
                    <svg visibility = {downBtn} onClick={onClickEvent} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 0.999999L7 7L1 1" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg visibility = {upBtn} onClick={onClickEvent} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7L7 1L13 7" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </>
            }
        </>
    )
}

export default ComboBox