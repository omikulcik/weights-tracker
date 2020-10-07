import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React from "react"


const ConfirmationDialog = (props) => {
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
                            Něco se nepovedlo, zkuste to prosím znovu.
                        </Alert> :
                        <DialogActions>
                            <Button onClick={props.handleConfirmation} color="primary" variant="contained" autoFocus>
                                Ano
                            </Button>
                            <Button onClick={props.handleClose} color="secondary" variant="contained">
                                Ne
                            </Button>
                        </DialogActions>
            }
        </Dialog>
    )
}

export default ConfirmationDialog