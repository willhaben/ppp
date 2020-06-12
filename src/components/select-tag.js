import React from 'react'
import {Select} from "@wh-components/core/FormElements/Select/Select"


import {withActions, withData} from "../context/ppp";



let select = props => {
    let items = props.tags.map(p => {
        return {label: p, value: p}
    });

    items.push({label: "all", value: -1})
    return <Select
        onChange={e =>
            props.actions.selectTag(
                e.target.value !== '-1' ? e.target.value : undefined
            )
        }
        items={items}
    >

    </Select>
}

export default withActions(withData(select))