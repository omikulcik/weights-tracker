import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Modal, Paper, TextField, Button } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form";
import { addExercise } from "../actions/exercisesActions"

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



    const classes = useStyles()
    const { register, handleSubmit, control } = useForm()

    const handleCreateNewExercise = (data) => {
        console.log(data)
        addExercise({
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
            </Paper>
        </Modal>
    )
}

export default AddExerciseModal