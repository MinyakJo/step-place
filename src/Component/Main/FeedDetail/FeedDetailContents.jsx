import React, { useState, useEffect } from "react"
import style from "./SCSS/FeedDetail.module.scss"
import SVG from "../../SVG/SVG"
import { useSelector, useDispatch } from "react-redux"
import { alertIsOpen } from "../../../Redux/Action/alertAction"

const FeedDetailContents = (props) => {

    const dispatch = useDispatch()
    const imgList = useSelector(state => state.feed.feedDetail[0])
    const data = props.data

    let img = null
    if(props.index === 0){
        img = imgList.image1
    }else if(props.index === 1){
        img = imgList.image2
    }else{
        img = imgList.image3
    }

    const [ imgLength, setImgLength ] = useState(1)
    const [ imgIndex, setImgIndex ] = useState(0)

    useEffect(() => {
        setImgLength(img.length)
        setImgIndex(0)
    }, [imgList])

    const onClickEvent = (e) => {
        switch (e.currentTarget.name) {
            case "smallNext":
                if((imgIndex + 1) !== imgLength){
                    setImgIndex(imgIndex + 1)
                }else{
                    setImgIndex(0)
                }
                break
            case "smallBack":
                if(imgIndex !== 0){
                    setImgIndex(imgIndex - 1)
                }else{
                    setImgIndex(imgLength - 1)
                }
                break
            case "imgOverlay":
                dispatch(alertIsOpen("img", "img", { src: img, index: props.index }))
                break
            default:
        }
    }

    return(
        <>
            {
                props.additional&&
                <div id = {style.transBox}>
                    <div id = {style.trans}>
                        <p id = {style.accent}>이동수단</p>
                        <SVG id = {style.shortLine} width="1" height="11" line/>
                        <p>{data?.transportation}</p>
                        <SVG id = {style.check} width="24" height="24" check/>
                        <p id = {style.accent}>이동시간</p>
                        <SVG id = {style.shortLine} width="1" height="11" line/>
                        <p>{data?.travel_time}</p>
                    </div>
                    <svg id = {style.line} width="960" height="1" viewBox="0 0 960 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="960" y2="0.5" stroke="#E8E8E8"></line>
                    </svg>
                </div>
            }
            <div id = {style.contentsBox}>
                <div id = {style.imgBox}>
                    {
                        imgLength === 1?
                        <></>:
                        imgIndex === 0?
                        <button id = {style.next} name = "smallNext" onClick = {onClickEvent}>
                            <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1145_46503)">
                                <path d="M9 29L19 19L9 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
                                </g>
                                <defs>
                                <filter id="filter0_d_1145_46503" x="0" y="0" width="28" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset/>
                                <feGaussianBlur stdDeviation="4"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1145_46503"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1145_46503" result="shape"/>
                                </filter>
                                </defs>
                            </svg>
                        </button>:
                        imgIndex === imgLength - 1?
                        <button id = {style.back} name = "smallBack" onClick = {onClickEvent}>
                            <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1145_46503)">
                                <path d="M9 29L19 19L9 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
                                </g>
                                <defs>
                                <filter id="filter0_d_1145_46503" x="0" y="0" width="28" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset/>
                                <feGaussianBlur stdDeviation="4"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1145_46503"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1145_46503" result="shape"/>
                                </filter>
                                </defs>
                            </svg>
                        </button>:
                        <>
                            <button id = {style.next} name = "smallNext" onClick = {onClickEvent}>
                                <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_1145_46503)">
                                    <path d="M9 29L19 19L9 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
                                    </g>
                                    <defs>
                                    <filter id="filter0_d_1145_46503" x="0" y="0" width="28" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="4"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1145_46503"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1145_46503" result="shape"/>
                                    </filter>
                                    </defs>
                                </svg>
                            </button>
                            <button id = {style.back} name = "smallBack" onClick = {onClickEvent}>
                                <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_1145_46503)">
                                    <path d="M9 29L19 19L9 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
                                    </g>
                                    <defs>
                                    <filter id="filter0_d_1145_46503" x="0" y="0" width="28" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="4"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1145_46503"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1145_46503" result="shape"/>
                                    </filter>
                                    </defs>
                                </svg>
                            </button>
                        </>
                    }
                    <div id = {style.img}>
                        {
                            img&&img.map((e, i) =>
                                <img 
                                    key={i}
                                    src={`${process.env.REACT_APP_URL}/${e.file_path}`}
                                    name = "imgOverlay"
                                    onClick = {onClickEvent}
                                    style = {{ 
                                        display: imgIndex === i? "flex": "none"
                                    }}
                                />
                            )
                        }
                        {
                            imgLength > 1?
                            <div id = {style.scrollBox}>
                                <div id = {style.scroll} style ={{ 
                                    width: `calc(100%/${imgLength})`,
                                    marginLeft: `calc((100% / ${imgLength}) * ${imgIndex})`
                                }}></div>
                            </div>:
                            <></>
                        }
                    </div>
                </div>
                <div id = {style.contents}>
                    <div id = {style.title}>
                        <h1>{data?.title}</h1>
                        {
                            data?.is_ad?
                            <SVG width="37" height="25" ad blue/>:
                            <></>
                        }
                    </div>
                    <div id = {style.feedIntro}>
                        <p>
                            {data?.contents}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedDetailContents