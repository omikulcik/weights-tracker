import React, { useState, useEffect, useContext } from "react"
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core"
import ExerciseCard from "../components/ExerciseCard"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/styles";
import AddExerciseModal from "../components/AddExerciseModal";
import { getExercises } from "../actions/exercisesActions";
import AppContext from "../contexts/AppContext";
import useRequest from '@ahooksjs/use-request';



const Excercises = () => {

    const styles = makeStyles(theme => ({
        exercisesHead: {
            display: "flex",
            alignItems: "center",
            "& button": {
                height: "2.5rem",
                marginLeft: "3rem",
                fontWeight: "bold"
            }
        },
        addBtn: {
            marginRight: "1rem"
        },
        spinner: {
            margin: "25% auto"
        }
    }))
    const classes = styles()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { exercises, exercisesDispatch } = useContext(AppContext)

    const { loading: isExercisesLoading } = useRequest(getExercises, {
        manual: false,
        onSuccess: (result) => exercisesDispatch({
            type: "GET_EXERCISES",
            data: result.data
        })
    })


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} className={classes.exercisesHead}>
                <Typography
                    component="h2"
                    variant="h3"
                >
                    Exercises
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <AddCircleIcon className={classes.addBtn} />
                    Add new exercise
                </Button>
            </Grid>
            {
                isExercisesLoading ?
                    <CircularProgress className={classes.spinner} /> :
                    exercises.map(exercise =>
                        <ExerciseCard
                            key={exercise.id}
                            {...exercise}
                        />)
            }
            <AddExerciseModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </Grid>
    )
}

export default Excercises