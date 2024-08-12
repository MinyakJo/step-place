import { WRITER_APP_INPUT, WRITER_APP_PAGE_COUNT } from "../Action/writerAppAction"

const initState = {
    writerApp: {
        1: "",
        2: "",
        3: "",
        page: 1,
    },
}

const writerReducer = (state = initState, action) => {

    const writerApp = {...state.writerApp}

    switch(action.type){
        case WRITER_APP_INPUT:
            if(action.textType === "1"){
                writerApp[1] = action.text
            }else if(action.textType === "2"){
                writerApp[2] = action.text
            }else if(action.textType === "3"){
                writerApp[3] = action.text
            }else{
                writerApp[1] = ""
                writerApp[2] = ""
                writerApp[3] = ""
            }
            return{
                ...state,
                writerApp: writerApp
            }
        case WRITER_APP_PAGE_COUNT:
            if(action.isReset){
                writerApp.page = 1
                return{
                    ...state,
                    writerApp: writerApp
                }
            }
            writerApp.page += 1
            return{
                ...state,
                writerApp: writerApp
            }
        default: return state
    }
}

export default writerReducer