import React, { useEffect } from "react"
import style from "../../Public.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { alertIsOpen } from "../../Redux/Action/alertAction"
import { postingAdInput, postingWithWhomInput, postingTransInput, postingIsPrivate } from "../../Redux/Action/postingAction"

const RadioButton = (props) => {

    const dispatch = useDispatch()
    const index = props.index
    const isDirect = useSelector(state => state.posting.radioDirectInput)
    const adCnt = useSelector(state => state.posting.adCnt)
    const add = useSelector(state => state.posting.add)
    const withList = useSelector(state => state.search?.withList)
    const transList = useSelector(state => state.search.transList)
    const length = add? 3: 2
    let valueCheck = false

    if(props.direct){
        for(let i = 0; i < props.children.length; i++){
            if(props.children[i] === props.value){
                valueCheck = true
                break
            }
        }
    }
    
    useEffect(() => {
        if((props.value !== "") && (!valueCheck) && (props.direct)){
            dispatch(postingTransInput(index, props.value, true))
        }else if((length - adCnt) < 1){
            dispatch(alertIsOpen("message", "oneBtn", { message: "광고를 더 이상 등록할 수 없습니다." }))
            console.log(length)
            console.log(adCnt)
            dispatch(postingAdInput(0, false, true))
        }
    }, [props.value, add])

    const onChangeEvent = (event) => {
        const val = event.target.value
        //광고에 쓸 피드 크기

        if(event.target.name === props.name){
            if(props.posting){
                if(props.with){
                    for(let i = 0; i < withList.length; i++){
                        if(withList[i] === val){
                            dispatch(postingWithWhomInput(val))
                            break
                        }
                    }
                }else if(props.trans){
                    if(val === "직접입력"){
                        dispatch(postingTransInput(index, "", true))
                    }else{
                        for(let i = 0; i < transList.length; i++){
                            if(transList[i] === val){
                                dispatch(postingTransInput(index, val))
                                break
                            }
                        }
                    }
                }
            }
            else{
                switch(val){
                    case "광고":
                        dispatch(postingAdInput(index, true, (length - adCnt) > 1 ))
                        break
                    case "비광고":
                        dispatch(postingAdInput(index, false, (length - adCnt) > 1 ))
                        break
                    case "공개":
                        dispatch(postingIsPrivate(true))
                        break
                    case "비공개":
                        dispatch(postingIsPrivate(false))
                        break
                    default:
                        break
                }
            }
        }else{
            dispatch(postingTransInput(index, event.target.value, true))
        }
    }

    const onClickEvent = (e) => {
        const val = e.target.value
        if(e.target.name === props.name){
            if(props.posting){
                if(props.with){
                    for(let i = 0; i < withList.length; i++){
                        if(withList[i] === val){
                            dispatch(postingWithWhomInput(val))
                            break
                        }
                    }
                }else if(props.trans){
                    if(val === "직접입력"){
                        dispatch(postingTransInput(index, "", true))
                    }else{
                        for(let i = 0; i < transList.length; i++){
                            if(transList[i] === val){
                                dispatch(postingTransInput(index, val))
                                break
                            }
                        }
                    }
                }
            }
            else{
                switch(val){
                    case "광고":
                        dispatch(postingAdInput(index, true, (length - adCnt) > 1 ))
                        break
                    case "비광고":
                        dispatch(postingAdInput(index, false, (length - adCnt) > 1 ))
                        break
                    case "공개":
                        dispatch(postingIsPrivate(true))
                        break
                    case "비공개":
                        dispatch(postingIsPrivate(false))
                        break
                    default:
                        break
                }
            }
        }else{
            dispatch(postingTransInput(index, e.target.value, true))
        }
    }

    return (props.children !== undefined) && (
        <div id = {style.radioList} onChange = {onChangeEvent} name = "radioBox">
            {
                // 배열로 받아온다
                props.children.length&&
                props.children.map((element, index) =>
                    <React.Fragment key = {index}>
                        {
                            element !== "전체" &&
                            <div id = {style.radioType}>
                                <input type = "radio" name = {props.name} value = {element} checked = {props.value === element? true : false}/>
                                <button onClick={onClickEvent} name = {props.name} value = {element} style = {{ color: props.value === element? "black" :"#6A6A6A" }}>
                                    {element}
                                </button>
                            </div>
                        }
                    </React.Fragment>
                )
            }
            {
                props.direct &&
                <div id = {style.radioTypeDirect}>
                    <input type = "radio" name = {props.name} value = "직접입력" checked = { isDirect && !valueCheck}/>
                    <button onClick={onClickEvent}>직접입력</button>
                    {
                        isDirect && !valueCheck?
                        <input type = "text" name = {`${props.name}Direct`} placeholder = "내용을 입력해 주세요." value={valueCheck? "" : props.value }/>:
                        <input type = "text" placeholder = "내용을 입력해 주세요." value={valueCheck? "" : props.value } disabled/>
                    }
                    
                </div>
            }
        </div>
    )
}

export default RadioButton