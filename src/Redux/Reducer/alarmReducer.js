import { ALARM_GET, RIGHT_BAR_OPEN } from "../Action/alarmAction"

const initState = {
    alarmList: [],
    dayList: [],
    weekList: [],
    monthList: [],
    restList: [],
    page: 0,
    isOpen: false
}

const alarmReducer = ( state = initState, action ) => {

    const alarmList = [...state.alarmList]
    const dayList = [...state.dayList]
    const weekList = [...state.weekList]
    const monthList = [...state.monthList]
    const restList = [...state.restList]

    switch( action.type ){
        case ALARM_GET:
            if(action.page === 0){
                alarmList.splice(0)
                dayList.splice(0)
                weekList.splice(0)
                monthList.splice(0)
                restList.splice(0)
            }
            if(action.data !== null){
                alarmList.push(action.data)

                for(let i = 0; i < action.data.today.length; i++){
                    dayList.push(action.data.today[i])
                }

                for(let i = 0; i < action.data.week.length; i++){
                    weekList.push(action.data.week[i])
                }

                for(let i = 0; i < action.data.month.length; i++){
                    monthList.push(action.data.month[i])
                }
                for(let i = 0; i < action.data.rest.length; i++){
                    restList.push(action.data.rest[i])
                }
            }
            return{
                ...state,
                alarmList: alarmList,
                dayList: dayList,
                weekList: weekList,
                monthList: monthList,
                restList: restList,
                page: action.page
            }

        case RIGHT_BAR_OPEN:
            if(action.bool){
                return{
                    ...state,
                    isOpen: true
                }
            }
            alarmList.splice(0)
            dayList.splice(0)
            weekList.splice(0)
            monthList.splice(0)
            restList.splice(0)
            return{
                ...state,
                isOpen: false,
                page: 0
            }
        default:
            return state
    }
}

export default alarmReducer