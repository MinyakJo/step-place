import { MY_ACCOUNT_GET, MY_ACCOUNT_PUT,  NOTICE_LIST_GET, NOTICE_GET, } from "../Action/myPageAction"

const initState = {
    account: {},
    noticeList: [],
    notice: {
        notice_index: null,
        is_top_fixed: false,
        title: "",
        contents: "",
        attachment: "",
        date: ""
    },
    page: 0
}

const reducer = ( state = initState, action ) => {

    let account = {...state.account}

    switch( action.type ){
        case MY_ACCOUNT_GET:
            account = action.data.data
            return{
                ...state,
                account: account
            }
        case MY_ACCOUNT_PUT:
            account.is_disabled = action.bool
            return{
                ...state,
                account: account
            }
        case NOTICE_LIST_GET:
            const noticeList = [...state.noticeList]
            if(action.page === 0){
                noticeList.splice(0)
            }
            action.data.top_fixed_data.forEach(element => {
                noticeList.push(element)
            })
            action.data.data.forEach(element => {
                noticeList.push(element)
            })
            return{
                ...state,
                noticeList: noticeList,
                page: action.page
            }
        case NOTICE_GET:
            const notice = {...state.notice}
            const data = action.data.data
            
            notice.attachment = data.attachment
            notice.contents = data.contents
            notice.is_top_fixed = data.is_top_fixed
            notice.date = data.date
            notice.title = data.title
            notice.notice_index = data.notice_index
            return{
                ...state,
                notice: notice
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer