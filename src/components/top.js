import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { withActions, withData } from '../context/ppp';

const styles = {
  title: {
    flex: 3
  },
  formControl: {
    flex: 3,
    margin: '2px',
    minWidth: 120,
  },
  add: {
    flex: 1,
    textAlign: 'right'
  }
}

let _currentWeek = moment().format("YYYY-ww")

let _hasCurrentWeek=(weeks) => {
  weeks.find(w => w === _currentWeek)
}

let Top = (props) => (<AppBar position="static" color="default">
    <Toolbar>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <Typography variant="title" className={props.classes.title}>
          willhaben ppps
        </Typography>

        {props.weeks.length > 0 &&
        <FormControl className={props.classes.formControl}>
          <InputLabel htmlFor="week-select">Week</InputLabel>
          <Select value={props.data.selectedWeek} native={true} onChange={(e) => props.actions.selectWeek(e.target.value)}
                  inputProps={{id: 'week-select', name: 'week-select'}}>
            { !_hasCurrentWeek(props.weeks) && <option key={_currentWeek} value={_currentWeek}>{moment().format("ww/YYYY")}</option> }
            {props.weeks.map(w => (
              <option key={w} value={w}>{moment(w,'yyyy-ww').format("ww/YYYY")}</option>
            ))}
          </Select>

        </FormControl>
        }
        {props.teams.length > 0 &&
        <FormControl className={props.classes.formControl}>
          <InputLabel htmlFor="team-select">Team</InputLabel>
          <Select  value={props.data.selectedTeam} native={true} onChange={(e) => props.actions.selectTeam(e.target.value!=-1?e.target.value:undefined)}
                  inputProps={{id: 'team-select', name: 'team-select'}}>
            <option key="all" value={-1}>All</option>
            {props.teams.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </Select>

        </FormControl>
        }

      </div>
    </Toolbar>
  </AppBar>
)

export default withData(withActions(withStyles(styles)(Top)))