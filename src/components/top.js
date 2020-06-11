import React from 'react'
import styled from 'styled-components'
import SelectWeek from './select-week'
import SelectTeam from './select-team'
import SelectTag from './select-tag'
import UserInfo from './user-info'
import {withActions, withData} from '../context/ppp'

let Grid = styled.div`
    display: grid;

    grid-template-columns:  1fr 3fr 1fr 0.6fr 0.6fr;
      @media (max-width: 1000px) {
        grid-template-columns: 1fr 0fr 2fr 1fr 1fr;
    }
    column-gap: 5px;
    align-items: center
`

let Top = props => (
    <Grid>

        <UserInfo/>
        <div></div>
            <SelectWeek weeks={props.weeks}/>
            <SelectTeam teams={props.teams}/>
            <SelectTag tags={props.tags}/>

    </Grid>
)

export default withData(withActions(Top))
