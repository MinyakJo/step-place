
export const TOP_BAR_SELECTED = "TOP_BAR_SELECTED"
export const MORE_VIEW_SELECTED = "MORE_VIEW_SELECTED"
export const MORE_VIEW_OPEN = "MORE_VIEW_OPEN"


const topBarSelected = (text = "") => {
    return{
        type: TOP_BAR_SELECTED,
        text: text
    }
}

const moreViewSelected = (text = "") => {
    return{
        type: MORE_VIEW_SELECTED,
        text: text,
    }
}

const moreViewOpen = (bool) => {
    return{
        type: MORE_VIEW_OPEN,
        bool: bool
    }
}

export { topBarSelected, moreViewSelected, moreViewOpen }