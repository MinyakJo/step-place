import { FEED_HOVER,
         ACCOUNT_IS_PRIVATE,
         COMBOBOX_IS_OPEN } from "../Action/styleAction"

const initState = {

    feed: {
        hover: false,
    },
    
    //검색페이지
    searchPage:{
        searchFilterIsOpen: false,
        searchTypeFeedIsSelected: true,
    },

    //내 계정
    account: {
        isPrivate: false,
    },

    //콤보박스
    comboBox: {
        isOpen: false,
    }
}

const styleReducer = ( state = initState, action ) => {
    switch( action.type ){

        case FEED_HOVER:
            const hover = {...state.feed}
            hover.hover = action.bool
            return{
                ...state,
                feed: hover,
            }

        //마이페이지
        //내 계정
        case ACCOUNT_IS_PRIVATE:
            return{
                ...state,
                account: {
                    ...state.account,
                    isPrivate: !state.account.isPrivate
                }
            }

        //콤보박스
        case COMBOBOX_IS_OPEN:
            return{
                ...state,
                comboBox:{
                    ...state.comboBox,
                    isOpen: !state.comboBox.isOpen
                }
            }

        default:
            return state
    }
}

export default styleReducer