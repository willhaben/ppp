import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import moment from 'moment'
import SelectWeek from './select-week'
import { withActions, withData } from '../context/ppp'

const styles = {
  title: {
    flex: 3
  },
  formControl: {
    flex: 3,
    margin: '2px',
    minWidth: 120
  },
  add: {
    flex: 1,
    textAlign: 'right'
  }
}




let Top = props => (
  <AppBar position="static" color="default">
    <Toolbar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography variant="title" className={props.classes.title}>
          willhaben ppps
        </Typography>


        <SelectWeek weeks = {props.weeks}/>


        <FormControl className={props.classes.formControl}>
          <InputLabel htmlFor="team-select">Team</InputLabel>
          <Select
            value={props.data.selectedTeam}
            native={true}
            onChange={e =>
              props.actions.selectTeam(
                e.target.value !== '-1' ? e.target.value : undefined
              )
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

        <FormControl className={props.classes.formControl}>
          <InputLabel htmlFor="team-select">Tags</InputLabel>
          <Select
            value={props.data.selectedTag}
            native={true}
            onChange={e =>
              props.actions.selectTag(
                e.target.value !== '-1' ? e.target.value : undefined
              )
            }
            inputProps={{id: 'team-select', name: 'team-select'}}
          >
            <option key="all" value={-1}>
              All
            </option>
            {props.tags.map(w => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </Select>
        </FormControl>

        <Switch checked={props.data.editMode} disabled={props.data.teamSelected !== undefined}
                onChange={props.actions.toggleEdit}/>
      </div>
    </Toolbar>
  </AppBar>
)

export default withData(withActions(withStyles(styles)(Top)))
