import React, { useState, useEffect } from "react"
import Main from "./Component/Main/Main"
import TopBar from "./Component/TopBar/TopBar"
import LeftBar from "./Component//LeftBar/LeftBar"
import RightBar from "./Component//RightBar/RightBar"
import Alert from "./Component/Alert/Alert"
import style from "./Public.module.scss"
import MoBar from "./Component/Mobile/MoBar"
import MoBottomMenu from "./Component/Mobile/MoBottomMenu"

const App = () => {

    return(
        <>
            <MoBar/>
            <MoBottomMenu/>
        
            <TopBar/>
            <LeftBar/>
                
            <Main/>
            <RightBar/>
            <Alert/>
        </>
    )
}

export default App;