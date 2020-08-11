import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router'
import FirstRegisterForm from './Sections/FirstRegisterForm/FirstRegisterForm'
import SecondRegisterForm from './Sections/SecondRegisterForm/SecondRegisterForm'
import ThirdRegisterForm from './Sections/ThirdRegisterForm/ThirdRegisterForm'

export default () => {
    const history = useHistory()
    useEffect(()=>{
        history.push('/register/first')
    },[history])
    return(
        <div className="register-forms">
            <Route path='/register/first' render={()=> <FirstRegisterForm/>}/>
            <Route path='/register/second' render={()=> <SecondRegisterForm/>}/>
            <Route path='/register/last' render={()=> <ThirdRegisterForm/>}/>
        </div>
    )
}