import React from "react"
import style from "./SCSS/MoSearchFilter.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { filterSelected } from "../../Redux/Action/mobileStyleAction"
import { searchFilterApply, searchFilterGet, searchFilterOpen, searchFilterSelected, searchGet } from "../../Redux/Action/searchAction"
import { useLocation, useNavigate } from "react-router-dom"

const MoSearchFilter = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const search_input = decodeURI(location.pathname.split("/")[2])
    const fSelect = useSelector(state => state.mobile.filterSelect)
    const withList = useSelector(state => state.search.withList)
    const locList = useSelector(state => state.search.locList)
    const dateList = useSelector(state => state.search.dateList)
    const sortList = useSelector(state => state.search.sortList)
    const searchInput = useSelector(state => state.search.searchInput)
    const nowSelect = useSelector(state => state.search.select)

    let link = ""
    if(search_input !== undefined){
        link = search_input
    }
    if(withList !== undefined){
        link += `&together=${withList[nowSelect.with]}`
    }
    if(dateList !== undefined){
        link += `&duration=${dateList[nowSelect.date]}`
    }
    if(sortList !== undefined){
        link += `&sort=${sortList[nowSelect.sort]}`
    }
    if(locList !== undefined){
        link += `&location=${locList[nowSelect.loc]}`
    }

    const onClickEvent = (e, index = null) => {
        const name = e.currentTarget.name
        switch(name){
            case "search":
                dispatch(filterSelected())
                dispatch(searchFilterSelected())
                navigate(`/search/${searchInput}`)
                break
            case "cancel":
                dispatch(searchInput())
                break
            case "more":
                dispatch(filterSelected(true))
                dispatch(searchFilterGet())
                break
            case "filterCancel":
                if(!nowSelect.apply){
                    dispatch(searchFilterSelected())
                }
                dispatch(filterSelected())
                dispatch(searchFilterOpen(false))
                break
            case "searchReset":
                dispatch(searchFilterSelected())
                break
            case "searchApply":
                dispatch(searchFilterApply(link))
                dispatch(searchFilterOpen(false))
                dispatch(filterSelected())
                dispatch(searchGet(link, "advanced"))
                break
            case "searchWith":
            case "searchDate":
            case "searchSort":
            case "searchLoc":
                dispatch(searchFilterSelected(name, index))
                break
            default:
        }
    }

    return(
        <div id = {style.filterBox} style = {{ right: fSelect? 0 : "-100%" }}>
            <div id = {style.filterTop}>
                <div id = {style.left}>
                    <button id = {style.fCancel} name = "filterCancel" onClick={onClickEvent}>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <p>검색필터</p>
                </div>
                <div id = {style.right}>
                    <button id = {style.fReset} name = "searchReset" onClick={onClickEvent}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1242_50234)">
                                <path d="M0.666748 3.16663V7.16663H4.66675" stroke="#B0ABB5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.34008 10.5C2.77234 11.7269 3.59164 12.7801 4.67452 13.5009C5.7574 14.2217 7.0452 14.5711 8.34389 14.4963C9.64258 14.4216 10.8818 13.9268 11.8748 13.0865C12.8679 12.2462 13.5609 11.106 13.8496 9.83758C14.1382 8.56917 14.0068 7.24131 13.4752 6.05407C12.9435 4.86684 12.0404 3.88454 10.902 3.25518C9.76351 2.62583 8.45135 2.38352 7.1632 2.56475C5.87505 2.74599 4.68069 3.34095 3.76008 4.26001L0.666748 7.16667" stroke="#B0ABB5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1242_50234">
                                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p>초기화</p>
                    </button>
                    <button id = {style.app} name = "searchApply" onClick={onClickEvent}>
                        적용하기
                    </button>
                </div>
            </div> 
            <div id = {style.filterBottom}>
                <div id = {style.typeBox}>
                    <div id = {style.title}>
                        <h1>누구와함께</h1>
                    </div>
                    {
                        withList&&withList.map((e, index) =>
                            <button name = "searchWith" key = {index} id = {style.text} style = {{ color: nowSelect.with === index? style.mainColor: style.greyColor }} onClick = {(e) => onClickEvent(e, index)}>
                                <p>{e}</p>
                            </button>
                        )
                    }
                </div>
                <div id = {style.ampty}></div>
                <div id = {style.typeBox}>
                    <div id = {style.title}>
                        <h1>전체기간</h1>
                    </div>
                    {
                        dateList&&dateList.map((e, index) =>
                            <button id = {style.text} name = "searchDate" onClick = {(e) => onClickEvent(e, index)} style = {{ color: nowSelect.date === index? style.mainColor: style.greyColor }}>
                                <p>{e}</p>
                            </button>
                        )
                    }
                </div>
                <div id = {style.ampty}></div>
                <div id = {style.typeBox}>
                    <div id = {style.title}>
                        <h1>정렬기준</h1>
                    </div>
                    {
                        sortList&&sortList.map((e, index) =>
                            <button id = {style.text} name = "searchSort" onClick = {(e) => onClickEvent(e, index)} style = {{ color: nowSelect.sort === index? style.mainColor: style.greyColor }}>
                                <p>{e}</p>
                            </button>   
                        )
                    }
                </div>
                <div id = {style.typeBox}>
                    <div id = {style.title}>
                        <h1>지역</h1>
                    </div>
                    {
                        locList&&locList.map((e, index) =>
                            <button name = "searchLoc" key = {index} id = {style.text} onClick = {(e) => onClickEvent(e, index)} style = {{ color: nowSelect.loc === index? style.mainColor: style.greyColor }}>
                                <p>{e}</p>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MoSearchFilter