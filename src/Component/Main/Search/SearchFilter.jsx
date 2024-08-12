import React from "react"
import style from "./SCSS/Search.module.scss"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { searchFilterSelected } from "../../../Redux/Action/searchAction"

const SearchFilter = (props) => {

    const dispatch = useDispatch()
    const filterSelected = useSelector(state => state.search.select)

    let name = ""
    let selectIndex = null
    if(props.children.title === "누구와 함께"){
        name = "searchWith"
        selectIndex = filterSelected.with
    }else if(props.children.title === "전체기간"){
        name = "searchDate"
        selectIndex = filterSelected.date
    }else if(props.children.title === "정렬기준"){
        name = "searchSort"
        selectIndex = filterSelected.sort
    }else{
        name = "searchLoc"
        selectIndex = filterSelected.loc
    }

    const onClickEvent = (e, index) => {
        dispatch(searchFilterSelected(name, index))
    }

    return(
        <div id = {style.filterType}>
            <h1>{props.children.title}</h1>
            <SVG id = {style.line} width="212" height="1" line/>
            <div id = {style.type}>
                {
                    props.children.type&&
                    props.children.type.map((element, index) => 
                        <button onClick={(e) => onClickEvent(e, index)} key={index} style = {{ color: selectIndex === index? style.mainColor: style.grey03Color }}>
                            {element}
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default SearchFilter