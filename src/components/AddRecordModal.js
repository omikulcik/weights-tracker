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
import { useTranslation } from "react-i18next";

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
    const { t, i18n } = useTranslation()
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
                            <MuiPickersUtilsProvider 
                                utils={MomentUtils}
                                locale={i18n.languages[0]}
                                >
                                <Controller
                                    as={<KeyboardDatePicker />}
                                    name="date"
                                    label={t("datum")}
                                    control={control}
                                    disableToolbar
                                    variant="inline"
                                    format="DD.MM.YYYY"
                                    margin="normal"
                                    defaultValue={new Date()}
                                    className={classes.muiInput}
                                    autoOk
                                    rules={{
                                        required: t("povinne pole"),
                                    }}
                                    error={errors.date}
                                    helperText={errors.date?.message}
                                />
                            </MuiPickersUtilsProvider>
                            <Controller
                                as={<TextField />}
                                name="weight"
                                label={t("vaha")}
                                type="number"
                                control={control}
                                defaultValue={1}
                                className={classes.muiInput}
                                error={errors.weight}
                                helperText={errors.weight?.message}
                                rules={{
                                    required: t("povinne pole"),
                                    min: {
                                        value: 0,
                                        message: `${t("minimalni hodnota je")} 0`
                                    }
                                }}
                            />
                            <Controller
                                as={<TextField />}
                                name="reps"
                                label={t("opakovani")}
                                type="number"
                                control={control}
                                defaultValue={1}
                                className={classes.muiInput}
                                rules={{
                                    required: t("povinne pole"),
                                    min: {
                                        value: 1,
                                        message: `${t("minimalni hodnota je")} 1`
                                    }
                                }}
                                error={errors.reps}
                                helperText={errors.reps?.message}
                            />
                            <Controller
                                as={<TextField />}
                                name="series"
                                label={t("serie")}
                                type="number"
                                control={control}
                                defaultValue={1}
                                className={classes.muiInput}
                                rules={{
                                    required: "Required field",
                                    min: {
                                        value: 1,
                                        message: `${t("minimalni hodnota je")} 1`
                                    }
                                }}
                                error={errors.series}
                                helperText={errors.series?.message}
                            />{
                                hasError &&
                                <Alert
                                    severity="error"
                                >
                                    {t("errors.neco se nepovedlo")}
                                </Alert>
                            }
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className={classes.submitBtn}
                            >
                                {t("pridat")}
                            </Button>
                        </form>}
            </Paper>
        </Modal>
    )
}

export default AddRecordModal