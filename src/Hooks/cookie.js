const setCookie = (name, value, expires) => {
    document.cookie = `${name}=${value}; expires=${expires}; path=/;`
}
const getCookie = (name) => {
    if(document.cookie === "" || document.cookie === undefined){
        return undefined
    }
    return document.cookie?.split('; ')?.find(row => row.startsWith(name))?.split('=')[1]
}
const delCookie = (name) => {
    document.cookie = `${name}=; path=/; max-age=${0}`
}
export { setCookie, getCookie, delCookie }