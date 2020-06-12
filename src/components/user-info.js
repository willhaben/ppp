import React from 'react'
import {withActions, withData} from '../context/ppp'
import styled from 'styled-components'
import Profile from '@wh-components/icons/Profile'
import {Badge} from '@wh-components/core/Badge/Badge'


let User = props => <div  onClick={props.actions.logout}>
    <Badge Icon={Profile} marginRight="s">
        {props.data.user.email}
    </Badge></div>

export default withActions(withData(User))