import React, { useEffect, useState } from "react"
import style from "./SCSS/Alert.module.scss"
import Button from "../Common/Button"
import { useSelector, useDispatch } from "react-redux"
import Input from "../Common/Input"
import GoogleMaps from "../Main/Home/GoogleMaps"

const Alert = () => {

    const alertState = useSelector(state => state.alert)
    const textState = alertState.text
    const inputState = alertState.input
    const typeState = alertState.type

    let overlayStyle = {
        display: "flex"
    }

    if(alertState.isOpen){
        overlayStyle.display = "flex"
    }else{
        overlayStyle.display = "none"
    }

    const [ imgLength, setImgLength ] = useState(0)
    const [ imgIndex, setImgIndex ] = useState(0)

    useEffect(() => {
        setImgLength(alertState.data?.src?.length)
        setImgIndex(0)
    }, [alertState.data?.src])

    const onClickEvent = (e) => {
        switch (e.currentTarget.name) {
            case "imgNext":
                if((imgIndex + 1) !== imgLength){
                    setImgIndex(imgIndex + 1)
                }
                break
            case "imgBack":
                if(imgIndex !== 0){
                    setImgIndex(imgIndex - 1)
                }
                break
            default:
        }
    }

    return(
        <div id = {style.background} style = {overlayStyle}>
            <Button id = {style.overlay}></Button>
            {
                // 버튼이 하나인 알람창
                typeState === "oneBtn"?
                <div id = {style.oneBtnAlertBox}>
                    <div id = {style.textBox}>
                        {
                            textState === "login"? //로그인
                            <p>로그인이 필요합니다.</p>:
                            textState === "nickname"? //닉네임 변경
                            <p>1개월 후에 다시 닉네임을 변경할 수 있습니다.</p>:
                            textState === "inquiryNoMem"?
                            <>
                                <p id = {style.alertMsg}>{alertState?.alertMsg}</p>
                                <p id = {style.accent}>
                                    요청시 현재
                                    <div id = {style.spanBox}>
                                        <span>이름,</span>
                                        <span>생년월일,</span>
                                        <span>닉네임</span>
                                    </div>
                                    을 입력해 주세요.
                                </p>
                            </>:
                            <p>{alertState?.alertMsg}</p>
                        }
                    </div>
                    <div id = {style.btnBox}>
                        {
                            textState === "login" || textState === "joinSuccess"?
                            <Button name = "overlay" value = "/login" link>확인</Button>: //로그인창으로 이동
                            textState === "postingSuccess" || textState === "inquiry" || textState === "home"?
                            <Button name = "overlay" value = "/" link>확인</Button>:
                            textState === "forgotCodeSuccess"?
                            <Button value = "/pwCodeSuccess">확인</Button>:
                            textState === "inquiryNoMem"?
                            <Button name = "overlay" value = "/inquiry/noMember" link>확인</Button>:
                            textState === "writerApp" || textState === "writerAppFalse" || textState === "forgotPwSuccess"?
                            <Button name = {textState}>확인</Button>:
                            <Button name = "overlay">확인</Button>
                        }
                    </div>
                </div>:
                //버튼이 두개인 알람창
                typeState === "twoBtn"?
                    <div id = {style.twoBtnAlertBox}>
                        {
                            textState === "writerApp"&&
                            <>
                                <svg id = {style.feather} width="167" height="101" viewBox="0 0 167 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M150.465 8.83592C149.602 10.2249 148.714 11.609 147.796 12.9862L147.796 12.9876C143.307 15.5794 137.398 18.3053 132.387 18.6346C136.681 18.3514 141.062 17.9379 145.08 16.9182C144.209 18.132 143.311 19.3395 142.385 20.537C140.882 20.8534 139.354 21.116 137.811 21.3244C138.658 21.8663 139.848 22.181 141.07 22.2081C137.457 26.7169 133.413 31.0868 128.802 35.2301C128.015 35.9382 127.211 36.6396 126.388 37.3335L126.388 37.3348C114.134 40.999 100.828 43.0081 87.6261 44.9473C98.9495 44.9503 110.347 43.7551 121.211 41.4289C118.403 43.5095 115.425 45.4983 112.282 47.3691L112.283 47.3704C111.437 47.5514 110.697 47.7118 110.227 47.7737C105.908 48.3539 97.65 49.7 93.4576 48.6984C97.627 49.6956 102.028 50.3275 106.507 50.571C102.846 52.4579 91.6791 61.2419 66.1895 69.6792C58.2079 72.32 51.6745 73.1247 42.8376 72.2174C41.8383 72.1151 40.8103 71.9896 39.7475 71.8439C39.4894 71.8084 39.2288 71.7715 38.9659 71.7338C38.8459 71.4591 38.7378 71.184 38.6416 70.9064C37.4785 67.6087 37.7953 64.0604 38.9682 60.5335C39.9523 61.0142 41.073 61.402 42.1831 61.7661C40.6599 61.2649 40.0755 60.1322 39.5164 59.0362C39.9136 58.0422 40.3709 57.0545 40.877 56.0763C41.8766 57.6293 43.3476 59.0412 44.8047 60.438C43.4173 58.2845 42.755 56.1222 42.0854 53.9007L42.085 53.8994C43.4889 51.536 45.1173 49.2718 46.7571 47.199C48.0235 45.5964 49.4016 44.0277 50.8822 42.4984C52.5484 43.9682 55.981 45.2815 56.9417 46.0838C55.4649 44.7576 54.2762 43.2932 53.4235 41.7514C53.2973 41.524 53.1042 41.0315 52.8337 40.5591C53.9815 39.4601 55.1815 38.3851 56.4316 37.3296C56.4519 40.4638 57.2391 43.5772 58.755 46.522C58.2645 42.6866 59.1088 38.898 59.1855 35.1037C63.7774 31.5399 68.9284 28.2623 74.4793 25.3185C76.3775 24.3127 78.3154 23.3447 80.2927 22.4112C82.59 21.5056 83.8605 20.694 86.6241 19.5974C92.5913 17.0962 98.843 14.8838 105.291 12.9151C105.008 13.2389 104.767 13.5326 104.574 13.7773C101.982 17.1078 100.787 20.7722 99.8253 24.4018C102.735 19.611 106.727 15.4537 110.945 11.2619C112.198 10.9123 113.456 10.5701 114.719 10.2367C113.783 11.6574 113.292 13.2475 113.179 14.3901C113.409 12.7996 116.383 10.7864 119.016 9.13939C122.164 8.35968 125.342 7.62818 128.54 6.93977C126.517 8.57455 125.167 10.5057 123.847 12.4064C125.556 10.5771 127.661 8.89244 130.068 7.4062C130.856 6.92105 131.768 6.48631 132.707 6.06644L132.708 6.06609C135.875 5.42329 139.057 4.81858 142.244 4.2503C145.446 3.67881 149.734 3.42454 151.085 5.29987C151.869 6.38806 151.176 7.68966 150.465 8.83592V8.83592Z" fill="#D9F6FF"/>
                                    <path d="M115.426 22.8053C96.1687 30.8683 84.704 39.5629 66.6546 52.2409C58.1948 58.1838 51.1971 63.6296 42.8387 72.2152C41.8394 72.1129 40.8114 71.9874 39.7485 71.8417C39.8079 71.7725 39.8647 71.7039 39.9235 71.6326C44.0917 66.5714 48.915 61.7167 54.3075 57.1258C65.1885 47.8622 78.385 39.6684 93.2221 32.9906C101.542 29.2467 106.206 25.5117 115.426 22.8047L115.426 22.8053Z" fill="#83E1FF"/>
                                    <path d="M119.52 21.0625C100.262 29.1256 84.6249 37.3532 66.5757 50.0319C50.9821 60.9859 40.356 70.25 17.0242 100.598C36.1327 72.4272 37.8839 71.8056 39.8441 69.4244C44.0121 64.3625 48.836 59.5076 54.2272 54.9171C65.1088 45.6527 78.3042 37.4605 93.1427 30.7824C101.462 27.0385 110.3 23.7703 119.519 21.0627L119.52 21.0625Z" fill="#4ED0F9"/>
                                </svg>
                            </>
                        }
                        <div id = {style.textBox}>
                            {
                                textState === "nickname"?
                                <>
                                    <p>1개월 후에 다시 닉네임을 변경할 수 있습니다.</p>
                                </>:
                                textState === "accountCancelMem"?
                                <p>회원탈퇴 하시겠습니까?</p>:
                                textState === "writerApp"?
                                <>
                                    <p>스텝플레이스에서는</p>
                                    <p>작가 분들만 글을 작성할 수 있습니다.</p>
                                    <p>작가신청을 하시겠습니까?</p>
                                </>:
                                textState === "logout"?
                                <p>스텝플레이스를 로그아웃 하시겠습니까?</p>:
                                <p>{alertState?.alertMsg}</p>
                            }
                        </div>
                        <div id = {style.btnBox}>
                            {
                                 textState === "nickname"?
                                 <Button name = "nicknameEditInput" nickname = {inputState?.input}>네</Button>:
                                 textState === "accountCancelMem"?
                                 <Button name = "accountCancelMem">네</Button>:
                                 textState === "writerApp"?
                                 <Button value = "/writerApp" name = "writerAppMove" link>네</Button>:
                                 textState === "logout"?
                                 <Button name = {textState} value = "/" link>네</Button>:
                                 textState === "reCommentDelete" || textState === "reCommentReport"?
                                 <Button name = {textState} data = {alertState?.data} type = {true}>네</Button>:
                                 textState === "feedDelete" || textState === "feedReport"?
                                 <Button name = {textState} value = "/" data = {alertState.data} link>네</Button>:
                                 <Button name = {textState} data = {alertState?.data}>네</Button>
                            }
                            {
                                textState === "logout"?
                                <Button name = "overlay">취소</Button>:
                                <Button name = "overlay">아니오</Button>
                            }
                        </div>
                    </div>:
                //텍스트가 있는 알람창
                typeState === "inputOneBtn"?
                    <div id = {style.inputOneBtnAlertBox}>
                        <div id = {style.titleBox}>
                            {
                                textState === "nicknameInput"?
                                <h1>닉네임</h1>:
                                textState === "accountAddrInput"?
                                <h1>주소</h1>:
                                textState === "accountPwInput"?
                                <h1>비밀번호 변경</h1>:
                                textState === "accountIntroInput"?
                                <h1>자기소개</h1>:
                                textState === "accountLinkInput"?
                                <h1>링크</h1>:
                                <></>
                            }
                        </div>
                        {
                            textState === "accountPwInput"?
                            <div id = {style.pwInputBox}>
                                <Input type = "password" name = "alertInput" placeholder="현재 비밀번호를 입력해주세요." maxLength = {inputState?.length}>
                                    {inputState?.input}
                                </Input>
                                <Input type = "password" name = "alertChangeInput" placeholder="새 비밀번호를 입력해주세요." maxLength = {inputState?.length}>
                                    {inputState?.changeInput}
                                </Input>
                                <Input type = "password" name = "alertCheckInput" placeholder="새 비밀번호를 다시 입력해주세요." maxLength = {inputState?.length}>
                                    {inputState?.checkInput}
                                </Input>
                            </div>:
                            textState === "accountAddrInput"?
                            <div id = {style.addrInputBox}>
                                <p>stepplace.co.kr/</p>
                                <Input type = "text" name = "alertInput" maxLength = {inputState?.length}>
                                    {inputState?.input}
                                </Input>
                            </div>:
                            textState === "accountIntroInput"?
                            <div id = {style.inputBox}>
                                <Input type = "textarea" name = "alertInput" maxLength = {100}>
                                    {inputState?.input}
                                </Input>
                            </div>:
                            <div id = {style.inputBox}>
                                <Input type = "text" name = "alertInput" maxLength = {inputState?.length}>
                                    {inputState?.input}
                                </Input>
                            </div>

                        }
                        <div id = {style.btnBox}>
                            {
                                textState === "nicknameInput"?
                                <Button name = "nicknameEdit" value = {inputState?.input}>변경</Button>:
                                textState === "accountAddrInput"?
                                <Button name = "addrEdit" value = {inputState?.input}>변경</Button>:
                                textState === "accountPwInput"?
                                <Button name = "pwEdit" value = { {
                                    nowPw : inputState?.input,
                                    changePw: inputState?.checkInput,
                                    bool: inputState?.bool
                                } }>변경</Button>:
                                textState === "accountIntroInput"?
                                <Button name = "introEdit" value = {inputState?.input}>변경</Button>:
                                textState === "accountLinkInput"?
                                <Button name = "linkEdit" value = {inputState?.input}>변경</Button>:
                                <></>
                            }
                            <Button id = {style.cancel} name = "overlay">취소</Button>
                        </div>
                    </div>:
                typeState === "map"?
                <div id = {style.mapBox}>
                    {
                        textState === "postingMap1"?
                        <GoogleMaps index = {0} data = {alertState.data}/>:
                        textState === "postingMap2"?
                        <GoogleMaps index = {1} data = {alertState.data}/>:
                        <GoogleMaps index = {2} data = {alertState.data}/>
                    }
                </div>:
                typeState === "img"?
                <div id = {style.slideBox}>
                    <Button id = {style.overlayClose} name = "overlay">x</Button>
                    <div id = {style.imgBox}>
                        {
                            imgLength === 1?
                            <></>:
                            imgIndex === 0?
                            <button id = {style.right} name = "imgNext" onClick = {onClickEvent}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="25" r="25" transform="rotate(-180 25 25)" fill="#4ED0F9"/>
                                    <path d="M21.6641 35L31.6641 25L21.6641 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>:
                            imgIndex === imgLength - 1?
                            <button id = {style.left} name = "imgBack" onClick = {onClickEvent}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="25" r="25" fill="#4ED0F9"/>
                                    <path d="M28.3359 15L18.3359 25L28.3359 35" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>:
                            <>
                                <button id = {style.right} name = "imgNext" onClick = {onClickEvent}>
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="25" cy="25" r="25" transform="rotate(-180 25 25)" fill="#4ED0F9"/>
                                        <path d="M21.6641 35L31.6641 25L21.6641 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button id = {style.left} name = "imgBack" onClick = {onClickEvent}>
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="25" cy="25" r="25" fill="#4ED0F9"/>
                                        <path d="M28.3359 15L18.3359 25L28.3359 35" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </>
                        }
                        <div id = {style.img}>
                        {
                            alertState.data?.src&&alertState.data?.src.map((e, index) => 
                                <img key = {index} src = {`${process.env.REACT_APP_URL}/${e.file_path}`} 
                                    style = {{
                                        display: index === imgIndex?
                                        "flex":
                                        "none"
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
                </div>:
                typeState === "contents"?
                <div id = {style.contentsBox}>
                    <div id = {style.textBox}>
                        <div id = {style.titleBox}>
                            <h1>{alertState?.data?.title}</h1>
                        </div>
                        <p>{alertState?.data?.contents}</p>
                    </div>
                    <Button name = "overlay">확인</Button>
                </div>:
                <></>
            }
        </div>
    )
}

export default Alert