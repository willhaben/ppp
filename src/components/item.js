import SvgIcon from '@material-ui/core/SvgIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { debounce } from 'underscore'
import {withActions, withData} from '../context/ppp';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.edit = false;
        this.state.team = props.item.data.team;
        this.state.text = props.item.data.text;
    }


    onChange = (e) => {
        let state = {};
        state[e.target.name] = e.target.value;

        this.setState(state, this.onSave)
    }

    onSave = debounce(() => {
        let item = {
            team: this.state.team,
            text: this.state.text,
            type: this.props.item.data.type
        };
        this.props.actions
            .onSave(this.props.item.key, item)
            .then(() => this.setState({edit: false}));
    },300)

    toggleEdit = () => {
        this.setState({edit: !this.state.edit});
    }

    onDelete = () => {
        this.props.actions.deleteItem(this.props.item.key)
    }

    render() {
        return (
            <ListItem key={this.props.item.key}>
                {!this.props.data.editMode && (
                    <ListItemText
                        primary={'[' + this.props.item.data.team + '] ' + this.props.item.data.text}
                    />
                )}
                {this.props.data.editMode && (

                        <TextField fullWidth={true}
                            name="text"
                            defaultValue={this.props.item.data.text}
                            onChange={this.onChange}
                        />
                   
                )}

                {this.props.data.editMode &&

                    <IconButton size="small" onClick={this.onDelete}>
                        <SvgIcon>
                            <path fill="#000000"
                                  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                        </SvgIcon>
                    </IconButton>

                }


            </ListItem>
        );
    }
}

export default withData(withActions(Item));
