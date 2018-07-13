import Top from '../src/components/top'
import Group from '../src/components/group'
import {withStore, withData} from '../src/context/ppp'
import Login from '../src/components/login'

class Main extends React.Component {

  constructor (props) {
    super(props)
  }

  
  getTeams =  () => {
    return Object.keys(this.props.data.selectedItems).map((key) => {
      return this.props.data.selectedItems[key].team
    }).filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos
    })

  }


  getItems   = (type) => {
    let currentTeam = this.props.data.selectedTeam

    let sortItems = (a,b) => {
      return a.data.team && b.data.team ? a.data.team.localeCompare(b.data.team): -1
    }

    let sortItemsWithTeam = (a,b) => {
      if(a.data.text == null || a.data.text === '') return -1
      if(b.data.text == null || b.data.text === '') return 1
      return a.data.text.localeCompare(b.data.text)
    }

    return Object.keys(this.props.data.selectedItems).map((key, index) => {
      return {
        key: key,
        data: this.props.data.selectedItems[key]
      }
    }).filter(i => i.data.type === type)
      .filter(i => currentTeam === undefined || i.data.team == null || i.data.team === currentTeam)
      .sort(currentTeam == null ? sortItems : sortItemsWithTeam)
  }

  

  render () {
    return <Login>
        <Top weeks={this.props.data.weeks} teams={this.getTeams()}/>
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
      </Login>
  
  }


  
}

export default withStore(withData(Main))