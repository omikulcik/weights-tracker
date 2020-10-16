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
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck";
import { Alert } from "@material-ui/lab";
import Chart from "../components/Chart"
import { useTranslation } from "react-i18next";
import moment from "moment"

const Excercise = () => {

    const { t } = useTranslation()
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
            flexWrap: "wrap",
            "& button": {
                height: "2.5rem",
                fontWeight: "bold"
            }
        },
        loadingCont: {
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            paddingBottom: "2rem"
        }
    }))
    const classes = styles()

    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false)
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { loading: isRecordsLoading, error: getRecordsError } = useRequest(getRecords, {
        defaultParams: {
            exerciseId: parseInt(id),
            token: cookies.token
        },
        onSuccess: (result) => recordsDispatch(finishGetRecords(result.data)),
        onError: (err) => {
            checkAutoLogout(err)
        }
    })
    useEffect(() => {
        if (records.length > 0) {
            setDataWithAvg(
                records.sort((a,b) => moment(a.date) - moment(b.date)).map((rec, i) => {
                    const pastData = records.slice(0, i + 1).map(r => r.weight)
                    const pastSum = pastData.length > 0 ? pastData.reduce((a, b) => a + b, 0) : 0
                    const avg = pastData.length > 0 ? pastSum / pastData.length : 0
                    return {
                        ...rec,
                        avg: avg.toFixed(2),
                    }
                }))
        }
    }, [records])

    return (
        <>
            <Grid container spacing={3}>{
            }
                <Grid item xs={12} className={classes.exerciseTop}>
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
                        {t("pridat novy zaznam")}
                    </Button>
                </Grid>
                {
                    (isRecordsLoading || getRecordsError || records.length === 0) ?
                        <Grid item xs={12} component={Paper} className={classes.loadingCont}>
                            {
                                isRecordsLoading ?
                                    <CircularProgress />
                                    :
                                    records.length === 0 ?
                                        <Alert severity="warning">
                                            {t("nemate zadne zaznamy")}
                                        </Alert>
                                        :
                                        <Alert severity="error">
                                            {t("errors.neco se nepovedlo")}
                                        </Alert>
                            }
                        </Grid>
                        :
                        <>
                            <Grid item xs={12} >
                                <Chart
                                    data={dataWithAvg}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Paper>
                                    <TableContainer >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        {t("datum")}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t("vaha")}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t("opakovani")}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t("serie")}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t("odstranit")}
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    records
                                                    .sort((a,b) => moment(b.date) - moment(a.date))
                                                    .map((rec) => <Record key={rec.id} {...rec} />)
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </>
                }
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