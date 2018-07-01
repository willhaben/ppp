import * as Auth from '../src/auth'
import firebase from '../src/firebase-init'
import Top from '../src/components/top'
import Group from '../src/components/group'

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.state.loggedIn = false
    this.state.weeks = []
    this.state.selectedWeek = {}

    this.signIn = this.signIn.bind(this)
    this.selectWeek = this.selectWeek.bind(this)
    this.getItems = this.getItems.bind(this)
    Auth.onLogin(user => {
      this.setState({loggedIn: true})
      this.getWeeks().then((w) => {
        this.setState({weeks: w})
        this.selectWeek(w[0])
      })
    })

  }

  getWeeks () {
    return firebase.database().ref('/weeks').once('value').then(function (snapshot) {
      let weeks = []
      snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key
        weeks.push(key)
      })
      return Promise.resolve(weeks)
    })
  }

  selectWeek (week) {
    let items = {}
    let _this = this
    firebase.database().ref('/weeks/' + week).once('value').then(snapshot => {
      snapshot.forEach(child => {
        items[child.key] = child.val()
      })
      _this.setState({selectedWeek: items})
    })

  }

  signIn () {
    Auth.signInWithPopup().then(() => this.setState({loggedIn: true}))
  }

  getItems (type) {
    return Object.keys(this.state.selectedWeek).map((key, index) => {
      return {
        key: key,
        data: this.state.selectedWeek[key]
      }
    }).filter(i => i.data.type === type)
  }

  render () {
    return <div>
      {this.state.loggedIn && <div>
        <Top weeks={this.state.weeks} onWeekSelected={this.selectWeek}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'top', width: '100%', flexWrap:'wrap'}}>
          <Group heading="Progress" items={this.getItems('progress')}/>
          <Group heading="Plans" items={this.getItems('plans')}/>
          <Group heading="Problems" items={this.getItems('problems')}/>
          <Group heading="Deadlines" items={this.getItems('deadlines')}/>
        </div>

      </div>}
      {!this.state.loggedIn && <div><a onClick={this.signIn}> click to sign in</a></div>}
    </div>
  }

}

export default Main