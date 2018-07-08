import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { withActions } from '../context/ppp';

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

let Top = (props) => (<AppBar position="static" color="default">
    <Toolbar>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <Typography variant="title" className={props.classes.title}>
          willhaben ppps
        </Typography>

        {props.weeks.length > 0 &&
        <FormControl className={props.classes.formControl}>
          <InputLabel htmlFor="week-select">Week</InputLabel>
          <Select native={true} onChange={(e) => props.actions.selectWeek(e.target.value)}
                  inputProps={{id: 'week-select', name: 'week-select'}}>
            {props.weeks.map(w => (
              <option key={w} value={w}>{moment(w,'yyyy-ww').format("ww/YYYY")}</option>
            ))}
          </Select>

        </FormControl>
        }
        {props.teams.length > 0 &&
        <FormControl className={props.classes.formControl}>
          <InputLabel htmlFor="team-select">Team</InputLabel>
          <Select native={true} onChange={(e) => props.actions.selectTeam(e.target.value!=-1?e.target.value:null)}
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

export default withActions(withStyles(styles)(Top))