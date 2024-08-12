import { ALERT_INPUT, ALERT_RESET, ANOTHER_IS_OPEN, IS_OPEN } from "../Action/alertAction"

const initState = {
    isOpen: false,
    type: null,
    text: "",
    alertMsg: "",
    input: {
        input: "",
        changeInput: "",
        checkInput: "",
        length: null,
        bool: false //새로적은 비밀번호 맞는지 안맞는지 체크
    },
    length: 0,
    data: null
}

const reducer = ( state = initState, action ) => {

    const input = {...state.input}

    switch( action.type ){
        case IS_OPEN:
            if(action.data === null){
                return{
                    ...state,
                    isOpen: !state.isOpen,
                    type: action.btnType,
                    text: action.text,
                    input: {
                        ...input,
                        input: "",
                        changeInput: "",
                        checkInput: "",
                        length: null
                    },
                    length: action.length
                }
            }
            return{
                ...state,
                isOpen: !state.isOpen,
                type: action.btnType,
                text: action.text,
                alertMsg: action?.data?.message,
                input: {
                    ...input,
                    input: "",
                    changeInput: "",
                    checkInput: "",
                    length: null
                },
                length: action.length,
                data: action.data
            }

        case ANOTHER_IS_OPEN:
            if(action.data === null){
                return{
                    ...state,
                    type: action.btnType,
                    text: action.text,
                    input: {
                        input: "",
                        changeInput: "",
                        checkInput: "",
                        length: action.length
                    },
                }
            }
            return{
                ...state,
                type: action.btnType,
                text: action.text,
                alertMsg: action?.data?.message,
                input: {
                    ...input,
                    input: "",
                    changeInput: "",
                    checkInput: "",
                    length: action.length
                },
                length: action.length
            }
        
        case ALERT_INPUT:
            if(action.textType === "change"){
                input.changeInput = action.input
            }else if(action.textType === "check"){
                input.checkInput = action.input
            }else{
                input.input = action.input
            }
            if(input.changeInput === input.checkInput){
                input.bool = true
            }else{
                input.bool = false
            }
            return{
                ...state,
                input: input,
            }

        case ALERT_RESET:
            return{
                ...state,
                isOpen: false,
                type: null,
                text: "",
                alertMsg: "",
                input: {
                    input: "",
                    changeInput: "",
                    checkInput: "",
                    length: null,
                    bool: false //새로적은 비밀번호 맞는지 안맞는지 체크
                },
                length: 0,
                data: null
            }
        default:
            return state
    }
}

export default reducer