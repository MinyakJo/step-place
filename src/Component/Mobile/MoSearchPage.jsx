import React, { useEffect } from "react"
import MoTopBar from "./MoTopBar"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchSelected } from "../../Redux/Action/mobileStyleAction"
import { topBarSelected } from "../../Redux/Action/topBarAction"

const MoSearchPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(topBarSelected())
        dispatch(searchSelected(true))

        return () => { dispatch(searchSelected()) }
    }, [])


    return(
        <main>
            <MoTopBar/>
        </main>
    )
}

export default MoSearchPage