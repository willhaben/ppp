import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

let Group = (props) => (
  <Card style={{flex:1, minWidth:300, margin:10}}><CardContent>
    <Typography variant="title">{props.heading}</Typography>
    <List dense={true}>
      {props.items.map(i =>
        <ListItem key={i.key}>
          <ListItemText
            primary={i.data.text}
            secondary={i.data.team}
          />
        </ListItem>,
      )}
    </List>
  </CardContent></Card>
)

export default Group