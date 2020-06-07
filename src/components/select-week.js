import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';

import moment from "moment";
import { withActions, withData } from "../context/ppp";
let _currentWeek = moment().format('YYYY-ww')

let _hasCurrentWeek = weeks => {
  return weeks.find(w => w === _currentWeek) != null
}
let select = props => <div>
  <FormControl>
  <InputLabel htmlFor="week-select">Week</InputLabel>
  <Select
    value={props.data.selectedWeek}
    native={true}
    onChange={e => props.actions.selectWeek(e.target.value)}
    inputProps={{ id: "week-select", name: "week-select" }}
  >
    {!_hasCurrentWeek(props.weeks) && (
      <option key={_currentWeek} value={_currentWeek}>
        {moment().format("ww/YYYY")}
        {moment().add(1,'d').format(" (D.M. - ")}
        {moment().add(5,'d').format("D.M.)")}
      </option>
    )}
    {props.weeks.map(w => {
      return (
      <option key={w} value={w}>
        {moment(w, "YYYY-ww").format("ww/YYYY")}
        {moment(w, "YYYY-ww").add(1,'d').format(" (D.M. - ")}
        {moment(w, "YYYY-ww").add(5,'d').format("D.M.)")}
      </option>
    )})}
  </Select>
</FormControl>
</div>

export default withActions(withData(select))