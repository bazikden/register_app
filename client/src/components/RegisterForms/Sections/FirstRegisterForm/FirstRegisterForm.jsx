import React, { useState, useRef, useEffect } from 'react'
import { Form, Button } from 'reactstrap'
import { useHistory } from 'react-router'
import { validate } from '../../../../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import { SET_INFO } from '../../../../redux/reducers/types'
import FormInput from '../FormComponents/FormInput/FormInput'

export default () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const info = useSelector(state => state.info.info)
    const formRef = useRef()
    const [errors,setErrors] = useState({})
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(()=>{
        Object.keys(info).length !== 0 &&
        setValues({
            firstName:info.firstName,
            lastName:info.lastName,
            email:info.email
        })
    },[info])

    useEffect(() => {
        formRef.current.classList.add('active-form')
    }, [])

    const onChange = e => {
        setErrors({...errors,[e.target.name]:null})
        setValues({ ...values, [e.target.name]: e.target.value })
    }



    const onFormSubmit = e => {
        e.preventDefault()
        const validation = validate(values,'first')
        if(validation === null){   
            const classList = formRef.current.classList
            classList.remove('active-form')
            classList.add('remove-form')
            setTimeout(()=>{
                dispatch({type:SET_INFO,payload:values})
                classList.remove('remove-form')
                history.push('/register/second')
            },1000)
        } else{
            setErrors(validation)
        }


    }
    return (
        <div ref={formRef} className="first-form form-wrapper">
            <Form onSubmit={onFormSubmit}>
                    <FormInput 
                        value={values.firstName}
                        onChange={onChange} 
                        name="firstName" 
                        placeholder="Enter first name"
                        error = {errors.firstName}
                        label='First name'

                    />

                    <FormInput 
                        value={values.lastName} 
                        onChange={onChange} 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Enter last name"
                        error = {errors.lastName}
                        label = 'Last name'  
                    />

                    <FormInput
                        value={values.email} 
                        onChange={onChange} 
                        name="email" 
                        id="email" 
                        placeholder="Enter email"
                        error = {errors.email}
                        label = 'Email'  
                    />
                <Button  type='submit' color="primary" className="d-block ml-auto">Next</Button>
            </Form>
        </div>
    )
}