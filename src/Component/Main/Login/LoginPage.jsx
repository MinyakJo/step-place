import React, { useEffect } from "react"
import style from "./SCSS/Login.module.scss"
import Footer from "./Footer"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../../../Redux/Action/action"
import { joinReset } from "../../../Redux/Action/joinAction"
import { loginEmailInput, loginPwInput, loginKeep, login } from "../../../Redux/Action/loginAction"
import { alertIsOpen } from "../../../Redux/Action/alertAction"
import { Link } from "react-router-dom"
import { topBarSelected } from "../../../Redux/Action/topBarAction"
import { leftBarOpen } from "../../../Redux/Action/leftBarAction"
import { alertReset } from "../../../Redux/Action/alertAction"
import { getCookie } from "../../../Hooks/cookie"

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginState = useSelector(state => state.login)
    const email = useSelector(state => state.login.email)
    const pw = useSelector(state => state.login.pw)
    const check = useSelector(state => state.login.check)

    useEffect(() => {
        if(getCookie("access-token") !== undefined){
            dispatch(userData())
            navigate("/", {replace:true})
        }
        dispatch(topBarSelected())
        dispatch(leftBarOpen())
        dispatch(alertReset())
        dispatch(joinReset())
    }, [loginState.login])

    const onChangeEvent = (e) => {
        switch(e.target.name){
            case "loginEmail":
                dispatch(loginEmailInput(e.target.value))
                break
            case "loginPw":
                dispatch(loginPwInput(e.target.value))
                break
            case "loginKeep":
                dispatch(loginKeep(e.target.checked))
                break
            default:
        }
    }

    const onClickEvent = (e) => {
        switch(e.target.name){
            case "login":
                dispatch(login(email.text, pw.text, check))
                break
            case "forgotEmail":
                dispatch(alertIsOpen("inquiryNoMem", "oneBtn", {message: "가입한 이메일 찾기는 문의하기 페이지를 통해\n관리자에게 요청해주세요."}))
                break
            default:
        }
    }

    const onKeyUpEvent = (e) => {
        if(e.keyCode === 13){
            dispatch(login(email.text, pw.text, check))
        }
    }

    return(
        <main id = {style.main} onKeyUp = {onKeyUpEvent}>
            <div id = {style.box}>
                <div id = {style.loginBox}>

                    {/* 로고 */}
                    <h1 id = {style.logo}>
                        <SVG width="203" height="50" loginLogo/>
                    </h1>

                    {/* 아이디 비밀번호 */}
                    <div id = {style.inputBox}>
                        <input name = "loginEmail" type = "text" placeholder = "이메일을 입력해주세요." onChange = {onChangeEvent} autoComplete="off"/>
                        <input name = "loginPw" type = "password" placeholder = "비밀번호를 입력해주세요." onChange = {onChangeEvent} autoComplete="off"/>
                    </div>

                    {/* 로그인 유지 체크박스 */}
                    <div id = {style.keep}>
                        <input name = "loginKeep" type = "checkbox" onChange = {onChangeEvent} />
                        <p>로그인 유지</p>
                    </div>

                    {/* 로그인, 회원가입 버튼 */}
                    <div id = {style.btnBox}>
                        <button id = {style.login} name = "login" email = {email.text} pw = {pw.text} keep = {loginState.keep} onClick = {onClickEvent}>
                            로그인
                        </button>
                        <Link id = {style.join} to = "/join" link>
                            회원가입
                        </Link>
                    </div>

                    {/* 아이디, 비밀번호 찾기 버튼 */}
                    <div id = {style.forgotBtn}>
                        <Link to = "/forgotPw" link>비밀번호 찾기</Link>
                            <svg width="2" height="19" viewBox="0 0 2 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V18.5" stroke="#E8E8E8"/>
                            </svg>
                        <button name = "forgotEmail" onClick={onClickEvent}>가입한 이메일 찾기</button>
                    </div>
                </div>
            </div>
            <Footer id = {style.footer} btnId = {style.btnBox}/>
        </main>
    )
}

export default Login