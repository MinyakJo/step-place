import React, { useEffect } from "react"
import style from "./SCSS/WriterAppPage.module.scss"
import Button from "../../Common/Button"
import { useSelector, useDispatch } from "react-redux"
import { userData } from "../../../Redux/Action/action"
import { leftBarSelected, leftBarOpen, leftBarGet } from "../../../Redux/Action/leftBarAction"
import { wirterAppPost, writerAppInput, writerAppPageCount } from "../../../Redux/Action/writerAppAction"
import { bottomOpen } from "../../../Redux/Action/mobileStyleAction"

const WriterAppPage = () => {

    const dispatch = useDispatch()
    const currentState = useSelector(state => state.writer?.writerApp)

    dispatch(leftBarSelected("writerApp"))
    dispatch(leftBarOpen(true))

    useEffect(() => {
        dispatch(userData())
        dispatch(leftBarGet())
        dispatch(bottomOpen())
    }, [])

    const onChangeEvent = (e) => {
        switch(e.target.name){
            case "writerApp1":
                dispatch(writerAppInput("1", e.target.value))
                break
            case "writerApp2":
                dispatch(writerAppInput("2", e.target.value))
                break
            case "writerApp3":
                dispatch(writerAppInput("3", e.target.value))
                break
        }
    }

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "writerAppSubmit":
                dispatch(wirterAppPost(currentState[1],currentState[2], currentState[3]))
                break
            case "writerAppNextPage":
                dispatch(writerAppPageCount(false))
                break
        }
    }

    return(
        <main id = {style.main}>
            {/* 작가 신청 */}
            <div id = {style.title}>
                <Button name = "backBtn">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
                <h1>작가 신청</h1>
            </div>
            <div id = {style.writerAppBox}>
                <div id = {style.guide}>
                    <p id = {style.num}>{currentState.page}</p>
                    {
                        currentState.page === 1?
                        <p id = {style.text}>작가소개</p>:
                        currentState.page === 2?
                        <p id = {style.text}>도움</p>:
                        <p id = {style.text}>활동 SNS or 홈페이지</p>
                    }
                    <div id = {style.orderBox}>
                        <p id = {style.order}>{currentState.page}</p>
                        <p>/3</p>
                    </div>
                </div>
                <div id = {style.question}>
                    {
                        currentState.page === 1 ?
                        <h1>작가님에 대해 알려주세요</h1>:
                        currentState.page === 2 ?
                        <h1>스텝플레이스가 어떤 도움을 드리면 좋을까요?</h1>:
                        <h1>활동했었던 또는 활동중인 sns나 홈페이지가 있으신가요?</h1>
                    }
                </div>
                <div id = {style.answer}>
                    {
                        currentState.page === 1 ?
                        <>
                            {
                                currentState[1].length === 0 &&
                                <>
                                    <p id = {style.accent}>*필수</p>
                                    <p>스텝플레이스와 함께할 작가님은 어떤 분이신가요?</p>
                                </>
                            }
                            <textarea onChange = {onChangeEvent} name = "writerApp1" value = {currentState[1]}/>
                        </>:
                        currentState.page === 2 ?
                        <>
                            {
                                currentState[2].length === 0 &&
                                <>
                                    <p id = {style.accent}>*필수</p>
                                    <p>작가님의 활동에 도움을 드릴 수 있는 스탭플레이스가 되고 싶습니다.</p>
                                </>
                            }
                            <textarea onChange = {onChangeEvent} name = "writerApp2" value = {currentState[2]}/>
                        </>:
                        <>
                            {
                                currentState[3].length === 0 &&
                                <p style = {{left: 10}} >선택사항) 활동했었던 또는 활동중인 sns나 홈페이지 링크를 작성해 주세요.</p>
                            }
                            <textarea onChange = {onChangeEvent} name = "writerApp3" value = {currentState[3]}/>
                        </>
                    }
                </div>
            </div>
            <div id = {style.btnBox}>
                {
                    currentState.page === 3 ?
                    <button onClick={onClickEvent} id = {style.next} name = "writerAppSubmit">제출하기</button>:
                    <button onClick={onClickEvent} id = {style.next} name = "writerAppNextPage">다음</button>
                }
            </div>
        </main>
    )
}

export default WriterAppPage