import React from "react"
import { Menu, MenuItem } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import czflag from "../img/cz-flag.png"
import ukflag from "../img/uk-flag.png"

const LanguageSwitcher = (props) =>{
    const {i18n} = useTranslation()
    
    const handleLangChange = (lang) =>{
        i18n.changeLanguage(lang)
        props.handleClose()
    }

    return(
        <Menu
            id="langSwitcher"
            open={Boolean(props.anchorEl)}
            keepMounted
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <MenuItem
            onClick={() => handleLangChange("cs")}
            >
                <img
                    alt=""
                    src ={czflag}
                     />
            </MenuItem>
            <MenuItem
                onClick={() => handleLangChange("en")}
            >
                <img 
                    alt=""
                    src ={ukflag}
                     />
            </MenuItem>
        </Menu>
    )
}

export default LanguageSwitcher