import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import SelectWeek from './select-week'
import SelectTeam from './select-team'
import SelectTag from './select-tag'
import UserInfo from './user-info'
import Grid from '@material-ui/core/Grid'
import {withActions, withData} from '../context/ppp'

let Top = props => (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 0.5fr', columnGap: '5px', alignItems: 'center'}}>
        <div>
            <UserInfo/>
        </div>

        <div>
            <SelectWeek weeks={props.weeks}/>
        </div>
        <div>
            <SelectTeam teams={props.teams}/>
        </div>
        <div>
            <SelectTag tags={props.tags}/>

        </div>

    </div>
)

export default withData(withActions(Top))
