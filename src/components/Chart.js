import React from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import { Paper, makeStyles } from "@material-ui/core"
import moment from "moment"

const Chart = (props) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: "2rem 2rem 2rem 0"
        }
    }))
    const classes = useStyles()
    return (
        <Paper
            className={classes.paper}
        >
            <ResponsiveContainer width="100%" height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <LineChart data={props.data}>
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
    )
}

export default Chart