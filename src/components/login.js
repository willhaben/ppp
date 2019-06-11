import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withActions, withData } from '../context/ppp'
import Button from '@material-ui/core/Button'
import SecurityIcon from '@material-ui/icons/Security'

let Login = props =>
  <Grid container justify="center" >
    <Grid item xs={6}>
      <Paper style={{padding: 20}}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="headline">
              Log in to continue
            </Typography>
            <Typography variant="body1">
              you need a adevinta.com gmail account.
            </Typography>
          </Grid>
          <Grid item>
            {props.data.loginError && <Typography variant="body1">
              There was an error when logging in.
            </Typography>}
            <Button variant="contained" color="secondary" onClick={props.actions.login}>
              Login
              <SecurityIcon />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>

export default withData(withActions(Login))
