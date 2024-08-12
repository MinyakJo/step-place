import React, { useEffect } from "react"
import style from "./SCSS/Footer.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { footerGet } from "../../../Redux/Action/footerAction"

const Footer = (props) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.footer.footer[0])
    useEffect(() => {
        dispatch(footerGet())
    }, [])

    return(
        <footer id = {props.id}>
            <div id = {style.btnBox}>
                <a href = {data?.terms_of_service} target="_blank">이용약관</a>
                <a href = {data?.privacy_policy} target="_blank">개인정보처리방침</a>
                <a href = {data?.contactus} target="_blank" link>문의하기</a>
            </div>
            <p>{data?.copyright}</p>
        </footer>
    )
}

export default Footer