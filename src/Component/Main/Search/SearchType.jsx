import React, { useEffect } from "react"
import style from "./SCSS/Search.module.scss"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import SearchFilter from "./SearchFilter"
import { searchFilterApply, searchFilterGet, searchFilterOpen, searchTypeSelected, searchFilterSelected, searchGet } from "../../../Redux/Action/searchAction"
import { useLocation } from "react-router"

const SearchPage = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const search_input = decodeURI(location.pathname.split("/")[2])
    const filterIsOpen = useSelector(state => state.search.style.isOpen)
    const searchTypeFeedIsSelected = useSelector(state => state.search.style.isFeed)
    const withList = useSelector(state => state.search.withList)
    const locList = useSelector(state => state.search.locList)
    const dateList = useSelector(state => state.search.dateList)
    const sortList = useSelector(state => state.search.sortList)
    const length = useSelector(state => state.search.length)
    const feedListLength = Number(useSelector(state => state.feed.cnt))
    const accountListLength = useSelector(state => state.follow.searchAccountList.length)
    const select = useSelector(state => state.search.select)

    let link = ""
    if(search_input !== undefined){
        link = search_input
    }
    if(withList !== undefined){
        link += `&together=${withList[select.with]}`
    }
    if(dateList !== undefined){
        link += `&duration=${dateList[select.date]}`
    }
    if(sortList !== undefined){
        link += `&sort=${sortList[select.sort]}`
    }
    if(locList !== undefined){
        link += `&location=${locList[select.loc]}`
    }

    useEffect(() => {
        dispatch(searchFilterGet())
    }, [])

    const onClickEvent = (e) => {
        switch(e.currentTarget.name){
            case "filter":
                dispatch(searchFilterOpen(true))
                break
            case "filterCancel":
                dispatch(searchFilterOpen(false))
                break
            case "searchTypeFeed":
                dispatch(searchTypeSelected(true))
                break
            case "searchTypeAccount":
                dispatch(searchTypeSelected(false))
                break
            case "searchReset":
                dispatch(searchFilterSelected())
                break
            case "searchApply":
                dispatch(searchFilterApply(link))
                dispatch(searchFilterOpen(false))
                dispatch(searchGet(link, "advanced"))
                break
        }
    }

    return(
        <>
            {/* 필터 (평소엔 안보임) */}
            <div id = {style.filterBox} 
                style = {
                    filterIsOpen ?
                    {
                        opacity: "1",
                        height: 50 * length,
                        paddingBottom: "40px"
                    }:
                    {
                        opacity: "0",
                        height: 0,
                        paddingBottom: 0
                    }
                }>
                <div id = {style.filter} style = {
                    filterIsOpen?
                    {
                        visibility: "visible",
                    }:
                    {
                        visibility: "hidden"
                    }
                }>
                    <div id = {style.filterBtnBox}>
                        <button onClick={onClickEvent} id = {style.reset} name = "searchReset">
                            <SVG width="18" height="18" reset/>
                            초기화
                        </button>
                        <button onClick={onClickEvent} id = {style.cancel} name = "filterCancel">
                            취소
                        </button>
                        <button onClick={onClickEvent} id = {style.apply} name = "searchApply">
                            적용
                        </button>
                    </div>
                    <div id = {style.filterTypeBox}>
                        <SearchFilter>
                            {{
                                title: "누구와 함께",
                                type: withList
                            }}
                        </SearchFilter>
                        <SearchFilter>
                            {{
                                title: "전체기간",
                                type: dateList
                            }}
                        </SearchFilter>
                        <SearchFilter>
                            {{
                                title: "정렬기준",
                                type: sortList
                            }}
                        </SearchFilter>
                        <SearchFilter>
                            {{
                                title: "지역",
                                type: locList
                            }}
                        </SearchFilter>
                    </div>
                </div>
            </div>
            {/* 검색 타입 */}
            <div id = {style.searchBox} style = {
                filterIsOpen?
                {
                    visibility: "hidden",
                    opacity: "0",
                }:
                {
                    visibility: "visible",
                    opacity: "1",
                }
            }>
                <div id = {style.searchTypeBox}>
                    <button onClick={onClickEvent} id = {style.searchTypeFeed} name = "searchTypeFeed" 
                        style = {
                            searchTypeFeedIsSelected?
                            { 
                                borderBottom: "2px solid black",
                                color: style.blackColor,
                                fontWeight: 700
                            }:
                            {                                
                                borderBottom: 0,
                                color: style.greyColor,
                                fontWeight: 500
                            }
                        }>
                            피드
                        </button>
                    <button onClick={onClickEvent} id = {style.searchTypeAccount} name = "searchTypeAccount" style = {
                        !searchTypeFeedIsSelected?
                        { 
                            borderBottom: "2px solid black",
                            color: style.blackColor,
                            fontWeight: 700
                        }:
                        {                                
                            borderBottom: 0,
                            color: style.greyColor,
                            fontWeight: 500
                        }
                        }>
                            계정
                        </button>
                </div>
                <div id = {style.searchDetailBox}>
                    <div id = {style.searchResult}>
                        <p>검색 결과</p>
                        {
                            searchTypeFeedIsSelected && feedListLength > 49 || !searchTypeFeedIsSelected && accountListLength > 49?
                            <>
                                <p id = {style.result}>
                                    50+
                                </p>
                                <p>건</p>
                            </>:
                            <>
                                <p id = {style.result}>
                                    {
                                        searchTypeFeedIsSelected?
                                        feedListLength:
                                        accountListLength
                                    }
                                </p>
                                <p>건</p>
                            </>
                        }
                    </div>
                    <div id = {style.searchFilter}>
                        <button onClick={onClickEvent} id = {style.filterBtn} name = "filter" style = {
                            searchTypeFeedIsSelected?
                            { display: "flex" }: { display: "none" }
                        }>
                            <SVG width="25" height="17" filter/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage