import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@material-ui/core"
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
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Ne
                        </Button>
                        <Button onClick={props.handleConfirmation} color="primary" autoFocus>
                            Ano
                        </Button>
                    </DialogActions>
            }
        </Dialog>
    )
}

export default ConfirmationDialog