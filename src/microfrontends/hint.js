import React from 'react'
import ReactDOM from "react-dom";

let Hint = props => (
    <div>
            <ul className="hintList" style={{listStyle: 'none', fontSize: '12px'}}>
                <li>Focus on what you achieved (focus on results) rather than on how you did it</li>
                <li>Use a maximum of three bullet points per P (be concise)</li>
                <li>Assume little to no detailed understanding of what you do</li>
                <li>Avoid jargon and abbreviations</li>
            </ul>
    </div>
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