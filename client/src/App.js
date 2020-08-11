import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar/AppNavbar';
import { Route, Switch } from 'react-router';
import RegisterForms from './components/RegisterForms/RegisterForms';
import { GET_ALL, AUTH_USER_SAGA } from './redux/reducers/types';
import { useDispatch } from 'react-redux';
import Admin from './components/Admin/Admin';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: GET_ALL })
    const token = localStorage.getItem('token')
    token && dispatch({type:AUTH_USER_SAGA,payload:token})
  }, [dispatch])


  return (
    <div className="App">
      <AppNavbar />
      <Switch>
        <Route path='/register' render={() => <RegisterForms />} />
        <Route path='/admin' render={() => <Admin />} />
      </Switch>
    </div>
  );
}

export default App;
