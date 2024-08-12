import { anotherFetch } from "../../Hooks/fetch"

export const NAVER_DIRECTION_CALL = "NAVER_DIRECTION_CALL"

const naverDirection = (spotList) => async dispatch => {

    let fetchUrl = ""
    
    if(spotList.length > 2){
        fetchUrl = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${spotList[0].lat},${spotList[0].lng}&waypoints=${spotList[1].lat},${spotList[1].lng}&goal=${spotList[2].lat},${spotList[2].lng}&option=1`
    }else{
        fetchUrl = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${spotList[0].lat},${spotList[0].lng}&goal=${spotList[1].lat},${spotList[1].lng}&option=1` 
    }

    const data = await anotherFetch(fetchUrl, "GET", null, null, 
    { 
        "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_API_KEY,
        "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_SECRET_API_KEY
    })

    dispatch({
        type: NAVER_DIRECTION_CALL,
        data: data
    })
}

export { naverDirection }