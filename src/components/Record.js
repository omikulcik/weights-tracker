import { IconButton, TableCell, TableRow } from "@material-ui/core"
import React, { useContext, useState } from "react"
import moment from "moment"
import DeleteIcon from '@material-ui/icons/Delete';
import useRequest from "@ahooksjs/use-request";
import { deleteRecord, finishDeleteRecord } from "../actions/recordsActions";
import { useCookies } from "react-cookie";
import AppContext from "../contexts/AppContext";
import ConfirmationDialog from "./ConfirmationDialog";
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck";
import { useTranslation } from "react-i18next";

const Record = (props) => {
    const { recordsDispatch } = useContext(AppContext)
    const { t } = useTranslation()
    const [isRecordDeletionRequested, setIsRecordDeletionRequested] = useState(false)
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { run: requestRecordDeletion, loading: isRecordDeleting, error: deletionError} = useRequest(deleteRecord, {
        manual: true,
        onSuccess: (res, params) => recordsDispatch(finishDeleteRecord({ recordId: params[0].recordId })),
        onError: (err) => {
            checkAutoLogout(err)
        }
    })

    return (
        <>
                    <TableRow>
                        <TableCell>
                            {moment(props.date).format("DD. MM. YYYY")}
                        </TableCell>
                        <TableCell>
                            {props.weight}
                        </TableCell>
                        <TableCell>
                            {props.reps}
                        </TableCell>
                        <TableCell>
                            {props.series}
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={() => setIsRecordDeletionRequested(true)} >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
            <ConfirmationDialog
                open={isRecordDeletionRequested}
                handleClose={() => setIsRecordDeletionRequested(false)}
                isConfirmationInProgress={isRecordDeleting}
                dialogText={t("opravdu si prejete smazat tento zaznam?")}
                handleConfirmation={() => requestRecordDeletion({ recordId: props.id }, cookies.token)}
                confirmationError={deletionError}
            />
        </>
    )
}

export default Record