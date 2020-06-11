import React from 'react'
import { withActions, withData } from '../context/ppp'
import styled from 'styled-components'


let User = props => <div className={props.className} onClick={props.actions.logout}>{props.data.user.email}</div>

let StyledUser = styled(User)`
background-color: rgb(241, 99, 115);
color: white;
font-size: 14px;
padding: 5px 10px;
border-radius: 10px;
`


export default withActions(withData(StyledUser))