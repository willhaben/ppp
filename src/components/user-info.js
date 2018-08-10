import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import Avatar from '@material-ui/core/Avatar'
import { withActions, withData } from '../context/ppp'



let user = props => <Chip color="secondary" onClick={props.actions.logout} avatar={<Avatar><FaceIcon /></Avatar>} label={props.data.user.email}/>

export default withActions(withData(user))