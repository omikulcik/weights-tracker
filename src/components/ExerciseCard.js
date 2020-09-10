import React from "react"
import { Grid, Card, CardContent, Button, Typography } from "@material-ui/core"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/styles"
import { Link } from "react-router-dom"

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
            right: "1rem"
        }
    }))

    const classes = styles()

    return (
        <Grid item lg={3}>
            <Card>
                <CardContent className={classes.cardContent}>
                    <DeleteIcon className={classes.deleteIcon} />
                    <Typography component="h3" variant="h6" className={classes.exerciseName}>
                        {props.name}
                    </Typography>
                    <Link to="/exercise/1" className={classes.exerciseLink}>
                        <Button variant="contained" className={classes.roundButton} color="primary">
                            <ChevronRightIcon />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </Grid>
    )

}


export default ExerciseCard