import { FOOTER_GET } from "../Action/footerAction"

const initState = {
    footer: []
}

const footerReducer = ( state = initState, action ) => {

    const footer = [...state.footer]

    switch( action.type ){
        case FOOTER_GET:
            footer.splice(0)
            if(action.data !== null){
                footer.push(action.data)
            }
            return{
                ...state,
                footer: footer
            }
        default:
            return state
    }
}

export default footerReducer