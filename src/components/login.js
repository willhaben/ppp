import * as Auth from '../services/auth'
import {withActions} from '../context/ppp'

class Login extends React.Component {

    constructor (props) {
        super(props)
        this.state = {}
        this.state.loggedIn = false

        Auth.onLogin(this.onLoggedIn)
    }

    onLoggedIn = () => {
        this.setState({loggedIn: true})
        this.props.actions.onLoggedIn()
    }

    signIn =  () => {
        Auth.signInWithPopup().then(this.onLoggedIn)
      }

    render() {
        if(this.state.loggedIn){
            return <div>{this.props.children}</div>
        } else {
            return <div><a onClick={this.signIn}> click to sign in</a></div>
        }
        
    }
}

export default withActions(Login)