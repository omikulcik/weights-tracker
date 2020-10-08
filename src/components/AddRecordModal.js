import React, { useContext, useState } from "react"
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
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(2, 4, 3),
    },
    muiInput: {
        display: "block",
        marginBottom: "1rem",
        "& .MuiInputBase-root": {
            width: "100%"
        }
    },
    submitBtn: {
        display: "block",
        margin: "1rem auto"
    }

}));

const AddRecordModal = (props) => {

    const classes = useStyles()
    const { recordsDispatch } = useContext(AppContext)
    const { control, handleSubmit, errors } = useForm()
    const [cookies] = useCookies()
    const [hasError, setHasError] = useState(false)
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { loading: isRecordAdding, run: requestRecordAddition } = useRequest(addRecord, {
        manual: true,
        onSuccess: (result) => {
            recordsDispatch(finishAddRecord(result.data))
            props.setIsOpen(false)
        },
        onError: (err) => {
            checkAutoLogout(err)
            setHasError(true)
        }
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
                                    className={classes.muiInput}
                                    autoOk
                                    rules={{
                                        required: "Required field",
                                    }}
                                    error={errors.date}
                                    helperText={errors.date?.message}
                                />
                            </MuiPickersUtilsProvider>
                            <Controller
                                as={<TextField />}
                                name="weight"
                                label="Weight"
                                type="number"
                                control={control}
                                defaultValue={1}
                                className={classes.muiInput}
                                error={errors.weight}
                                helperText={errors.weight?.message}
                                rules={{
                                    required: "Required field",
                                    min: {
                                        value: 0,
                                        message: "Minimal value is 0"
                                    }
                                }}
                            />
                            <Controller
                                as={<TextField />}
                                name="reps"
                                label="Repetitions"
                                type="number"
                                control={control}
                                defaultValue={1}
                                className={classes.muiInput}
                                rules={{
                                    required: "Required field",
                                    min: {
                                        value: 1,
                                        message: "Minimal value is 1"
                                    }
                                }}
                                error={errors.reps}
                                helperText={errors.reps?.message}
                            />
                            <Controller
                                as={<TextField />}
                                name="series"
                                label="Series"
                                type="number"
                                control={control}
                                defaultValue={1}
                                className={classes.muiInput}
                                rules={{
                                    required: "Required field",
                                    min: {
                                        value: 1,
                                        message: "Minimal value is 1"
                                    }
                                }}
                                error={errors.series}
                                helperText={errors.series?.message}
                            />{
                                hasError &&
                                <Alert
                                    severity="error"
                                >
                                    Něco se nepovedlo, zkuste to prosím znovu
                                </Alert>
                            }
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className={classes.submitBtn}
                            >Save</Button>
                        </form>}
            </Paper>
        </Modal>
    )
}

export default AddRecordModal