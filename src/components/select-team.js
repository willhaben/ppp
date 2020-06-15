import React from 'react'
import {withActions, withData} from "../context/ppp";
import {Select} from "@wh-components/core/FormElements/Select/Select"

let select = props => {
    let teams = props.teams.map(p => {
        return {label: p, value: p}
    });

    teams.unshift({label: "all", value: -1})
    return (<Select

        onChange={e => props.actions.selectTeam(
            e.target.value !== '-1' ? e.target.value : undefined
        )}
        items={teams}
    >
    </Select>)
}

export default withData(withActions(select))