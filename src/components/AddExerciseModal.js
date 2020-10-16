import React, { useContext} from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Modal, Paper, TextField, Button, CircularProgress } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form";
import { addExercise, finishAddExercise } from "../actions/exercisesActions"
import useRequest from "@ahooksjs/use-request";
import AppContext from "../contexts/AppContext";
import { Alert } from "@material-ui/lab";
import { useCookies } from "react-cookie";
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck";
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
    submitBtn: {
        display: "block",
        margin: "1rem auto"
    }
}));
const AddExerciseModal = (props) => {
    const { t } = useTranslation()
    const { exercisesDispatch } = useContext(AppContext)
    const classes = useStyles()
    const { handleSubmit, control, errors } = useForm()
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { loading: isExerciseAdding, run: requestAddExercise, error: addExerciseError } = useRequest(addExercise, {
        manual: true,
        onSuccess: (res) => {
            exercisesDispatch(finishAddExercise(res.data))
            props.setIsModalOpen(false)
        },
        onError: (err) => {
            checkAutoLogout(err)
        }
    })

    const handleCreateNewExercise = (data) => {
        requestAddExercise({
            name: data.exerciseName
        }, cookies.token)
    }

    return (
        <Modal
            open={props.isModalOpen}
            onClose={() => props.setIsModalOpen(false)}
            className={classes.modal}
        >
            <Paper className={classes.paper}>
                {
                    addExerciseError ?
                        <Alert severity="error">
                            {t("errors.neco se nepovedlo")}
                        </Alert> :
                        <form onSubmit={handleSubmit(handleCreateNewExercise)}>
                            <Controller
                                as={<TextField />}
                                name="exerciseName"
                                control={control}
                                defaultValue=""
                                label={t("nazev cviku")}
                                autoFocus
                                rules={{
                                    required: t("povinne pole")
                                }}
                                error={errors.exerciseName}
                                helperText={errors.exerciseName?.message}
                            />
                            {
                                isExerciseAdding ?
                                    <CircularProgress /> :
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.submitBtn}
                                        color="primary"
                                    >
                                        {t("pridat")}
                                    </Button>}
                        </form>
                }
            </Paper>
        </Modal>
    )
}

export default AddExerciseModal