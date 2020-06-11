import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {withStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import moment from "moment";
import {withActions, withData} from "../context/ppp";

let _currentWeek = moment().format('YYYY-ww')

let select = props => <FormControl>
    <InputLabel htmlFor="team-select">Team</InputLabel>
    <Select
        value={props.data.selectedTeam}
        native={true}
        onChange={e => {
            props.actions.selectTeam(
                e.target.value !== '-1' ? e.target.value : undefined
            );
        }
        }
        inputProps={{id: 'team-select', name: 'team-select'}}
    >
        <option key="all" value={-1}>
            All
        </option>
        {props.teams.map(w => (
            <option key={w} value={w}>
                {w}
            </option>
        ))}
    </Select>
</FormControl>

export default withData(withActions(select))