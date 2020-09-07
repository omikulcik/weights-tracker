import React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from "react-router-dom";


const Navigation = () => {
    return (
        <List>
            <Link to="/">
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Dashboard
                </ListItemText>
                </ListItem>
            </Link>
            <Link to="/exercises">
                <ListItem button>
                    <ListItemIcon>
                        <FitnessCenterIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Exercises
                </ListItemText>
                </ListItem>
            </Link>
        </List>
    )
}

export default Navigation