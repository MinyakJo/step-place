import { INQUIRY_ADD, INQUIRY_CHECK, INQUIRY_CHECK_GET, INQUIRY_DELETE, INQUIRY_INPUT, INQUIRY_RESET } from "../Action/inquiryAction"

const initState = {
    file: {
        data: [],
        size: null
    },
    inquiry: {
        title: "",
        contents: "",
        length: 0,
        checkList: [],
        check: false
    },
}

const reducer = ( state = initState, action ) => {

    const file = {...state.file}
    const inquiry = {...state.inquiry}

    switch( action.type ){
        case INQUIRY_RESET:
            return{
                ...state,
                inquiry: {
                    title: "",
                    contents: "",
                    check: 0,
                    length: 0,
                    checkList: [],
                },
                file: {
                    data: [],
                    size: null
                },
            }
        case INQUIRY_ADD:
            file.data.push(action.data)
            file.size += action.data.size
            return{
                ...state,
                file: file
            }
        case INQUIRY_DELETE:
            file.size -= file.data[action.index].size
            file.data.splice(action.index, 1)
            return{
                ...state,
                file:file
            }
        case INQUIRY_INPUT:
            if(action.textType === "title"){
                inquiry.title = action.text
            }else{
                inquiry.contents = action.text
            }
            return{
                ...state,
                inquiry: inquiry
            }
        case INQUIRY_CHECK:
            if(action.check){
                return{
                    ...state,
                    check: action.check,
                }
            }
            return{
                ...state,
                check: false,
            }
        case INQUIRY_CHECK_GET:
            for(let i = 0; i < action?.data?.length; i++){
                inquiry.checkList.push(false)
            }
            return{
                ...state,
                inquiry: inquiry
            }
    default:
        return {
            ...state
        }
    }
}

export default reducer