import React, { useState } from "react";
import { GoogleMap,LoadScript, MarkerF, StandaloneSearchBox, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux"
import { postingSpotInput } from "../../../Redux/Action/postingAction";

const FeedMap = (props) => {

    // const key = process.env.REACT_APP_GOOGLE_API_KEY
    // const dispatch = useDispatch()
    // const [ searchBox, setSearchBox ] = useState(null)

    // let index
    // if(props.first){
    //     index=0
    // }else if(props.second){
    //     index=1
    // }else{
    //     index=2
    // }
    // let start = {
    //     lat: null,
    //     lng: null
    // }
    // let center = {
    //     lat: null,
    //     lng: null,
    // }
    // let end = {
    //     lat: null,
    //     lng: null,
    // }
    // let mapCenter = {
    //     lat: null,
    //     lng: null
    // }

    // //클릭시 마커 생성
    // const spot = useSelector(state => state.posting?.feed[index]?.spot)

    // if((spot?.lat === undefined || spot?.lat === null) && (spot?.lng === undefined || spot?.lng === null)){
    //     center.lat = 37.5666805
    //     center.lng = 126.9784147
    // }else{
    //     center.lat = spot?.lat
    //     center.lng = spot?.lng
    // }

    // const onClickEvent = (e) => {
    //     center.lat = e.latLng.lat()
    //     center.lng = e.latLng.lng()
    //     if(props.first){
    //         dispatch(postingSpotInput(0, center))
    //     }else if(props.second){
    //         dispatch(postingSpotInput(1, center))
    //     }else{
    //         dispatch(postingSpotInput(2, center))
    //     }
        
    // }

    // //검색박스
    // const searchBoxLoad = (e) => {
    //     setSearchBox(e)
    // }
    // const onPlaceChangedEvent = () => {
    //     center.lat = searchBox.getPlaces()[0].geometry.location.lat()
    //     center.lng = searchBox.getPlaces()[0].geometry.location.lng()
    //     if(props.first){
    //         dispatch(postingSpotInput(0, center))
    //     }else if(props.second){
    //         dispatch(postingSpotInput(1, center))
    //     }else{
    //         dispatch(postingSpotInput(2, center))
    //     }
    // }

    return (
        <></>
    //     <LoadScript googleMapsApiKey={key} libraries={["places"]}>
    //         <GoogleMap
    //             mapContainerStyle={{width: "100%", height: "100%", borderRadius: "10px"}}
    //             center = {center}
    //             zoom={13}
    //             onClick = {props.direction? false : onClickEvent}
    //         >   
    //             <StandaloneSearchBox onLoad = {searchBoxLoad} onPlacesChanged = {onPlaceChangedEvent}>
    //                 <input type="text"/>
    //             </StandaloneSearchBox>
    //             <MarkerF position = {center}/>
    //         </GoogleMap>
    //   </LoadScript>
    )
}

export default FeedMap