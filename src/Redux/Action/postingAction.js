import fetch, { anotherFetch } from "../../Hooks/fetch"
import imgCompression from 'browser-image-compression'
import { getCookie } from "../../Hooks/cookie"
import { IS_OPEN, ANOTHER_IS_OPEN } from "../Action/alertAction"

export const POSTING_DATE_INPUT = "POSTING_DATE_INPUT"
export const POSTING_WITH_WHOM_INPUT = "POSTING_WITH_WHOM_INPUT"
export const POSTING_PLACE_INPUT = "POSTING_PLACE_INPUT"
export const POSTING_TITLE_INPUT = "POSTING_TITLE_INPUT"
export const POSTING_CONTENTS_INPUT = "POSTING_CONTENTS_INPUT" 
export const POSTING_AD_INPUT = "POSTING_AD_INPUT"
export const POSTING_TRANS_INPUT = "POSTING_TRANS_INPUT"
export const POSTING_TRANS_TIME_IMPUT = "POSTING_TRANS_TIME_IMPUT"
export const POSTING_SPOT_INPUT = "POSTING_SPOT_INPUT"
export const POSTING_FEED_ADD = "POSTING_FEED_ADD"
export const POSTING_IMG_INPUT = "POSTING_IMG_INPUT"
export const POSTING_IMG_DELETE = "POSTING_IMG_DELETE"
export const POSTING_IMG_CHANGE = "POSTING_IMG_CHANGE"
export const POSTING_HASH_TAG = "POSTING_HASH_TAG" 
export const POSTING_IS_PRIVATE = "POSTING_IS_PRIVATE"
export const POSTING_RESET = "POSTING_RESET"
export const POSTING_EDIT = "POSTING_EDIT"

const postingDateInput = (text) => {
    return{
        type: POSTING_DATE_INPUT,
        text: text
    }
}

const postingWithWhomInput = (text) => {
    return{
        type: POSTING_WITH_WHOM_INPUT,
        text: text
    }
}

const postingPlaceInput = (text) => {
    return{
        type: POSTING_PLACE_INPUT,
        text: text
    }
}

const postingTitleInput = (index, text) => {
    return{
        type: POSTING_TITLE_INPUT,
        text: text,
        index: index
    }
}

const postingContentsInput = (index, text) => {
    return{
        type: POSTING_CONTENTS_INPUT,
        text: text,
        index: index
    }
}

const postingAdInput = (index, bool, canAddAd = true) => dispatch => {
    if(bool && !canAddAd){
        dispatch({
            type: IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "광고를 더 이상 등록할 수 없습니다." }
        })
    }else{
        dispatch({
            type: POSTING_AD_INPUT,
            index: index,
            bool: bool
        })
    }
}

const postingTransInput = (index, text, bool = false) => {
    return{
        type: POSTING_TRANS_INPUT,
        index: index,
        text: text,
        bool: bool
    }
}

const postingTransTimeInput = (index, text) => {
    return{
        type: POSTING_TRANS_TIME_IMPUT,
        index: index,
        text: text
    }
}

const postingSpotInput = (index, data) => dispatch => {
    if(data.name === ""){
        dispatch({
            type: ANOTHER_IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "장소를 선택해 주세요." }
        })
    }else{
        dispatch({
            type: IS_OPEN,
            data: null
        })
        dispatch({
            type: POSTING_SPOT_INPUT,
            index: index,
            data: data
        })
    }
}

const postingImgInput = (index, fileData, previewLength = 0) => async dispatch => {
    if((fileData.length + previewLength) > 8){
        dispatch({
            type:IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: { message: "사진은 8개 이상 등록할 수 없습니다." }
        })
        return
    }
    const options = { 
        maxSizeMB: 2, 
        maxWidthOrHeight: 70
    }
    const data = []
    
    for(let i = 0; i < fileData.length; i++){
        const previewImg = await imgCompression(fileData[i], options)
        data.push(await imgCompression.getDataUrlFromFile(previewImg)
        .then(result => {
            return result
        }))
    }

    dispatch({
        type: POSTING_IMG_INPUT,
        index: index,
        data: fileData,
        preview: data
    })
}

const postingImgDelete = (index, imgIndex) => {
    return{
        type: POSTING_IMG_DELETE,
        index: index,
        imgIndex: imgIndex
    }
}

const postingImgChange = (index, startIndex, dropIndex) => {
    return{
        type: POSTING_IMG_CHANGE,
        index: index,
        startIndex: startIndex,
        dropIndex: dropIndex
    }
}

const postingHashTag = (text) => {
    return{
        type: POSTING_HASH_TAG,
        text: text
    }
}

const postingIsPrivate = (bool) => {
    return{
        type: POSTING_IS_PRIVATE,
        bool: bool
    }
}

const feedUpload = (fetchData, type) => async dispatch => {
    const data = await fetch("feed", 
    type !== "edit"?"POST":"PUT",
    {
        "feed_index": fetchData.feed_index,
        "account_index": getCookie("index-token"),
        "place": fetchData.place,
        "together": fetchData.together,
        "visit_date": fetchData.visit_date,
        "is_open": fetchData.is_open,
        "hash_tag": fetchData.hash_tag,
        "feed_place": type !== "edit"? JSON.stringify(fetchData.feedData): fetchData.feedData,
        "image1": fetchData.imgDataList[0],
        "image2": fetchData.imgDataList[1],
        "image3": fetchData.imgDataList[2]
    }, 
    null,
    type !== "edit"?
    {
        "token": getCookie("access-token"),
        "Content-Type": "multipart/form-data",
    }:
    {
        "token": getCookie("access-token"),
    })
    if(data.success){
        dispatch({
            type: IS_OPEN,
            text: "postingSuccess",
            btnType: "oneBtn",
            data: { message: type !== "edit" ? "플레이스가 저장되었습니다." : "플레이스가 수정되었습니다." }
        })
    }else{
        dispatch({
            type: IS_OPEN,
            text: "message",
            btnType: "oneBtn",
            data: data
        })
    }
}
    
const postingFeedAdd = () => {
    return{
        type: POSTING_FEED_ADD
    }
}

const postingReset = () => {
    return{
        type: POSTING_RESET
    }
}

export { postingDateInput, postingWithWhomInput, postingPlaceInput,
        postingTitleInput, postingContentsInput, 
        postingAdInput, 
        postingTransInput, postingTransTimeInput, 
        postingSpotInput,
        postingImgInput, 
        postingFeedAdd, postingImgDelete, postingImgChange, postingHashTag, postingIsPrivate, feedUpload,
        postingReset }