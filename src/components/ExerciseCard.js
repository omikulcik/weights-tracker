import React, { useContext, useState } from "react"
import { Grid, Card, CardContent, Button, Typography, IconButton } from "@material-ui/core"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/styles"
import { Link } from "react-router-dom"
import useRequest from "@ahooksjs/use-request";
import { deleteExercise, finishDeleteExercise } from "../actions/exercisesActions";
import AppContext from "../contexts/AppContext"
import ConfirmationDialog from "./ConfirmationDialog";
import { useCookies } from "react-cookie";
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck";
import { useTranslation } from "react-i18next";

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
            padding: "2rem 0",
            fontWeight: "bold"
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
            top: "0.5rem",
            right: "0.6rem",
            cursor: "pointer"
        },
        exerciseSpec: {
            flexBasis: "100%"
        }
    }))

    const classes = styles()
    const { t } = useTranslation()
    const { exercisesDispatch } = useContext(AppContext)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()

    const { loading: isExerciseDeleting, run: requestExerciseDeletion, error: deletionError } = useRequest(deleteExercise, {
        manual: true,
        onSuccess: () => exercisesDispatch(finishDeleteExercise({ id: props.id })),
        onError: (err) => {
            checkAutoLogout(err)
        }
    })

    return (
        <Grid 
            item
            lg={3}
            md={4}
            sm={6}
            xs={12}
            >
            <Card>
                <CardContent className={classes.cardContent}>
                    <IconButton className={classes.deleteIcon} onClick={() => setIsDeleteDialogOpen(true)} >
                        <DeleteIcon />
                    </IconButton>
                    <Typography component="h3" variant="h5" className={classes.exerciseName}>
                        {props.name}
                    </Typography>
                    <Typography component="h4" variant="h6" className={classes.exerciseSpec}>
                        {t("rekord")}: {props.maxWeight ? props.maxWeight : 0}
                    </Typography>
                    <Typography component="h4" variant="h6" className={classes.exerciseSpec}>
                        {t("pocet zaznamu")}: {props.recordsCount}
                    </Typography>
                    <Link to={`exercise/${props.id}`} className={classes.exerciseLink}>
                        <Button variant="contained" className={classes.roundButton} color="primary">
                            <ChevronRightIcon />
                        </Button>
                    </Link>
                </CardContent>
                <ConfirmationDialog
                    handleConfirmation={() => requestExerciseDeletion({ id: props.id }, cookies.token)}
                    open={isDeleteDialogOpen}
                    handleClose={() => setIsDeleteDialogOpen(false)}
                    dialogText={`${t("opravdu si prejete smazat cvik s nazvem")} ${props.name}`}
                    isConfirmationInProgress={isExerciseDeleting}
                    confirmationError={deletionError}
                />
            </Card>
        </Grid>
    )

}


export default ExerciseCard