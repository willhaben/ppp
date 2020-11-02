import {onlyLoggedIn} from "./context/ppp";
import React from "react";
import Top from "./components/top";
import Hint from "./components/hint";
import Group from "./components/group";
import {WillhabenThemeProvider} from '@wh-components/core/theme/WillhabenThemeProvider'
import {theme} from '@wh-components/core/theme'
import {GlobalStyle} from '@wh-components/core/GlobalStyle'
import {ExternalStyle} from '@wh-components/core/ExternalStyle'

let TEAMS = ['search', 'adin', 'jobs', 'serenity', 'platform sre', 'apps', 'org', 'dt', 'transactions', 'fe', '3m', 'taas']

let App = onlyLoggedIn(props => <React.Fragment>
    <GlobalStyle/>
    <ExternalStyle/>
    <WillhabenThemeProvider theme={theme}>
        <Top weeks={props.weeks} teams={TEAMS} tags={['#sch']}/>
        <Hint/>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
            width: '100%',
            flexWrap: 'wrap'
        }}>
            <Group heading="Progress" type='progress' items={props.progress}/>
            <Group heading="Plans" type='plans' items={props.plans}/>
            <Group heading="Problems" type='problems' items={props.problems}/>
            <Group heading="Deadlines" type='deadlines' items={props.deadlines}/>
        </div>
    </WillhabenThemeProvider>
</React.Fragment>)

export default App
