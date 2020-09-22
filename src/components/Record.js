import { Grid, Paper, TableCell, TableRow } from "@material-ui/core"
import React from "react"
import moment from "moment"

const Record = (props) => {
    return (
        <TableRow>
            <TableCell>
                {moment(props.date).format("DD. MM. YYYY")}
            </TableCell>
            <TableCell>
                {props.weight}
            </TableCell>
            <TableCell>
                {props.reps}
            </TableCell>
            <TableCell>
                {props.series}
            </TableCell>
            <TableCell>
                {props.note}
            </TableCell>
        </TableRow>
    )
}

export default Record