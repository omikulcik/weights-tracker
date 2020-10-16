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
import { useTranslation } from "react-i18next";



const Excercises = () => {

    const styles = makeStyles(theme => ({
        exercisesHead: {
            display: "flex",
            flexWrap: "wrap",
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
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { exercises, exercisesDispatch } = useContext(AppContext)
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { loading: isExercisesLoading, error: getExercisesError } = useRequest(getExercises, {
        onSuccess: (result) => exercisesDispatch(finishGetExercises(result.data)),
        onError: (err) => {
            checkAutoLogout(err)
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
                    {t("cviky")}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <AddCircleIcon className={classes.addBtn} />
                    {t("pridat novy cvik")}
                </Button>
            </Grid>
            {
                isExercisesLoading ?
                    <CircularProgress className={classes.spinner} /> :
                        getExercisesError ?
                        <Alert severity="error">
                            {t("errors.neco se nepovedlo")}
                        </Alert> :
                        exercises.length === 0 ?
                            <Alert severity="warning">
                                {t("nemate zadne cviky")}
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