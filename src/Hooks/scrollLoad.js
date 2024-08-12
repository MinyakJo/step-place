const scrollLoad = (scroll, scrollHeight, mainHeight) => {
    
    if(Math.abs(mainHeight - scroll) < 1 && scrollHeight !== mainHeight){
        return true
    }
    return false
}

export default scrollLoad