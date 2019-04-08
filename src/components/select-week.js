import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import {Button} from '@wh/wh-components'
import moment from "moment";
import { withActions, withData } from "../context/ppp";
let _currentWeek = moment().format('YYYY-ww')

let _hasCurrentWeek = weeks => {
  return weeks.find(w => w === _currentWeek) != null
}
let select = props => <div>
  <Button text='test'/>
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
      </option>
    )}
    {props.weeks.map(w => (
      <option key={w} value={w}>
        {moment(w, "yyyy-ww").format("ww/YYYY")}
      </option>
    ))}
  </Select>
</FormControl>
</div>

export default withActions(withData(select))