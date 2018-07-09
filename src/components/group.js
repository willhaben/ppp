import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Item from './item'
import {withActions} from '../context/ppp'

let Group = (props) => (
  <Card style={{position:'relative', flex: 1, minWidth: 300, margin: 10}}><CardContent>
    <Typography variant="title">{props.heading}</Typography>
    <Button onClick={() => props.actions.newItem(props.type)} style={{position:'absolute', right: 10, top: 10}} variant="fab" color="secondary" mini="true">
      <AddIcon/>
    </Button>
    <List dense={true}>
      {props.items.map(item =>
        <Item item={item} key={item.key} />
      )}
    </List>
  </CardContent></Card>
)

export default withActions(Group)