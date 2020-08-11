import React, { useState } from 'react'
import { Form, Button, Alert } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import FormInput from '../../RegisterForms/Sections/FormComponents/FormInput/FormInput'
import { validate } from '../../../utils/loginValidation'
import { LOGIN_USER_SAGA, CLEAR_ERROR } from '../../../redux/reducers/types'
import { useEffect } from 'react'



export default () => {
    
    const history = useHistory()
    const [data, setData] = useState({ email: "", password: "" })
    const auth = useSelector(state => state.auth)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const onChange = e => {
        errors[e.target.name] !== null && setErrors({ ...errors, [e.target.name]: null })
        setData({ ...data, [e.target.name]: e.target.value })
        errors[e.target.name] !== null && dispatch({ type: CLEAR_ERROR })
    }

    useEffect(()=>{
        auth.user !== null && history.push('/admin/adminpanel')
    },[auth.user,history])

    const onSubmit = async(e) => {
        e.preventDefault()
        const validation = validate(data)
        if (validation !== null) {
            setErrors(validation)
        } else {

                await dispatch({ type: LOGIN_USER_SAGA, payload: data })
                console.log(auth)
            dispatch({ type: LOGIN_USER_SAGA, payload: data })
            // history.push('/admin/adminpanel')
        }


    }
    return (
        <Form className="m-3 border rounded p-3" onSubmit={onSubmit}>
            <FormInput
                name="email"
                type="email"
                label="Email"
                onChange={onChange}
                value={data.email}
                placeholder="Enter Email"
                error={errors.email}
            />
            <FormInput
                name="password"
                type="password"
                label="Password"
                onChange={onChange}
                value={data.password}
                placeholder="Enter the password"
                error={errors.password}
            />
            {auth.error && <Alert color="danger">{auth.error}</Alert>}
            <Button color="primary" className="d-block mx-auto" type="submit">Login</Button>
        </Form>
    )
}