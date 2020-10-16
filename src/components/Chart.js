import React from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import { Paper, makeStyles } from "@material-ui/core"
import moment from "moment"
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "2rem 2rem 2rem 0"
    }
}))

const Chart = (props) => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <Paper
            className={classes.paper}
        >
            <ResponsiveContainer width="100%" height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <LineChart data={props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="avg" stroke="#000" />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    <Tooltip 
                        formatter={(value, entry, index) => [value,t(`legend.${entry}`)]}
                        labelFormatter={(label) => `${t("datum")}: ${moment(label).format("DD.MM.YYYY")}`}
                    />
                    <Legend
                        formatter={(value, entry, index) => t(`legend.${value}`)}
                    />
                    <XAxis dataKey="date" tickFormatter={(t) => moment(t).format("DD.MM.YYYY")} />
                    <YAxis type="number" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default Chart