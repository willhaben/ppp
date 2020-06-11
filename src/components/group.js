import React from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import styled from 'styled-components'
import Item from "./item";
import {withActions, withData} from '../context/ppp';

let AddButton = styled.button`
border: 1px solid;
    border-radius: 5px;
    position: absolute;
    right: 20px;
    top: 15px;
    text-align: center;
    vertical-align: middle;
    font-size: 18px;
    color: rgb(255, 255, 255);
    background-color: rgb(239, 170, 84);
`

let Group = props => (
    <Card style={{position: "relative", flex: 1, minWidth: 300, margin: 10}}>
        <CardContent>
            <Typography variant="title">{props.heading}</Typography>
            {props.data.editMode &&
            <AddButton onClick={() => props.actions.newItem(props.type)}>+</AddButton>}
            <List dense={true}>
                {props.items.map(item => <Item item={item} key={item.key}/>)}
            </List>
        </CardContent>
    </Card>
);

export default withData(withActions(Group));
