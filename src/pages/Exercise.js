import { Button, Grid, Typography } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import AppContext from "../contexts/AppContext"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/styles";
import AddRecordModal from "../components/AddRecordModal";
import useRequest from "@ahooksjs/use-request";
import { finishGetRecords, getRecords } from "../actions/recordsActions";


const Excercise = () => {

    const { exercises, records, recordsDispatch } = useContext(AppContext)
    let { id } = useParams();
    const exc = exercises.find(e => e.id === parseInt(id))
    const styles = makeStyles(theme => ({
        addBtn: {
            marginRight: "1rem"
        }
    }))
    const classes = styles()

    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false)
    const { loading: isRecordsLoading } = useRequest(getRecords, {
        defaultParams: {
            exerciseId: parseInt(id)
        },
        onSuccess: (result) => recordsDispatch(finishGetRecords(result.data))
    })

    return (
        <div>
            <Grid container>
                <Grid item lg={12}>
                    <Typography
                        variant="h3"
                        component="h3"
                    >
                        {exc.name}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsAddRecordModalOpen(true)}
                    >
                        <AddCircleIcon className={classes.addBtn} />
                    Add new Record
                </Button>
                </Grid>
            </Grid>
            <Grid container>
                {
                    records.map((rec) => <Grid item>{rec.id}</Grid>)
                }
            </Grid>
            <AddRecordModal
                open={isAddRecordModalOpen}
                setIsOpen={setIsAddRecordModalOpen}
                exerciseId={parseInt(id)}
            />
        </div>
    )
}

export default Excercise