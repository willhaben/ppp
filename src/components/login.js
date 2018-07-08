import * as Auth from '../services/auth'

export default class Login extends React.Component {

    constructor (props) {
        super(props)
        this.state = {}
        this.state.loggedIn = false

        Auth.onLogin(user => {
            this.setState({loggedIn: true})
          })
    }

    signIn =  () => {
        Auth.signInWithPopup().then(() => this.setState({loggedIn: true}))
      }

    render() {
        if(this.state.loggedIn){
            return <div>{this.props.children}</div>
        } else {
            return <div><a onClick={this.signIn}> click to sign in</a></div>
        }
        
    }
}