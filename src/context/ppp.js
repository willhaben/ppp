const uuidv1 = require('uuid/v1')
import * as Database from '../services/database'

const Actions = React.createContext({})
const Data = React.createContext({})


class State extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.state.weeks = []
        this.state.selectedWeek = null
        this.state.selectedTeam = null
        this.state.selectedItems = {}

    }

    actions = () => {
        return {
        newItem: this.newItem, 
        onSave: this.onSave,
        selectTeam: this.selectTeam, 
        selectWeek: this.selectWeek,
        onLoggedIn: this.onLoggedIn
    }};

    onLoggedIn = () => {
        this.fetchWeeks()
    }

    fetchWeeks = () => {
        Database.getWeekList().then((w) => {
            this.setState({weeks: w})
            this.selectWeek(w[0])
          })
    }

    selectWeek = (week) => {
        this.setState({ selectedWeek: week })
        Database.getWeek(week).then(items => this.setState({ selectedItems: items }))
    }

    selectTeam = (team) => {
        this.setState({ selectedTeam: team })
    }

    newItem = (type) => {
        let items = this.state.selectedItems
        let item = {
            type: type,
            team: this.state.selectedTeam,
            text: ''
        }
        items[uuidv1()] = item
        this.setState({ selectedItems: items })
    }

    updateItem = (key, item) => {
        let newItems = this.state.selectedItems
        newItems[key] = item
        this.setState({ selectedItems: newItems })
        return Promise.resolve()
    }

    onSave = (key, item) => {
        let updateItem = this.updateItem
        return Database.saveItem(this.state.selectedWeek, key, item).then(() => updateItem(key, item))
    }

    render() {
        return <Data.Provider value={this.state}>
            <Actions.Provider value={this.actions()}>{this.props.children}</Actions.Provider>
            </Data.Provider>
    }
}

export let withActions = (Component) => (props) => <Actions.Consumer>
    {context => <Component actions={context} {...props} />}
</Actions.Consumer>

export let withData = (Component) => (props) => <Data.Consumer>
    {context => <Component data={context} {...props} />}
</Data.Consumer>

export let withStore = (Component) => (props) => <State>
    <Component  {...props} />
</State>

export default Actions