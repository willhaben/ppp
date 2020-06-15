import React from 'react'
import {Select} from "@wh-components/core/FormElements/Select/Select"

import moment from "moment";
import {withActions, withData} from "../context/ppp";

let _currentWeek = moment().format('YYYY-ww')

let _hasCurrentWeek = weeks => {
    return weeks.find(w => w === _currentWeek) != null
}

function generateLabel(w) {
    let date = moment(w, "YYYY-ww")
    let label = date.format("ww/YYYY")
        + date.add(1, 'd').format(" (D.M.")
        + "-"
        + moment(w, "YYYY-ww").add(5, 'd').format("D.M.)")
    return label;
}

let select = props => {

    let items = props.weeks.map(w => {
        return {label: generateLabel(w), value: w}
    });

    if (!_hasCurrentWeek(props.weeks)){
        items.unshift({label: generateLabel(_currentWeek), value: _currentWeek})
    }

    return <div>
        <Select
            value={props.data.selectedWeek}
            onChange={e => props.actions.selectWeek(e.target.value)}
            inputProps={{id: "week-select", name: "week-select"}}
            items={items}
        >
        </Select>
    </div>
}

export default withActions(withData(select))