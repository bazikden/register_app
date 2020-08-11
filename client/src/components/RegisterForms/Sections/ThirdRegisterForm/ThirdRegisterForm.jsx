import React, { useRef, useEffect } from 'react'
import { Form, Button } from 'reactstrap'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'


export default () => {
    const history = useHistory()
    const info = useSelector(state => state.info.info)
    const formRef = useRef()

    useEffect(() => {
        formRef.current.classList.add('active-form')
    }, [])

    const onFinishClick = () => { }

    const onFormSubmit = e => {
        e.preventDefault()
        history.push('/')
    }




    return (
        <div ref={formRef} className="first-form form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <div>
                    <h1 className='text-center'>Registration success</h1>
                    <p className='text-center'>Dear {info.firstName} {info.lastnane}</p>
                    <p className='text-center'>A letter was send at {info.email}</p>
                    <div>Company name : {info.companyName}</div>
                    <div>Company name : {info.country}</div>
                </div>
                <Button onClick={onFinishClick} type='submit' color="primary" className="d-block mx-auto">Finish</Button>
            </Form>
        </div>
    )
}
