import { Button, Grid, Paper, Table, TableCell, TableContainer, TableHead, Typography, TableBody, TableRow, CircularProgress } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import AppContext from "../contexts/AppContext"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/styles";
import AddRecordModal from "../components/AddRecordModal";
import useRequest from "@ahooksjs/use-request";
import { finishGetRecords, getRecords } from "../actions/recordsActions";
import Record from "../components/Record";
import { useCookies } from "react-cookie";


const Excercise = () => {

    const { exercises, records, recordsDispatch } = useContext(AppContext)
    let { id } = useParams();
    const [cookies] = useCookies()
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
            exerciseId: parseInt(id),
            token: cookies.token
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
            <Grid container spacing={3}>
                {
                    isRecordsLoading ?
                        <CircularProgress />
                        :
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Datum
                                </TableCell>
                                        <TableCell>
                                            Váha
                                </TableCell>
                                        <TableCell>
                                            Reps
                                </TableCell>
                                        <TableCell>
                                            Series
                                </TableCell>
                                        <TableCell>
                                            Note
                                </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        records.map((rec) => <Record key={rec.id} {...rec} />)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
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