import React from "react"
import style from "./SCSS/Join.module.scss"
import ComboBox from "../../Common/ComboBox"
import { useSelector, useDispatch } from "react-redux"
import Timer from "./Timer"
import SVG from "../../SVG/SVG"
import { joinBirthDateInput, joinCodeSubmit, joinEmailAddr, joinEmailInput, joinEmailVerifyCodeGet, joinEmailVerifyInput, joinNameInput, joinNicknameDup, joinNicknameInput, joinPwCheckInput, joinPwInput, joinTimerStop } from "../../../Redux/Action/joinAction"

const JoinInput = (props) => {
    
    const dispatch = useDispatch()
    const joinAlertState = useSelector(state => state.join?.style?.alert)
    const verifyStyle = useSelector(state => state.join.style?.verifyMessage)
    const verifySuccess = useSelector(state => state.join?.verify?.submitCheck)
    const nicknameStyle = useSelector(state => state.join?.style?.nickCheck)
   
    let hiddenMsgStyle = {
        display: "none"
    }
    let inputLineStyle = {
        border: `1px solid #E8E8E8`
    }

    if(joinAlertState && !props.check){
        hiddenMsgStyle.display = "flex"
        inputLineStyle.border = `1px solid red`
    }else{
        hiddenMsgStyle.display = "none"
        inputLineStyle.border = `1px solid #E8E8E8`
    }

    const onChangeEvent = (e) => {
        switch(e.target.name){
            case "joinName":
                dispatch(joinNameInput(e.target.value))
                break
            case "joinBirthDate":
                dispatch(joinBirthDateInput(e.target.value))
                break
            case "joinEmail":
                dispatch(joinEmailInput(e.target.value))
                break
            case "joinAddr":
                dispatch(joinEmailAddr(e.target.value))
                break
            case "joinVerify":
                dispatch(joinEmailVerifyInput(e.target.value))
                break
            case "joinPw":
                dispatch(joinPwInput(e.target.value))
                break
            case "joinPwCheck":
                dispatch(joinPwCheckInput(e.target.value))
                break
            case "joinNickname":
                dispatch(joinNicknameInput(e.target.value))
                break
            default:

        }
    }

    const onBlurEvent = (e) => {
        switch(e.target.name){
            case "joinNickname":
                dispatch(joinNicknameDup(e.target.value))
                break
        }
    }

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "codeSubmit":
                dispatch(joinTimerStop(props.check))
                dispatch(joinCodeSubmit(props.code))
                break
            case "codeResend":
                dispatch(joinEmailVerifyCodeGet(props.email))
                break
        }
    }

    return(
        <div id = {style.inputBox}>
            {
                // 일반적인 텍스트
                props.type === "text"?
                <>
                    <div id = {style.inputLine}>
                        <input style = {inputLineStyle} onChange={onChangeEvent} name = {props.name} type = {props.type} placeholder = {props.placeholder} maxLength = {props.maxLength} autoComplete="off"/>
                    </div>
                    <p id = {style.hiddenMsg} style = {hiddenMsgStyle}>필수 입력 항목입니다.</p>
                </>:
                // 이메일
                props.type === "email"?
                <>
                    <div id = {style.emailInput}>
                        <div id = {style.inputLine}>
                            <input style = {inputLineStyle} onChange={onChangeEvent} name = {props.name} type = "text" placeholder = {props.placeholder} maxLength = {props.maxLength} disabled = {verifySuccess} autoComplete="off"/>
                        </div>
                        <p>@</p>
                        <div id = {style.comboBox}>
                            <ComboBox id = {style.inputLine}  style = {inputLineStyle} defaultValue = "선택해 주세요." direct join disabled = {verifySuccess}>
                                {[
                                    "naver.com",
                                    "hanmail.net",
                                    "daum.net",
                                    "gmail.com",
                                    "nate.com",
                                    "hotmail.com",
                                    "outlook.com",
                                    "icloud.com",
                                ]}
                            </ComboBox>
                        </div>
                    </div>
                    <p id = {style.hiddenMsg} style = {hiddenMsgStyle}>필수 입력 항목입니다.</p>
                </>:
                props.type === "emailVerify"?
                <>
                    <div id = {style.verifyInput}>
                        <div id = {style.inputLine}>
                            <p id = {style.inputGuide}>
                                코드 입력
                            </p>
                            <input style = {inputLineStyle} onChange={onChangeEvent} name = {props.name} type = "text" placeholder = {props.placeholder}  maxLength = {props.maxLength} autoComplete="off"/>
                            <Timer/>
                            <button onClick={onClickEvent} id = {style.sumbit} name = "codeSubmit" check = {props.check} code = {props.children}>
                                확인
                            </button>
                        </div>
                        <p id = {style.hiddenMsg} style = {verifyStyle? { display: "none" }: { display: "flex" }}>
                            <SVG width = "22" height = "22" info/>
                            올바른 인증코드가 아닙니다.
                        </p>
                        <button onClick={onClickEvent} id = {style.resend} name = "codeResend" email = {props.email} >
                            인증코드 재전송
                        </button>
                    </div>
                </>:
                props.type === "nickname"?
                <>
                    <div id = {style.inputLine}>
                        <input style = {inputLineStyle} onChange={onChangeEvent} onBlur = {onBlurEvent} name = {props.name} type = {props.type} placeholder = {props.placeholder} maxLength = {props.maxLength} autoComplete="off"/>
                        <div id = {style.nickHiddenMsg} style = {nicknameStyle ? { display: "none" } : { display: "flex" }}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0026 20.1693C16.0652 20.1693 20.1693 16.0652 20.1693 11.0026C20.1693 5.93999 16.0652 1.83594 11.0026 1.83594C5.93999 1.83594 1.83594 5.93999 1.83594 11.0026C1.83594 16.0652 5.93999 20.1693 11.0026 20.1693Z" stroke="#FE5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 14.6667V11" stroke="#FE5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 7.33594H11.0095" stroke="#FE5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    {
                        nicknameStyle && joinAlertState && !props.check?
                        <p id = {style.hiddenMsg} style = {hiddenMsgStyle}>필수 입력 항목입니다.</p>:
                        <p id = {style.hiddenMsg} style = {nicknameStyle ? { display: "none" } : { display: "flex" }}>이미 존재하고 있는 닉네임 입니다.</p>
                    }
                </>:
                // 비밀번호
                props.type === "password"?
                <>
                    <div id = {style.inputLine}>
                        <input style = {inputLineStyle} onChange={onChangeEvent} name = {props.name} type = {props.type} placeholder = {props.placeholder} maxLength = {props.maxLength} autoComplete="off"/>
                    </div>
                    {
                        !props.isSame && props.check?
                        <p id = {style.hiddenMsg} style = { props.isSame ? { display: "none" }: { display: "flex" } }>비밀번호를 동일하게 입력해 주세요</p>:
                        <p id = {style.hiddenMsg} style = {hiddenMsgStyle}>필수 입력 항목입니다.</p>
                    }
                </>:
                // 비밀번호 확인
                props.type === "passwordCheck" &&
                <>
                    <div id = {style.inputLine}>
                        <input style = {inputLineStyle} onChange={onChangeEvent} name = {props.name} type = "password" placeholder = {props.placeholder} maxLength = {props.maxLength} autoComplete="off"/>
                    </div>
                    {
                        !props.isSame && props.check?
                        <p id = {style.hiddenMsg} style = { props.isSame ? { display: "none" }: { display: "flex" }}>비밀번호를 동일하게 입력해 주세요</p>:
                        <p id = {style.hiddenMsg} style = {hiddenMsgStyle}>확인을 위해 비밀번호를 한 번 더 입력해 주세요.</p>
                    }
                </>
            }
        </div>
    )
}

export default JoinInput