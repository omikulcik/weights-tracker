import React, { useContext, useState } from "react"
import { Grid, Card, CardContent, Button, Typography } from "@material-ui/core"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/styles"
import { Link } from "react-router-dom"
import useRequest from "@ahooksjs/use-request";
import { deleteExercise, finishDeleteExercise } from "../actions/exercisesActions";
import AppContext from "../contexts/AppContext"
import ConfirmationDialog from "./ConfirmationDialog";

const ExerciseCard = (props) => {

    const styles = makeStyles(theme => ({
        roundButton: {
            borderRadius: "50%",
            padding: "6px",
            minWidth: "auto"
        },
        exerciseName: {
            display: "block",
            flexBasis: "100%",
            padding: "2rem 0"
        },
        exerciseLink: {
            marginLeft: "auto"
        },
        cardContent: {
            display: "flex",
            flexWrap: "wrap",
            position: "relative"
        },
        deleteIcon: {
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer"
        }
    }))

    const classes = styles()

    const { exercisesDispatch } = useContext(AppContext)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const { loading: isExerciseDeleting, run: requestExerciseDeletion } = useRequest(deleteExercise, {
        manual: true,
        onSuccess: () => exercisesDispatch(finishDeleteExercise({ id: props.id }))
    })

    return (
        <Grid item lg={3}>
            <Card>
                <CardContent className={classes.cardContent}>
                    <DeleteIcon className={classes.deleteIcon} onClick={() => setIsDeleteDialogOpen(true)} />
                    <Typography component="h3" variant="h6" className={classes.exerciseName}>
                        {props.name}
                    </Typography>
                    <Link to={`exercise/${props.id}`} className={classes.exerciseLink}>
                        <Button variant="contained" className={classes.roundButton} color="primary">
                            <ChevronRightIcon />
                        </Button>
                    </Link>
                </CardContent>
                <ConfirmationDialog
                    handleConfirmation={() => requestExerciseDeletion({ id: props.id })}
                    open={isDeleteDialogOpen}
                    handleClose={() => setIsDeleteDialogOpen(false)}
                    dialogText={`Opravdu si přejete smazat cvik s názvem ${props.name}`}
                    isConfirmationInProgress={isExerciseDeleting}
                />
            </Card>
        </Grid>
    )

}


export default ExerciseCard