import React, { useEffect, useState } from "react";
import style from "./SCSS/KakaoMap.module.scss"
import Button from "../../Common/Button";
import { useDispatch } from "react-redux";
import { postingSpotInput } from "../../../Redux/Action/postingAction";
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const { kakao } = window;

const KakaoMap = (props) => {

    const dispatch = useDispatch()
    const data = props.data
    const spotList = props.spotList
    //위도, 경도
    const [ latLng, setLatLng ] = useState({ lat: 0, lng: 0 })
    //장소이름
    const [ pn, setPn ] = useState("")
    //검색창 텍스트
    const [ st, setSt ] = useState("")
    //검색결과
    const [ results, setResults ] = useState([])
    //검색박스 오픈여부
    const [ open, setOpen ] = useState(false)

    useEffect(() => {
        const container = document.getElementById("map")
        let options
        if(props.direction){
            options = {
                center: new kakao.maps.LatLng(
                    spotList[0]?.lat - (spotList[0]?.lat - spotList[1]?.lat) / 2, 
                    spotList[0]?.lng - (spotList[0]?.lng - spotList[1]?.lng) / 2, 
                ),
                level: 5
            }
        }else{
            options = {
                center: new kakao.maps.LatLng(
                    data === undefined || data.lat === null && latLng.lat === 0? 
                    37.56682194967411: 
                    data !== undefined && latLng.lat === 0?
                    data.lat:
                    latLng.lat, 
                    data === undefined || data.lng === null && latLng.lng === 0?
                     126.97864942970189: 
                     data !== undefined && latLng.lng === 0?
                     data.lng:
                     latLng.lng
                ),
                level: 5
            }
        }

        const map = new kakao.maps.Map(container, options)

        //마커생성
        let markers = []
        if(props.direction){
            for(let i = 0; i < spotList?.length; i++){
                markers.push(new kakao.maps.Marker({
                    postion: new kakao.maps.LatLng(spotList[i]?.lat, spotList[i]?.lng)
                }))
            }
        }else{
            markers.push(new kakao.maps.Marker({
                postion: map.getCenter()
            }))
        }

        //정보창 스타일 생성
        let iwContents = []

        if(props.direction){
            for(let i = 0; i < spotList?.length; i++){
                iwContents.push(`
                <div style="
                    padding: 8px;
                    padding-left: 12px;
                    padding-right: 12px;
                    display: flex;
                    height: fit-content;
                    text-align: center;
                    align-items: center;
                    box-sizing: border-box;
                    background-color: white;
                    width: 100%;
                    border-radius: 60px;
                    color: #6A6A6A;
                    font-weight: 700;
                    font-size: 6px;
                    line-height: 150%;
                    margin-top: 64px;
                    border: 3px solid #4ED0F9;
                ">
                    ${spotList[i]?.name}
                </div>`)
            }
        }else{
            iwContents.push(`
            <div style="
                padding: 8px;
                padding-left: 12px;
                padding-right: 12px;
                display: flex; 
                height: fit-content;
                text-align: center;
                align-items: center;
                box-sizing: border-box;
                background-color: white;
                width: 100%;
                border-radius: 60px;
                color: #6A6A6A;
                font-weight: 700;
                font-size: 13px;
                line-height: 150%;
                margin-top: 64px;
                border: 3px solid #4ED0F9;
            ">
                ${  
                    pn !== ""?
                    pn:
                    data !== undefined && data.name !== "" && pn === ""? 
                    data.name:
                    "좌측 상단 돋보기 버튼을 클릭해 검색을 하시고<br/>검색결과를 클릭을 하면 마커가 이동합니다."
                }
            </div>`)
        }

        //정보창 생성
        let infoWindows = []
        if(props?.direction){
            for(let i = 0; i < spotList?.length; i++){
                infoWindows.push(new kakao.maps.CustomOverlay({
                    content: iwContents[i],
                    position: new kakao.maps.LatLng(spotList[i]?.lat, spotList[i]?.lng)
                }))
            }
        }else{
            infoWindows.push(new kakao.maps.CustomOverlay({
                content: iwContents[0],
                position: map.getCenter()
            }))
        }

        //폴리라인 생성
        let lines = []
        if(props?.direction){
            for(let i = 0; i < spotList?.length - 1; i++){
                lines.push(new kakao.maps.Polyline({
                    map: map,
                    path: [ 
                        new kakao.maps.LatLng(spotList[i]?.lat, spotList[i]?.lng),
                        new kakao.maps.LatLng(spotList[i + 1]?.lat, spotList[i + 1]?.lng)
                     ],
                    strokeWeight: 6,
                    strokeColor: "#4ED0F9",
                    strokeStyle: "dashed",
                    strokeOpacity: 1,
                }))
            }
        }
        if(props?.direction){
            let longLat = 0
            let longLng = 0
            let sumLat = 0
            let sumLng = 0
            //위도 거리계산 lat
            //6371 * 1 * (Math.PI / 180)
            //경도 거리계산 lng
            //6371 * 1 * (Math.PI / 180) * Math.cos(Math.toRadians(35.8448))
            for(let i = 0; i < spotList?.length; i++){
                infoWindows[i].setMap(map)
                markers[i].setPosition(new kakao.maps.LatLng(spotList[i]?.lat, spotList[i]?.lng))
                markers[i].setMap(map)
                sumLng += spotList[i]?.lng
                sumLat += spotList[i]?.lat
                if(i < spotList?.length - 1){
                    lines[i].setMap(map)
                    let lat = (spotList[i]?.lat - spotList[i + 1]?.lat) * 6371 * 1 * (Math.PI / 180)
                    let lng = (spotList[i]?.lng - spotList[i + 1]?.lng) * 6371 * 1 * (Math.PI / 180) * Math.cos(Math.PI / 180)
                    longLat = Math.abs(longLat) > Math.abs(lat)? longLat: lat
                    longLng = Math.abs(longLng) > Math.abs(lng)? longLng: lng
                }
            }

            if(spotList?.length > 2){
                map.setCenter(new kakao.maps.LatLng(sumLat / 3, sumLng / 3))
            }else{
                map.setCenter(new kakao.maps.LatLng(sumLat / 2, sumLng / 2))
            }
            if(Math.abs(longLat) > 240 || Math.abs(longLng) > 240){
                map.setLevel(14)
            }
            else if(Math.abs(longLat) > 120 || Math.abs(longLng) > 120){
                map.setLevel(13)
            }
            else if(Math.abs(longLat) > 60 || Math.abs(longLng) > 60){
                map.setLevel(12)
            }else if(Math.abs(longLat) > 30 || Math.abs(longLng) > 30){
                map.setLevel(11)
            }else if(Math.abs(longLat) > 15 || Math.abs(longLng) > 15){
                map.setLevel(10)
            }
            else if(Math.abs(longLat) > 7 || Math.abs(longLng) > 7){
                map.setLevel(9)
            }
            else if(Math.abs(longLat) > 3.5 || Math.abs(longLng) > 3.5){
                map.setLevel(8)
            }
            else if(Math.abs(longLat) > 1.75 || Math.abs(longLng) > 1.75){
                map.setLevel(7)
            }
            else if(Math.abs(longLat) > 0.875 || Math.abs(longLng) > 0.875 ){
                map.setLevel(6)
            }
        }else{
            markers[0].setPosition(map.getCenter())
            markers[0].setMap(null)
            infoWindows[0].setMap(map)
            markers[0].setMap(map)
        }
    }, [latLng, props.spotList])

    //검색
    const ps = new kakao.maps.services.Places()

    const searchPlaces = () => {
        if (!st.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
        setResults([])
        ps.keywordSearch(st, placesSearchDB);
    }

    const placesSearchDB = (data, status, pagination) => {
        if(status === kakao.maps.services.Status.OK){
            for(let i = 0; i < data.length; i++){
                setResults(results => [...results, data[i]])
            }
            if(pagination.hasNextPage){
                pagination.nextPage()
            }
        }
    }

    //이벤트
    const onChangeEvent = (e) => {
        setSt(e.target.value)
    }

    const onClickEvent = (e, data) => {
        switch(e.currentTarget.name){
            case "search":
                searchPlaces()
                break
            case "selectAddr":
                setLatLng({ lat: parseFloat(data.lat), lng: parseFloat(data.lng) })
                setPn(data.name)
                break
            case "setLoc":
                dispatch(postingSpotInput(props.index, {
                    lat: latLng.lat,
                    lng: latLng.lng,
                    name: pn
                }))
                setSt("")
                setLatLng({ lat: 0, lng: 0 })
                setOpen(false)
                setResults([])
                setPn("")
            case "move":
                setOpen(!open)
                break
        }
    }

    return (
        <>
            {
                !props.direction &&
                <div id = {style.inputWindow} style = {{ left: open? 0: -300 }}>
                    <div id = {style.topBox}>
                        <button onClick={onClickEvent} name="move" id = {style.mapInputOpen}>
                            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="21.7895" height="2.84211" fill="#6A6A6A"/>
                                <rect y="7.57895" width="21.7895" height="2.84211" fill="#6A6A6A"/>
                                <rect y="15.1579" width="21.7895" height="2.84211" fill="#6A6A6A"/>
                            </svg>
                        </button>
                        <div id = {style.inputBox}>
                            <input onChange={onChangeEvent} placeholder="장소를 입력해주세요."/>
                            <button id = {style.search} onClick={onClickEvent} name = "search">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18.9984 18.9984L14.6484 14.6484" stroke="#4ED0F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id = {style.searchResultBox}>
                        {
                            results&&results.map((e, index) =>
                                <button onClick={(ev) => onClickEvent(ev, { lat: e.y, lng: e.x, name: e.place_name, index: index })} name = "selectAddr" id = {style.result} key = {index}>
                                    <h1 id = {style.place_name}>
                                        {e?.place_name}
                                    </h1>
                                    <div id = {style.detailBox}>
                                        <div id = {style.address}>
                                            <p>{e?.address_name}</p>
                                            {
                                                e?.road_address_name !== "" &&
                                                <p>{e?.road_address_name}</p> 
                                            }
                                        </div>
                                        <div id = {style.category}>
                                            {
                                                e?.category_group_name !== "" &&
                                                <p>{e?.category_group_name}</p>
                                            }
                                        </div>
                                        <div id = {style.pNum}>
                                            {
                                                e?.phone !== "" &&
                                                <p>{e?.phone}</p>
                                            }
                                        </div>
                                        <div id = {style.link}>
                                            <a href={e?.place_url} target="_blank">
                                                자세히 보기
                                            </a>
                                        </div>
                                    </div>
                                </button>
                            )
                        }
                    </div>
                </div>
            }
            <div id="map" style={{
                left: open && !props.direction? 300: 0,
                width: open && !props.direction? "calc(100% - 300px)": "100%",
                height: "100%",
                transition: "0.7s all"
            }}>
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
            </div>
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
        </>
    )
}

export default KakaoMap