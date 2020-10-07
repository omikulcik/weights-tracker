import { Button, Grid, Paper, Table, TableCell, TableContainer, TableHead, Typography, TableBody, TableRow, CircularProgress, } from "@material-ui/core"
import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AppContext from "../contexts/AppContext"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/styles";
import AddRecordModal from "../components/AddRecordModal";
import useRequest from "@ahooksjs/use-request";
import { finishGetRecords, getRecords } from "../actions/recordsActions";
import Record from "../components/Record";
import { useCookies } from "react-cookie";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import moment from "moment"


const Excercise = () => {

    const { exercises, records, recordsDispatch } = useContext(AppContext)
    let { id } = useParams();
    const [cookies] = useCookies()
    const [dataWithAvg, setDataWithAvg] = useState([])
    const exc = exercises.find(e => e.id === parseInt(id))
    const styles = makeStyles(theme => ({
        addBtn: {
            marginRight: "1rem"
        },
        exerciseTop: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& button": {
                height: "2.5rem",
                fontWeight: "bold"
            }
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
    useEffect(() => {
        if (records.length > 0) {
            setDataWithAvg(
                records.map((rec, i) => {
                    const pastData = records.slice(0, i + 1).map(r => r.weight)
                    const pastSum = pastData.length > 0 ? pastData.reduce((a, b) => a + b, 0) : 0
                    const avg = pastData.length > 0 ? pastSum / pastData.length : 0
                    return {
                        ...rec,
                        avg,
                        sum: pastSum
                    }
                }))
        }
    }, [records])

    return (
        <>
            <Grid container spacing={3}>{
                console.log(dataWithAvg)
            }
                <Grid item lg={12} className={classes.exerciseTop}>
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
                <Grid item lg={12} >
                    <Paper>
                        <ResponsiveContainer width="100%" height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <LineChart data={dataWithAvg}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="avg" stroke="#000" />
                                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                                <Line type="monotone" dataKey="sum" stroke="#FF0000" />
                                <Tooltip />
                                <Legend />
                                <XAxis dataKey="date" tickFormatter={(t) => moment(t).format("DD/MM/YY")} />
                                <YAxis type="number" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item lg={12} spacing={3}>
                    {
                        isRecordsLoading ?
                            <CircularProgress />
                            :
                            <Paper>
                                <TableContainer >
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
                                                    Delete
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
                            </Paper>
                    }
                </Grid>
            </Grid>
            <AddRecordModal
                open={isAddRecordModalOpen}
                setIsOpen={setIsAddRecordModalOpen}
                exerciseId={parseInt(id)}
            />
        </>
    )
}

export default Excercise