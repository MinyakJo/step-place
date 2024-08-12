import { IS_OPEN } from "./alertAction"

export const FEED_HOVER = "FEED_HOVER"

export const ACCOUNT_IS_PRIVATE = "ACCOUNT_IS_PRIVATE"

export const COMBOBOX_IS_OPEN = "COMBOBOX_IS_OPEN"

const feedHover = (bool) => {
    return{
        type: FEED_HOVER,
        bool: bool
    }
}

const accountIsPrivate = () => {
    return{
        type: ACCOUNT_IS_PRIVATE,
    }
}

const comboBoxIsOpen = () => {
    return{
        type: COMBOBOX_IS_OPEN
    }
}

export { feedHover, accountIsPrivate, comboBoxIsOpen }