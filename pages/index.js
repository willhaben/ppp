import Top from '../src/components/top'
import Head from 'next/head'
import Group from '../src/components/group'
import { withStore, withData, onlyLoggedIn , onlyLoggedOut} from '../src/context/ppp'
import Login from '../src/components/login'
import Hint from '../src/components/hint'
import NoSsr from '@material-ui/core/NoSsr'

let TEAMS = ['omg', 'kitt', 'jobs', 'serenity', 'qa', 'ops', 'apps', 'org', 'god', 'asap', 'web', 'tech-fit']

let App = onlyLoggedIn(props => <React.Fragment>
    <Top weeks={props.weeks} teams={TEAMS} tags={['#sch']}/>
    <Hint/>
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'top',
        width: '100%',
        flexWrap: 'wrap'
    }}>
        <Group heading="Progress" type='progress' items={props.progress}/>
        <Group heading="Plans" type='plans' items={props.plans}/>
        <Group heading="Problems" type='problems' items={props.problems}/>
        <Group heading="Deadlines" type='deadlines' items={props.deadlines}/>
    </div>
</React.Fragment>)

class Main extends React.Component {

  constructor (props) {
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

  render () {

    let ShowLogin = onlyLoggedOut(Login)

    return <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charSet="utf-8"/>
      </Head>
      <NoSsr key="no-ssr">
        <ShowLogin/>
        <App weeks={this.props.data.weeks} plans={this.getItems('plans')} problems={this.getItems('problems')} deadlines={this.getItems('deadlines')}  progress={this.getItems('progress')}/>
      </NoSsr>
    </div>

  }

}

export default withStore(withData(Main))
