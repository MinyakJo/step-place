import { POSTING_DATE_INPUT, POSTING_WITH_WHOM_INPUT, POSTING_PLACE_INPUT, POSTING_TITLE_INPUT, 
    POSTING_CONTENTS_INPUT, POSTING_AD_INPUT, POSTING_FEED_ADD, POSTING_TRANS_INPUT, POSTING_SPOT_INPUT, 
    POSTING_IMG_INPUT, POSTING_IMG_DELETE, POSTING_TRANS_TIME_IMPUT, POSTING_HASH_TAG, POSTING_IS_PRIVATE, 
    POSTING_IMG_CHANGE, POSTING_EDIT, POSTING_RESET } from "../Action/postingAction"

const initState = {
    with: "",
    place: "",
    radioDirectInput: false,
    isPrivate: null,
    hashTag: "",
    visit_date: "",
    feed: [
        {
            title: "",
            is_ad: null,
            contents: "",
            spot: {
                lat: null,
                lng: null,
                name: "",
            },
        },
        {
            title: "",
            is_ad: null,
            contents: "",
            spot: {
                lat: null,
                lng: null,
                name: "",
            },
            transportation: "",
            travel_time: ""
        },
        {
            title: "",
            is_ad: null,
            contents: "",
            spot: {
                lat: null,
                lng: null,
                name: "",
            },
            transportation: "",
            travel_time: ""
        },
    ],
    add: false,
    preview: [[], [], []],
    img1: [],
    img2: [],
    img3: [],
    editCnt: 0,
    adCnt: 0,
}

