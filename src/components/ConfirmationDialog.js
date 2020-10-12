import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React from "react"
import { useTranslation } from "react-i18next"


const ConfirmationDialog = (props) => {
    const { t } = useTranslation()
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                {props.dialogText}
            </DialogTitle>
            {
                props.isConfirmationInProgress ?
                    <CircularProgress /> :
                    props.confirmationError ?
                        <Alert severity="error">
                            {t("errors.neco se nepovedlo")}
                        </Alert> :
                        <DialogActions>
                            <Button onClick={props.handleConfirmation} color="primary" variant="contained" autoFocus>
                                {t("ano")}
                            </Button>
                            <Button onClick={props.handleClose} color="secondary" variant="contained">
                                {t("ne")}
                            </Button>
                        </DialogActions>
            }
        </Dialog>
    )
}

export default ConfirmationDialog