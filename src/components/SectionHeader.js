import React from "react"
import {Grid, Typography, Button, makeStyles} from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles((theme) =>({
    addBtn: {
        marginRight: "1rem"
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        "& button": {
            height: "2.5rem",
            fontWeight: "bold"
        }
    }
}))


const SectionHeader = (props) =>{

    const classes = useStyles()

    return(
        <Grid item xs={12} className={classes.sectionHeader}>
        <Typography
            variant="h3"
            component="h3"
        >
            {props.heading}
        </Typography>

        <Button
            variant="contained"
            color="primary"
            onClick={props.btnHandler}
        >
            <AddCircleIcon className={classes.addBtn} />
            {props.btnText}
        </Button>
    </Grid>
    )
}

export default SectionHeader