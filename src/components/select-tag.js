import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import moment from "moment";
import { withActions, withData } from "../context/ppp";


let select = props => <FormControl >
  <InputLabel htmlFor="team-select">Tags</InputLabel>
  <Select
    value={props.data.selectedTag}
    native={true}
    onChange={e =>
      props.actions.selectTag(
        e.target.value !== '-1' ? e.target.value : undefined
      )
    }
    inputProps={{id: 'team-select', name: 'team-select'}}
  >
    <option key="all" value={-1}>
      All
    </option>
    {props.tags.map(w => (
      <option key={w} value={w}>
        {w}
      </option>
    ))}
  </Select>
</FormControl>

export default withActions(withData(select))