import * as Auth from '../src/services/auth'
import * as Database from '../src/services/database'
import Top from '../src/components/top'
import Group from '../src/components/group'
const uuidv1 = require('uuid/v1');

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.state.loggedIn = false
    this.state.weeks = []
    this.state.selectedWeek = null
    this.state.selectedItems = {}

    this.signIn = this.signIn.bind(this)
    this.newItem = this.newItem.bind(this)
    this.selectWeek = this.selectWeek.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.getItems = this.getItems.bind(this)
    Auth.onLogin(user => {
      this.setState({loggedIn: true})
      Database.getWeekList().then((w) => {
        this.setState({weeks: w})
        this.selectWeek(w[0])
      })
    })

  }

  selectWeek (week) {
    this.setState({selectedWeek: week})
    Database.getWeek(week).then(items => this.setState({selectedItems: items}))
  }

  signIn () {
    Auth.signInWithPopup().then(() => this.setState({loggedIn: true}))
  }

  newItem (type) {
    let items = this.state.selectedItems
    let item = {
      type: type,
      team: '',
      text: ''
    }
    items[uuidv1()] = item
    this.setState({selectedItems: items})
  }

  updateItem (key, item) {
    let newItems = this.state.selectedItems
    newItems[key] = item
    this.setState({selectedItems: newItems})
    return Promise.resolve()
  }

  getItems (type) {
    let currentWeek = this.state.selectedWeek
    let updateItems = this.updateItem
    return Object.keys(this.state.selectedItems).map((key, index) => {
      let onSave = (item) => {
        return Database.saveItem(currentWeek, key, item).then(() => updateItems(key, item))
      }
      return {
        key: key,
        data: this.state.selectedItems[key],
        onSave: onSave
      }
    }).filter(i => i.data.type === type).sort((a, b) => a.data.team.localeCompare(b.data.team))
  }

  render () {
    return <div>
      {this.state.loggedIn && <div>
        <Top weeks={this.state.weeks} onWeekSelected={this.selectWeek}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'top',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          <Group heading="Progress" items={this.getItems('progress')} onNewItem={()=>this.newItem('progress')}/>
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