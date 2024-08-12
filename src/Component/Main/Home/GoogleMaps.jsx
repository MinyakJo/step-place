import React, { useEffect, useState } from "react";
import { GoogleMap,LoadScript, MarkerF, StandaloneSearchBox, Polyline, InfoWindow, OverlayView  } from '@react-google-maps/api';
import style from "./SCSS/KakaoMap.module.scss"
import Button from "../../Common/Button";
import { useDispatch } from "react-redux";
import { postingSpotInput } from "../../../Redux/Action/postingAction"
import markerImg from "../../SVG/marker.svg"

const GoogleMaps = (props) => {
    
    const key = process.env.REACT_APP_GOOGLE_API_KEY

    const dispatch = useDispatch()
    const data = props.data
    const spotList = props.spotList
    //위도, 경도
    const [ latLng, setLatLng ] = useState({ lat: 0, lng: 0 })
    //장소이름
    const [ pn, setPn ] = useState("")
    //검색결과
    const [ results, setResults ] = useState([])
    //검색박스 오픈여부
    const [ open, setOpen ] = useState(false)
    const [ searchBox, setSearchBox ] = useState(null)
    const [ zoom, setZoom ] = useState(13)
    const [ first, setFirst ] = useState(
        spotList !== undefined ?
        { lat: spotList[0]?.lat, lng: spotList[0]?.lng}:
        { lat: 37.5666805, lng: 126.9784147 })
    const [ second, setSecond ] = useState(
        spotList !== undefined ?
        { lat: spotList[1]?.lat, lng: spotList[1]?.lng}:
        { lat: 37.5666805, lng: 126.9784147 }
    )
    const [ third, setThird ] = useState(
        spotList !== undefined && spotList?.length > 2?
        { lat: spotList[2]?.lat, lng: spotList[2]?.lng}:
        { lat: 37.5666805, lng: 126.9784147 })
    const [ center, setCenter ] = useState(
        spotList !== undefined?
        spotList?.length > 2?
        { lat: (first.lat + second.lat + third.lat) / 3, lng: (first.lng + second.lng + third.lng) / 3 }:
        { lat: (first.lat + second.lat) / 2, lng: (first.lng + second.lng) / 2 }:
        { lat: 37.5666805, lng: 126.9784147 }
    )

    const polyOptions = {
        strokeColor: "#4ED0F9",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: "#4ED0F9",
        fillOpacity: 1.0,
        visible: true,
        paths: spotList?.length > 2 ? 
        [ first, second, third ]:
        [ first, second ],
        zIndex: 1,
    }
    const infoStyle = {
        position: "relative",
        padding: 4,
        paddingLeft: 6,
        paddingRight: 6,
        display: "flex",
        flexDiretion: "row",
        height: "fit-content",
        textAlign: "center",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: "white",
        width: "fit-content",
        borderRadius: 60,
        color: "#6A6A6A",
        fontWeight: 700,
        fontSize: 12,
        top: 0,
        left: "-50%",
        lineHeight: "150%",
        border: "2px solid #4ED0F9",
        zIndex: 1,
    }
    
    useEffect(() => {
        if(props.direction){
            if(spotList === undefined){
                setLatLng({ lat: 37.5666805, lng: 126.9784147 })
            }else{
                setFirst({ lat: spotList[0]?.lat, lng: spotList[0]?.lng})
                setSecond({ lat: spotList[1]?.lat, lng: spotList[1]?.lng})
                if(spotList?.length > 2){
                    setThird({ lat: spotList[2]?.lat, lng: spotList[2]?.lng})
                    setCenter({ lat: (spotList[0]?.lat + spotList[1]?.lat + spotList[2].lat) / 3, lng: (spotList[0].lng + spotList[1].lng + spotList[2].lng) / 3 })
                }else{
                    setCenter({ lat: (spotList[0]?.lat + spotList[1]?.lat) / 2, lng: (spotList[0]?.lng + spotList[1]?.lng) / 2 })
                }

                let longLat = 0
                let longLng = 0
                let sumLat = 0
                let sumLng = 0
                //위도 거리계산 lat
                //6371 * 1 * (Math.PI / 180)
                //경도 거리계산 lng
                //6371 * 1 * (Math.PI / 180) * Math.cos(Math.toRadians(35.8448))
                for(let i = 0; i < spotList?.length; i++){
                    sumLng += spotList[i]?.lng
                    sumLat += spotList[i]?.lat
                    if(i < spotList?.length - 1){
                        let lat = (spotList[i]?.lat - spotList[i + 1]?.lat) * 6371 * 1 * (Math.PI / 180)
                        let lng = (spotList[i]?.lng - spotList[i + 1]?.lng) * 6371 * 1 * (Math.PI / 180) * Math.cos(Math.PI / 180)
                        longLat = Math.abs(longLat) > Math.abs(lat)? longLat: lat
                        longLng = Math.abs(longLng) > Math.abs(lng)? longLng: lng
                    }
                }
                if(Math.abs(longLat) > 7680 || Math.abs(longLng) > 7680){
                    setZoom(1)
                }
                else if(Math.abs(longLat) > 3840 || Math.abs(longLng) > 3840){
                    setZoom(2)
                }
                else if(Math.abs(longLat) > 1920 || Math.abs(longLng) > 1920){
                    setZoom(3)
                }
                else if(Math.abs(longLat) > 960 || Math.abs(longLng) > 960){
                    setZoom(4)
                }
                else if(Math.abs(longLat) > 480 || Math.abs(longLng) > 480){
                    setZoom(5)
                }
                else if(Math.abs(longLat) > 240 || Math.abs(longLng) > 240){
                    setZoom(6)
                }
                else if(Math.abs(longLat) > 120 || Math.abs(longLng) > 120){
                    setZoom(7)
                }
                else if(Math.abs(longLat) > 60 || Math.abs(longLng) > 60){
                    setZoom(8)
                }else if(Math.abs(longLat) > 30 || Math.abs(longLng) > 30){
                    setZoom(9)
                }else if(Math.abs(longLat) > 15 || Math.abs(longLng) > 15){
                    setZoom(10)
                }
                else if(Math.abs(longLat) > 7 || Math.abs(longLng) > 7){
                    setZoom(11)
                }
                else if(Math.abs(longLat) > 3.5 || Math.abs(longLng) > 3.5){
                    setZoom(12)
                }
                else if(Math.abs(longLat) > 1.75 || Math.abs(longLng) > 1.75){
                    setZoom(13)
                }
                else if(Math.abs(longLat) > 0.875 || Math.abs(longLng) > 0.875 ){
                    setZoom(14)
                }else{
                    setZoom(15)
                }
            }
        }else{
            if(data.lat === null){
                setLatLng({ lat: 37.5666805, lng: 126.9784147})
            }else{
                setLatLng({ lat: data?.lat, lng: data?.lng})
            }
        }
    }, [props, zoom])

    const onClickEvent = (e, data) => {
        switch(e.currentTarget.name){
            case "search":
                onPlaceChangedEvent()
                break
            case "selectAddr":
                setLatLng({ lat: parseFloat(data.lat), lng: parseFloat(data.lng) })
                setPn(data.name)
                setOpen(false)
                break
            case "setLoc":
                dispatch(postingSpotInput(props.index, {
                    lat: latLng.lat,
                    lng: latLng.lng,
                    name: pn
                }))
                setLatLng({ lat: 0, lng: 0 })
                setOpen(false)
                setResults([])
                setPn("")
            case "move":
                setOpen(!open)
                break
        }
    }

    //검색박스
    const searchBoxLoad = (e) => {
        setSearchBox(e)
        console.log(searchBox)
    }
    const onPlaceChangedEvent = () => {
        setResults(searchBox.getPlaces())
        console.log(results)
    }
    return(
        <LoadScript googleMapsApiKey={key} libraries = {["drawing","places"]}>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center = {props.direction? center: latLng}
                zoom={zoom}
            >   
                {
                    !props.direction &&
                    <div id = {style.inputWindow} style = {{ left: open? 0: "-100%" }}>
                        <div id = {style.topBox}>
                            <button onClick={onClickEvent} name="move" id = {style.mapInputOpen}>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.125 21.75L10.875 14.5L18.125 7.25" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div id = {style.inputBox}>
                                <StandaloneSearchBox id = {style.input} onLoad = {searchBoxLoad} onPlacesChanged = {onPlaceChangedEvent}>
                                    <input type="text"/>
                                </StandaloneSearchBox>
                                {/* <button id = {style.search} onClick={onClickEvent} name = "search">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M18.9984 18.9984L14.6484 14.6484" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                        <div id = {style.searchResultBox}>
                            {
                                results&&results.map((e, index) =>
                                    <button onClick={(ev) => onClickEvent(ev, { lat: e.geometry.location.lat(), lng: e.geometry.location.lng(), name: e.name })} name = "selectAddr" id = {style.result} key = {index}>
                                        <h1 id = {style.place_name}>
                                            {e?.name}
                                        </h1>
                                        <div id = {style.detailBox}>
                                            <div id = {style.address}>
                                                <p>{e?.formatted_address}</p>
                                            </div>
                                            {/* <div id = {style.link}>
                                                <a href={e?.url} target="_blank">
                                                    자세히 보기
                                                </a>
                                            </div> */}
                                        </div>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                }
                {
                    !props.direction &&
                    <div id = {style.searchOpen} style ={{
                        left: open? -50: 0
                    }}>
                        <button onClick={onClickEvent} name = "move">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.9984 18.9984L14.6484 14.6484" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                }
                {
                    !props.direction?
                    <MarkerF position = {latLng} icon = {{url: markerImg, scale: 5}}>
                        <OverlayView position = {latLng} mapPaneName = {"overlayMouseTarget"} containerStyle = {{left: 0}}>
                            <div id = "spotGuide" style = {infoStyle}>   
                                {  
                                    pn !== ""?
                                    pn:
                                    data !== undefined && data.name !== "" && pn === ""? 
                                    data.name:
                                    <>
                                        장소 검색은 좌측 상단의 돋보기 버튼
                                    </>
                                }
                            </div>
                        </OverlayView>
                    </MarkerF>:
                    <>
                        <MarkerF position = {first} icon = {{url: markerImg, scale: 5}}>
                            <OverlayView position = {first} mapPaneName = {"overlayMouseTarget"} containerStyle = {{left: 0}}>
                                <div id = "spotGuide" style = {infoStyle}>   
                                    {spotList[0].name}
                                </div>
                            </OverlayView>
                        </MarkerF>
                        <MarkerF position = {second} icon = {{url: markerImg, scale: 5}}>
                            <OverlayView position = {second} mapPaneName = {"overlayMouseTarget"}>
                                <div id = "spotGuide" style = {infoStyle}>   
                                    {spotList[1].name}
                                </div>
                            </OverlayView>
                        </MarkerF>
                        {
                            spotList?.length > 2 &&
                            <MarkerF position = {third} icon = {{url: markerImg, scale: 5}}>
                                <OverlayView position = {third} mapPaneName = {"overlayMouseTarget"}>
                                    <div id = "spotGuide" style = {infoStyle}>   
                                        {spotList[2].name}
                                    </div>
                                </OverlayView>    
                            </MarkerF>
                        }
                        <Polyline path = {
                                spotList?.length > 2?
                                [ first, second, third ]:
                                [ first, second ]
                            }
                            options = {polyOptions}
                        />
                    </>
                }
            </GoogleMap>
            {
                !props.direction &&
                <div id = {style.btnBox}>
                    <button name = "setLoc" onClick = {onClickEvent} id = {style.mapLatLngSubmit}>
                        확인
                    </button>
                    <Button name = "overlay">
                        취소
                    </Button>
                </div>
            }
        </LoadScript>
    )
}

export default GoogleMaps