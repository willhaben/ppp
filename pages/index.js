import Top from '../src/components/top'
import Head from 'next/head'
import Group from '../src/components/group'
import {withStore, withData} from '../src/context/ppp'
import Login from '../src/components/login'

class Main extends React.Component {

    constructor(props) {
        super(props)
    }

    TEAMS = ['omg','kitt','jobs','safe','qa','ops','mad','org','god','asap']

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
            .filter(i => currentTag === undefined || i.data.text === undefined ||i.data.text === '' || i.data.text.includes(currentTag))
            .sort(currentTeam === undefined ? sortItems : sortItemsWithTeam)
    }


    render() {
        return <div>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
        </Head>
            <Login>
            <Top weeks={this.props.data.weeks} teams={this.TEAMS} tags={['#sch']}/>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'top',
                width: '100%',
                flexWrap: 'wrap'
            }}>
                <Group heading="Progress" type='progress' items={this.getItems('progress')}/>
                <Group heading="Plans" type='plans' items={this.getItems('plans')}/>
                <Group heading="Problems" type='problems' items={this.getItems('problems')}/>
                <Group heading="Deadlines" type='deadlines' items={this.getItems('deadlines')}/>
            </div>
        </Login>
        </div>

    }


}

export default withStore(withData(Main))