import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import SelectWeek from './select-week'
import SelectTeam from './select-team'
import SelectTag from './select-tag'
import Grid from '@material-ui/core/Grid'
import { withActions, withData } from '../context/ppp'

let Top = props => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="title">
            willhaben ppps
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <SelectWeek weeks={props.weeks}/>
        </Grid>
        <Grid item xs={2}>
          <SelectTeam teams={props.teams }/>
        </Grid>
        <Grid item xs={2}>
          <SelectTag tags={props.tags}/>

        </Grid>
        <Grid item xs={1}>
          <Switch checked={props.data.editMode} disabled={props.data.teamSelected !== undefined}
                  onChange={props.actions.toggleEdit}/>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)

export default withData(withActions(Top))
