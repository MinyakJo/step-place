import { ACTIVITY_TYPE_SELECTED } from "../Action/activityAction";

const initState = {
    activity: {
        thanksSelected: true,
        scrapSelected: false,
        commentSelected: false,
    },
}

const activityReducer = (state = initState, action) => {

    const activity = {...state.activity}

    switch(action.type){
        case ACTIVITY_TYPE_SELECTED:
            if(action.text === "activityThanks"){
                activity.thanksSelected = true
                activity.scrapSelected = false
                activity.commentSelected = false
            }else if(action.text === "activityScrap"){
                activity.thanksSelected = false
                activity.scrapSelected = true
                activity.commentSelected = false
            }else{
                activity.thanksSelected = false
                activity.scrapSelected = false
                activity.commentSelected = true
            }
            return{
                ...state,
                activity: activity
            }
        default: return state
    }
}

export default activityReducer