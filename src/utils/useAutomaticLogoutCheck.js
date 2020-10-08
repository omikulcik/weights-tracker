import { useContext } from "react"
import { useCookies } from "react-cookie"
import AppContext from "../contexts/AppContext"


export default () => {
    const { setUser, setHasBeenLoggedOut } = useContext(AppContext)
    const [, , removeCookie] = useCookies()
    return (err) => {
        if (err.response.status === 403) {
            removeCookie("token")
            setUser(null)
            setHasBeenLoggedOut(true)
        }
    }
}