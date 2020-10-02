import React, { useContext } from "react"
import 'date-fns';
import { makeStyles } from "@material-ui/core/styles"
import { Modal, Paper, Button, CircularProgress, TextField } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment'
import { addRecord, finishAddRecord } from "../actions/recordsActions";
import useRequest from "@ahooksjs/use-request";
import AppContext from "../contexts/AppContext";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(2, 4, 3),
    },
}));

const AddRecordModal = (props) => {

    const classes = useStyles()
    const { recordsDispatch } = useContext(AppContext)
    const { control, handleSubmit } = useForm()
    const [cookies] = useCookies()
    const { loading: isRecordAdding, run: requestRecordAddition } = useRequest(addRecord, {
        manual: true,
        onSuccess: (result) => recordsDispatch(finishAddRecord(result.data))
    })

    const handleNewRecordSubmition = (data) => {
        requestRecordAddition({
            ...data,
            exerciseId: props.exerciseId
        }, cookies.token)
    }

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={() => props.setIsOpen(false)}
        >
            <Paper className={classes.paper}>
                {
                    isRecordAdding ?
                        <CircularProgress />
                        :
                        <form onSubmit={handleSubmit(handleNewRecordSubmition)}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <Controller
                                    as={<KeyboardDatePicker />}
                                    name="date"
                                    label="Date"
                                    control={control}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    defaultValue={new Date()}
                                />
                            </MuiPickersUtilsProvider>
                            <Controller
                                as={<TextField />}
                                name="weight"
                                label="Weight"
                                type="number"
                                control={control}
                                defaultValue={1}
                            />
                            <Controller
                                as={<TextField />}
                                name="reps"
                                label="Repetitions"
                                type="number"
                                control={control}
                                defaultValue={1}
                            />
                            <Controller
                                as={<TextField />}
                                name="series"
                                label="Series"
                                type="number"
                                control={control}
                                defaultValue={1}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                            >Save</Button>
                        </form>}
            </Paper>
        </Modal>
    )
}

export default AddRecordModal