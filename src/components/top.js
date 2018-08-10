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
import SelectTeam from './select-team'
import SelectTag from './select-tag'
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

        <SelectTeam teams = {props.teams }/>

        <SelectTag tags={props.tags}/>

        <Switch checked={props.data.editMode} disabled={props.data.teamSelected !== undefined}
                onChange={props.actions.toggleEdit}/>
      </div>
    </Toolbar>
  </AppBar>
)

export default withData(withActions(withStyles(styles)(Top)))
