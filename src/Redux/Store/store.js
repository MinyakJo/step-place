import { createStore, combineReducers, applyMiddleware } from "redux"
import reducer from "../Reducer/reducer"
import styleReducer from "../Reducer/styleReducer"
import joinReducer from "../Reducer/joinReducer"
import loginReducer from "../Reducer/loginReducer"
import alertReducer from "../Reducer/alertReducer"
import myPageReducer from "../Reducer/myPageReducer"
import postingReducer from "../Reducer/postingReducer"
import feedReducer from "../Reducer/feedReducer"
import commentReduecer from "../Reducer/commentReducer"
import leftReducer from "../Reducer/leftBarReducer"
import thunk from "redux-thunk"
import followReducer from "../Reducer/followReducer"
import alarmReducer from "../Reducer/alarmReducer"
import footerReducer from "../Reducer/footerReducer"
import searchReducer from "../Reducer/searchReducer"
import mobileStyleReducer from "../Reducer/mobileStyelReducer"
import topBarReducer from "../Reducer/topBarReducer"
import activityReducer from "../Reducer/activityReducer"
import inquiryReducer from "../Reducer/inquiryReducer"
import writerReducer from "../Reducer/writerAppReducer"

const rootReducer = combineReducers({
    home: reducer,
    style: styleReducer,
    join: joinReducer,
    login: loginReducer,
    footer: footerReducer,
    alert: alertReducer,
    myPage: myPageReducer,
    posting: postingReducer,
    feed: feedReducer,
    comment: commentReduecer,
    left: leftReducer,
    follow: followReducer,
    alarm: alarmReducer,
    search: searchReducer,
    mobile: mobileStyleReducer,
    top: topBarReducer,
    act: activityReducer,
    inquiry: inquiryReducer,
    writer: writerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store