import React from 'react'
import { Route } from 'react-router'

import Users from './Sections/Users/Users'
import Participants from './Sections/Participants/Participants'
import ConfirenceDetailPage from './Sections/Participants/ConfirenceDetailPage'

export default () => {
    return(
        <div className="flex-grow-1 mx-1">
            <Route path="/admin/adminpanel/users" render={()=> <Users/>} />
            <Route exact path="/admin/adminpanel/participans" render={()=> <Participants/>} />
            <Route exact path="/admin/adminpanel/participans/:id" render={()=> <ConfirenceDetailPage/>}/>
        </div>
    )
}