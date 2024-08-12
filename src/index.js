import React from "react"
import App from "./App"
import ReactDom from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import store from "./Redux/Store/store"

const rootDom = document.getElementById("root")
ReactDom.createRoot(rootDom).render(
    <CookiesProvider>
        <BrowserRouter>
            <Provider store = {store}>
                    <App/>
            </Provider>
        </BrowserRouter>
    </CookiesProvider>
)