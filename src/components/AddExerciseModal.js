import React, { useContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Modal, Paper, TextField, Button, CircularProgress } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form";
import { addExercise, finishAddExercise } from "../actions/exercisesActions"
import useRequest from "@ahooksjs/use-request";
import AppContext from "../contexts/AppContext";
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
}));
const AddExerciseModal = (props) => {


    const { exercisesDispatch } = useContext(AppContext)
    const classes = useStyles()
    const { handleSubmit, control } = useForm()
    const [hasError, setHasError] = useState(false)
    const { loading: isExerciseAdding, run: requestAddExercise } = useRequest(addExercise, {
        manual: true,
        onSuccess: (res) => exercisesDispatch(finishAddExercise(res.data)),
        onError: () => setHasError(true)
    })

    const handleCreateNewExercise = (data) => {
        requestAddExercise({
            name: data.exerciseName
        })
    }

    return (
        <Modal
            open={props.isModalOpen}
            onClose={() => props.setIsModalOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
        >
            <Paper className={classes.paper}>
                {
                    isExerciseAdding ?
                        <CircularProgress /> :
                        hasError ?
                            <Alert severity="error">
                                Něco se nepovedlo, zkuste to prosím znovu.
                            </Alert> :
                            <form onSubmit={handleSubmit(handleCreateNewExercise)}>

                                <Controller
                                    as={<TextField />}
                                    name="exerciseName"
                                    control={control}
                                    defaultValue=""
                                    label="Exercise name"
                                />
                                <Button
                                    type="submit"
                                >
                                    Odeslat
                        </Button>
                            </form>
                }
            </Paper>
        </Modal>
    )
}

export default AddExerciseModal