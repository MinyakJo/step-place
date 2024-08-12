import fetch from "../../Hooks/fetch"

export const FOOTER_GET = "FOOTER_GET"

const footerGet = () => async dispatch => {
    const data = await fetch("footer_management", "GET")
    
    dispatch({
        type: FOOTER_GET,
        data: data.data
    })
}

export { footerGet }