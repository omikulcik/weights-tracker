import React from "react"
import { Grid, Card, CardContent, IconButton, Button, Typography } from "@material-ui/core"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import { makeStyles } from "@material-ui/styles"
import { Link } from "react-router-dom"



const Excercises = () => {

    const styles = makeStyles(theme => ({
        roundButton: {
            borderRadius: "50%",
            padding: "6px",
            minWidth: "auto"
        },
        exerciseName: {
            display: "block",
            flexBasis: "100%"
        },
        exerciseLink: {
            marginLeft: "auto"
        },
        cardContent: {
            display: "flex",
            flexWrap: "wrap"
        }
    }))

    const classes = styles()


    return (
        <Grid container spacing={3}>
            <Grid item lg={3}>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Typography component="h2" variant="h6" className={classes.exerciseName}>
                            ahoj
                        </Typography>
                        <Link to="/exercise/1" className={classes.exerciseLink}>
                            <Button variant="contained" className={classes.roundButton} color="primary">
                                <ChevronRightIcon />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item lg={3}>
                b
            </Grid>
            <Grid item lg={3}>
                b
            </Grid>
            <Grid item lg={3}>
                a
            </Grid>
            <Grid item lg={3}>
                b
            </Grid>
            <Grid item lg={3}>
                b
            </Grid>
        </Grid>
    )
}

export default Excercises