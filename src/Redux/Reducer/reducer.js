import { USER_DATA } from "../Action/action"

const initState = {
    userData: {
        account_index: null,
        feed_count: 0,
        follow: 0,
        following: 0,
        introduction: "",
        is_photographer: null,
        link_address: "",
        name: "",
        nickname: "",
        profile: null,
    },
}

const reducer = ( state = initState, action ) => {

    switch( action.type ){
        
        case USER_DATA:
            if(action.data === null || action.data === undefined){
                return{
                    ...state,
                    userData: {
                        account_index: null,
                        feed_count: 0,
                        follow: 0,
                        following: 0,
                        introduction: "",
                        is_photographer: null,
                        link_address: "",
                        name: "",
                        nickname: "",
                        profile: null,
                    }
                }
            }
            return{
                ...state,
                userData: action.data,
            }
        default:
            return state
    }
}

export default reducer