const postingReducer = (state = initState, action) => {
    const feed = [...state.feed]
    const img1 = [...state.img1]
    const img2 = [...state.img2]
    const img3 = [...state.img3]
    let imginput = null
    let preview = null
    let adCnt = state.adCnt

    switch(action.type){
        case POSTING_RESET:
            return{
                ...state,
                with: "",
                place: "",
                radioDirectInput: false,
                isPrivate: null,
                hashTag: "",
                visit_date: "",
                feed: [
                    {
                        title: "",
                        is_ad: null,
                        contents: "",
                        spot: {
                            lat: null,
                            lng: null,
                            name: "",
                        },
                    },
                    {
                        title: "",
                        is_ad: null,
                        contents: "",
                        spot: {
                            lat: null,
                            lng: null,
                            name: "",
                        },
                        transportation: "",
                        travel_time: ""
                    },
                    {
                        title: "",
                        is_ad: null,
                        contents: "",
                        spot: {
                            lat: null,
                            lng: null,
                            name: "",
                        },
                        transportation: "",
                        travel_time: ""
                    },
                ],
                add: false,
                preview: [[], [], []],
                img1: [],
                img2: [],
                img3: [],
                editCnt: 0,
                adCnt: 0,
            }
        case POSTING_DATE_INPUT:
            return{
                ...state,
                visit_date: action.text
            }
        case POSTING_WITH_WHOM_INPUT:
            return{
                ...state,
                with: action.text
            }
        case POSTING_PLACE_INPUT:
            return{
                ...state,
                place: action.text
            }
        case POSTING_TITLE_INPUT:
            feed[action.index].title = action.text
            return{
                ...state,
                feed: feed
            }
        case POSTING_CONTENTS_INPUT:
            feed[action.index].contents = action.text
            return{
                ...state,
                feed: feed
            }
        case POSTING_AD_INPUT:
            if(feed[action.index].is_ad !== action.bool){
                if((feed[action.index].is_ad !== null) && !action.bool){
                    adCnt -= 1
                }else if(action.bool){
                    adCnt += 1
                }
            }
            feed[action.index].is_ad = action.bool
            return{
                ...state,
                feed: feed,
                adCnt: adCnt
            }
        case POSTING_TRANS_INPUT:
            if(action.text === undefined){
                return{
                    ...state,
                    radioDirectInput: false
                }
            }
            if(action.bool){
                feed[action.index].transportation = action.text
                return{
                    ...state,
                    radioDirectInput: true,
                    feed: feed
                }
            }
            feed[action.index].transportation = action.text
            return{
                ...state,
                radioDirectInput: false,
                feed: feed
            }
        case POSTING_TRANS_TIME_IMPUT:
            feed[action.index].travel_time = action.text
            return{
                ...state,
                feed: feed
            }

        case POSTING_SPOT_INPUT:
            const spot = {...feed[action.index].spot}
            spot.lat = action.data.lat
            spot.lng = action.data.lng
            spot.name = action.data.name
            feed[action.index].spot = spot
            return{
                ...state,
                feed: feed
            }
        case POSTING_IMG_INPUT:
            if(action.index === 0){
                imginput = img1
            }else if(action.index === 1){
                imginput = img2
            }else if(action.index === 2){
                imginput = img3
            }
            preview = [...state.preview]
            for(let i = 0; i < action.data.length; i++){
                imginput.push(action.data[i])
                preview[action.index].push(action.preview[i])
            }

            return{
                ...state,
                img1: img1,
                img2: img2,
                img3: img3,
                preview: preview
            }
        case POSTING_IMG_DELETE:
            if(action.index === 0){
                imginput = img1
            }else if(action.index === 1){
                imginput = img2
            }else if(action.index === 2){
                imginput = img3
            }
            preview = [...state.preview]
            imginput.splice(action.imgIndex, 1)
            preview[action.index].splice(action.imgIndex, 1)
            return{
                ...state,
                img1: img1,
                img2: img2,
                img3: img3,
                preview: preview
            }
        case POSTING_IMG_CHANGE:
            if(action.index === 0){
                imginput = img1
            }else if(action.index === 1){
                imginput = img2
            }else if(action.index === 2){
                imginput = img3
            }
            preview = [...state.preview]
            let tmp = imginput[action.startIndex]
            imginput[action.startIndex] = imginput[action.dropIndex] 
            imginput[action.dropIndex] = tmp
            tmp = preview[action.index][action.startIndex]
            preview[action.index][action.startIndex] = preview[action.index][action.dropIndex] 
            preview[action.index][action.dropIndex] = tmp
            return{
                ...state,
                img1: img1,
                img2: img2,
                img3: img3,
                preview: preview
            }
        case POSTING_FEED_ADD:
            if(state.add && feed.length === 3){
                if(feed[2].is_ad){
                    adCnt -= 1
                }
                feed.splice(2, 1, {
                    title: "",
                    is_ad: null,
                    contents: "",
                    spot: {
                        lat: null,
                        lng: null,
                        name: "",
                    },
                    transportation: "",
                    travel_time: ""
                })
            }
            return{
                ...state,
                add: !state.add,
                feed: feed,
                adCnt: adCnt,
                radioDirectInput: false
            }
        case POSTING_HASH_TAG:
            return{
                ...state,
                hashTag: action.text
            }
        case POSTING_IS_PRIVATE:
            return{
                ...state,
                isPrivate: action.bool
            }
        case POSTING_EDIT:
            let editCnt = 0
            adCnt = 0

            if(action.data === null){
                return state
            }

            for(let i = 0; i < action.data?.feed_place?.length; i++){
                feed[i].title = action.data.feed_place[i].title
                feed[i].contents = action.data.feed_place[i].contents
                feed[i].is_ad = action.data.feed_place[i].is_ad
                feed[i].spot.lat = action.data.feed_place[i].spot.lat
                feed[i].spot.lng = action.data.feed_place[i].spot.lng
                feed[i].spot.name = action.data.feed_place[i].spot.name
                if(i > 0){
                    feed[i].transportation = action.data.feed_place[i].transportation
                    feed[i].travel_time = action.data.feed_place[i].travel_time
                }
                if(feed[i].is_ad && feed[i].title !== ""){
                    adCnt += 1
                }else{
                    adCnt -= 1
                }

                if(feed[i].title !== ""){
                    editCnt += 1
                }
            }
            return{
                ...state,
                with: action.data.together,
                visit_date: action.data.visit_date,
                hashTag: action.data.hash_tag,
                place: action.data.place,
                isPrivate: action.data.is_open,
                feed: feed,
                add: editCnt === 3? true: false,
                editCnt: editCnt,
                adCnt: adCnt
            }
        default: 
        return{
            ...state,
            feed: feed
        }
    }
}

export default postingReducer