import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ReactDOM from "react-dom";

let Hint = props => (
    <Card style={{position: 'relative', flex: 4, minWidth: 300, margin: 10}}>
        <CardContent>
            <List dense={true}>
                <ListItem><ListItemText primaryTypographyProps={{style: {fontWeight: 'bold'}}}
                                        primary="Focus on what you achieved (focus on results) rather than on how you did it"/></ListItem>
                <ListItem><ListItemText primaryTypographyProps={{style: {fontWeight: 'bold'}}}
                                        primary="Use a maximum of three bullet points per P (be concise)"/></ListItem>
                <ListItem><ListItemText primaryTypographyProps={{style: {fontWeight: 'bold'}}}
                                        primary="Assume little to no detailed understanding of what you do"/></ListItem>
                <ListItem><ListItemText primaryTypographyProps={{style: {fontWeight: 'bold'}}}
                                        primary="Avoid jargon and abbreviations"/></ListItem>
            </List>
        </CardContent>
    </Card>
);

class HintElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let createShadow = this.getAttribute("shadow");
        if (createShadow) {
            let shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = ` <div id="hint-container"></div>  `
            this.domContainer = shadow.querySelector('#hint-container');
        } else {
            this.innerHTML = ` <div id="hint-container"></div>`
            this.domContainer = document.querySelector('#hint-container');
        }

        ReactDOM.render(<Hint/>, this.domContainer)
    }

}

customElements.define("wh-ppp-hint", HintElement);

export default Hint