import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router'
import AdminPanel from './AdminPanel/AdminPanel'
import LoginForm from './LoginForm/LoginForm'


export default () => {
    const history = useHistory()
    useEffect(() => {
        history.push('/admin/login')
    }, [history])
    return (
        <div>
            <Route path='/admin/login' render={() => <LoginForm />} />
            <Route path='/admin/adminpanel' render={() => <AdminPanel />} />
        </div>

    )
}