import React from "react"
import { Menu, MenuItem } from "@material-ui/core"
import { useCookies } from "react-cookie"
import { useTranslation } from "react-i18next"


const UserMenu = (props) => {

    const [, , removeCookie] = useCookies()
    const handleLogout = () => {
        removeCookie("token")
        props.setUser(null)
        props.handleClose()
    }
    const { t } = useTranslation()

    return (
        <Menu
            id="userMenu"
            open={Boolean(props.anchorEl)}
            keepMounted
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}

        >
            <MenuItem
                onClick={handleLogout}
            >
                {t("odhlasit")}
            </MenuItem>
        </Menu>
    )
}

export default UserMenu