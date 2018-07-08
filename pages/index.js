import * as Auth from '../src/services/auth'
import * as Database from '../src/services/database'
import Top from '../src/components/top'
import Group from '../src/components/group'
import Actions from '../src/context/ppp'
import Login from '../src/components/login'

const uuidv1 = require('uuid/v1')

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.state.weeks = []
    this.state.selectedWeek = null
    this.state.selectedTeam = null
    this.state.selectedItems = {}
    Auth.onLogin(user => {
      this.setState({loggedIn: true})
      Database.getWeekList().then((w) => {
        this.setState({weeks: w})
        this.selectWeek(w[0])
      })
    })
  }

  selectWeek =  (week) => {
    this.setState({selectedWeek: week})
    Database.getWeek(week).then(items => this.setState({selectedItems: items}))
  }

  selectTeam =  (team) => {
    this.setState({selectedTeam: team})
  }

  getTeams =  () => {
    return Object.keys(this.state.selectedItems).map((key) => {
      return this.state.selectedItems[key].team
    }).filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos
    })

  }

  newItem  = (type) => {
    let items = this.state.selectedItems
    let item = {
      type: type,
      team: this.state.selectedTeam,
      text: ''
    }
    items[uuidv1()] = item
    this.setState({selectedItems: items})
  }

  updateItem = (key, item) => {
    let newItems = this.state.selectedItems
    newItems[key] = item
    this.setState({selectedItems: newItems})
    return Promise.resolve()
  }
  
  onSave = (key, item) => {
    let updateItem = this.updateItem
    return Database.saveItem(this.state.selectedWeek, key, item).then(() => updateItem(key, item))
  }

  getItems   = (type) => {
    let currentTeam = this.state.selectedTeam
    return Object.keys(this.state.selectedItems).map((key, index) => {
      return {
        key: key,
        data: this.state.selectedItems[key]
      }
    }).filter(i => i.data.type === type)
      .filter(i => currentTeam === null || i.data.team == null || i.data.team === currentTeam)
      .sort((a, b) => a.data.team && b.data.team ? a.data.team.localeCompare(b.data.team): -1)
  }

  actions = { newItem: this.newItem, onSave: this.onSave, 
    selectTeam: this.selectTeam, selectWeek: this.selectWeek  
  };

  render () {
    return <Login>
       <Actions.Provider value={this.actions}>
        <Top weeks={this.state.weeks} teams={this.getTeams()}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'top',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          <Group heading="Progress" type='progress' items={this.getItems('progress')} />
          <Group heading="Plans" type='plans' items={this.getItems('plans')} />
          <Group heading="Problems" type='problems' items={this.getItems('problems')} />
          <Group heading="Deadlines" type='deadlines' items={this.getItems('deadlines')} />
        </div>
        </Actions.Provider>
      </Login>
  
  }


  
}

export default Main