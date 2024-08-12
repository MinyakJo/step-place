import React from "react"
import { useDispatch } from "react-redux"
import { alertInput } from "../../Redux/Action/alertAction"
import { postingDateInput, postingHashTag } from "../../Redux/Action/postingAction"

const Input = (props) => {

    const dispatch = useDispatch()

    const onChangeEvent = (event) => {

        switch(props.name){
            case "alertInput":
            case "nicknameEditInput":
                dispatch(alertInput(event.target.value))
                break
            case "alertChangeInput":
                dispatch(alertInput(event.target.value, "change"))
                break
            case "alertCheckInput":
                dispatch(alertInput(event.target.value, "check"))
                break
            default:
                break
        }
    }

    return(
        <>
            {
                props.type === "textarea"?

                <textarea id = {props.id} 
                placeholder = {props.placeholder} 
                value = {props.children || props.value} 
                name = {props.name} 
                style = {props.style}
                maxLength = {props.maxLength}
                onChange = {onChangeEvent}/>:

                <input id = {props.id} 
                type = {props.type}
                placeholder = {props.placeholder}
                value = {props.children || props.value}
                name = {props.name}
                onChange = {onChangeEvent}
                checked = {props.checked}
                style = {props.style}
                maxLength = {props.maxLength}
                ref = {props.ref}
                autoComplete="off"
                disabled = {props.disabled}/>
            }
        </>
    )
}

export default Input