const uuidv1 = require('uuid/v1')
import * as Database from '../services/database'
import * as Auth from '../services/auth'
import React from 'react'
import moment from 'moment'

const Actions = React.createContext({})
const Data = React.createContext({})

class State extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.loggedIn = false
    this.state.loginError = false
    this.state.user = {}
    this.state.weeks = []
    this.state.selectedWeek = undefined
    this.state.selectedTeam = undefined
    this.state.selectedTag = undefined
    this.state.editMode = false
    this.state.selectedItems = {}
    Auth.onLogin(this._onLoggedIn, this._onLoggedInFailed)
  }

  actions = () => {
    return {
      newItem: this.newItem,
      onSave: this.onSave,
      selectTeam: this.selectTeam,
      selectWeek: this.selectWeek,
      deleteItem: this.deleteItem,
      toggleEdit: this.toggleEdit,
      selectTag: this.selectTag,
      logout: this.logout,
      login: this.login
    }
  }

  toggleEdit = () => {
    let editMode = this.state.selectedTeam === undefined ? false : !this.state.editMode
    this.setState({editMode: editMode})
  }

  logout = () => {
    Auth.onLogout()
    this.setState({loggedIn: false})
  }

  deleteItem = (key) => {
    Database.deleteItem(this.state.selectedWeek, key)
    let items = this.state.selectedItems
    delete items[key]
    this.setState({selectedItems: items})
  }

  _onLoggedIn = (info) => {
    this.setState({loggedIn: true,loginError:false, user: info})
    this.fetchWeeks()
  }

  _onLoggedInFailed = () => {
    this.setState({loginError: true})
  }

  login = () => {
    let onLoggedIn = this._onLoggedIn
    Auth.signInWithPopup()
  }

  fetchWeeks = () => {
    Database.getWeekList().then(w => {
      this.setState({weeks: w})
      this.selectWeek(w[0])
    })
  }

  selectWeek = week => {
    this.setState({selectedWeek: week})
    Database.getWeek(week).then(items =>
      this.setState({selectedItems: items})
    )
  }

  selectTeam = team => {
    let editMode = team === undefined ? false : this.state.editMode
    this.setState({selectedTeam: team, editMode: editMode})
  }

  selectTag = tag => {
    this.setState({selectedTag: tag})
  }

  newItem = type => {
    let items = this.state.selectedItems
    let item = {
      type: type,
      team: this.state.selectedTeam,
      text: '',
      order: moment().valueOf()
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
    return Database.saveItem(this.state.selectedWeek, key, item).then(() =>
      updateItem(key, item)
    )
  }

  render () {
    return (
      <Data.Provider value={this.state}>
        <Actions.Provider value={this.actions()}>
          {this.props.children}
        </Actions.Provider>
      </Data.Provider>
    )
  }
}

export let withActions = Component => props => (
  <Actions.Consumer>
    {context => <Component actions={context} {...props} />}
  </Actions.Consumer>
)

export let withData = Component => props => (
  <Data.Consumer>
    {context => <Component data={context} {...props} />}
  </Data.Consumer>
)

export let withStore = Component => props => (
  <State>
    <Component {...props} />
  </State>
)

export let onlyLoggedIn = Component => props => (
  <Data.Consumer>
    {context => context.loggedIn && <Component data={context} {...props} />}
  </Data.Consumer>
)

export let onlyLoggedOut = Component => props => (
  <Data.Consumer>
    {context => !context.loggedIn && <Component data={context} {...props} />}
  </Data.Consumer>
)

export default Actions
