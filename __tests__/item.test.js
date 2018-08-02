import { shallow, mount } from 'enzyme'
import React from 'react'

import {Item} from '../src/components/item.js'

describe('With Enzyme', () => {
    it('Renders in view mode', () => {
        const app = mount(<Item key={'somekey'} item={{data:{text:'ppp text', team:'superteam'}}} data={{editMode: false}}/>)

        expect(app.find('ListItemText').text()).toEqual('[superteam] ppp text')
    })

    it('Renders in edit mode', () => {
        const app = mount(<Item key={'somekey'} item={{data:{text:'ppp text', team:'superteam'}}} data={{editMode: true}}/>)

        expect(app.find('TextField').prop('defaultValue')).toEqual('ppp text')
    })

    it('Calls onDelete', () => {

        let mock = jest.fn();
        const app = mount(<Item key={'somekey'} item={{data:{text:'ppp text', team:'superteam'}}} data={{editMode: true}}
                                actions={{deleteItem:mock}}/>)
        app.find('IconButton').simulate('click')
        expect(mock).toHaveBeenCalled()
    })

    it('Calls debounced onSave', () => {

        let mock = jest.fn(() => Promise.resolve());
        jest.useFakeTimers();

        const app = mount(<Item key={'somekey'} item={{data:{text:'ppp text', team:'superteam'}}} data={{editMode: true}}
                                actions={{onSave:mock}}/>)

        let textfield = app.find('TextField').find('input');

        textfield.simulate('change')
        textfield.simulate('change')
        textfield.simulate('change')
        jest.advanceTimersByTime(400);
        textfield.simulate('change')
        textfield.simulate('change')
        jest.advanceTimersByTime(400);

        expect(mock).toHaveBeenCalledTimes(2)
    })


})

