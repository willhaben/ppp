const Actions = React.createContext({})

export let withActions = (Component) => (props) => <Actions.Consumer> 
{context => <Component actions={context} {...props}/>}
</Actions.Consumer>

export default Actions