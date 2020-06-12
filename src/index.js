import {withStore, withData, onlyLoggedIn, onlyLoggedOut} from './context/ppp'
import Login from './components/login'
import App from './app'
import React from 'react'
import ReactDOM from 'react-dom'


class Main extends React.Component {

    constructor(props) {
        super(props)
    }

    getTeams = () => {
        return Object.keys(this.props.data.selectedItems).map((key) => {
            return this.props.data.selectedItems[key].team
        }).filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos
        })

    }

    getItems = (type) => {
        let currentTeam = this.props.data.selectedTeam
        let currentTag = this.props.data.selectedTag

        let sortItems = (a, b) => {
            return a.data.team && b.data.team ? a.data.team.localeCompare(b.data.team) : -1
        }

        let sortItemsWithTeam = (a, b) => {
            return a.data.order - b.data.order
        }

        return Object.keys(this.props.data.selectedItems).map((key, index) => {
            return {
                key: key,
                data: this.props.data.selectedItems[key]
            }
        }).filter(i => i.data.type === type)
            .filter(i => currentTeam === undefined || i.data.team == null || i.data.team === currentTeam)
            .filter(i => currentTag === undefined || i.data.text === undefined || i.data.text === '' || i.data.text.includes(currentTag))
            .sort(currentTeam === undefined ? sortItems : sortItemsWithTeam)
    }

    render() {

        let ShowLogin = onlyLoggedOut(Login)

        return <div>
            <ShowLogin/>
            <App weeks={this.props.data.weeks} plans={this.getItems('plans')} problems={this.getItems('problems')}
                 deadlines={this.getItems('deadlines')} progress={this.getItems('progress')}/>
        </div>

    }

}

let AppMain = withStore(withData(Main));
export default AppMain
const domContainer = document.querySelector('#container');
ReactDOM.render(<AppMain/>, domContainer);