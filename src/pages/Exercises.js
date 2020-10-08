import React, { useState, useContext } from "react"
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core"
import ExerciseCard from "../components/ExerciseCard"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/styles";
import AddExerciseModal from "../components/AddExerciseModal";
import { finishGetExercises, getExercises } from "../actions/exercisesActions";
import AppContext from "../contexts/AppContext";
import useRequest from '@ahooksjs/use-request';
import { Alert } from "@material-ui/lab";
import { useCookies } from "react-cookie";
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck";



const Excercises = () => {

    const styles = makeStyles(theme => ({
        exercisesHead: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& button": {
                height: "2.5rem",
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
    const [hasExercisesLoadingError, setHasExercisesLoadingError] = useState(false)
    const { exercises, exercisesDispatch } = useContext(AppContext)
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { loading: isExercisesLoading } = useRequest(getExercises, {
        onSuccess: (result) => exercisesDispatch(finishGetExercises(result.data)),
        onError: (err) => {
            checkAutoLogout(err)
            setHasExercisesLoadingError(true)
        },
        defaultParams: {
            token: cookies.token
        }
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
                    hasExercisesLoadingError ?
                        <Alert severity="error">
                            Něco se pokazilo, zkuste to prosím znovu.
                        </Alert> :
                        exercises.length === 0 ?
                            <Alert severity="warning">
                                Nemáte žádné cviky zatím, přidejte nějaké.
                        </Alert> :
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