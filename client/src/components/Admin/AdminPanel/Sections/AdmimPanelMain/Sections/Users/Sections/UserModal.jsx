import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalHeader, Alert } from 'reactstrap'
import { useDispatch } from 'react-redux'

import { userAddValidation } from '../../../../../../../../utils/userValidations'
import { Capitalize } from '../../../../../../../../utils/utils'
import { ADD_USER_SAGA, UPDATE_USER_SAGA } from '../../../../../../../../redux/reducers/types'



export default ({ addUserModal, setAddUserModal, type, setModalType, editData }) => {
    const toggle = () => {
        setAddUserModal(prevState => !prevState)
        setModalType(null)
    }
    const [data, setData] = useState(editData ? editData : {})
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        editData && setData(editData)
    }, [addUserModal,setData,editData])

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: null })
    }

    const onSubmit = e => {
        e.preventDefault()
        const variables = {
            ...data,
            firstName: Capitalize(data.firstName),
            lastName: Capitalize(data.lastName)
        }
        const result = userAddValidation(data, type)
        if (result) {
            setErrors(result)
        } else {
            type ? dispatch({ type: UPDATE_USER_SAGA, payload: variables })
                :
                dispatch({ type: ADD_USER_SAGA, payload: variables })
            toggle()
        }
    }

    return (
        <Modal isOpen={addUserModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Register new user</ModalHeader>
            <ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input value={data.firstName} onChange={onChange} type="text" name="firstName" placeholder="Enter first name" />
                        {errors.firstName && (<Alert className="mt-1" color="danger">{errors.firstName}</Alert>)}
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input value={data.lastName} onChange={onChange} type="text" name="lastName" placeholder="Enter last name" />
                        {errors.lastName && (<Alert className="mt-1" color="danger">{errors.lastName}</Alert>)}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input disabled={type ? true : false} value={data.email} onChange={onChange} type="email" name="email" placeholder="Email" />
                        {errors.email && (<Alert className="mt-1" color="danger">{errors.email}</Alert>)}
                    </FormGroup>
                    {
                        type ?
                            <FormGroup>
                                <Label for="old password">Old password </Label>
                                <Input value={data.oldPassword} onChange={onChange} type="password" name="oldPassword" placeholder="Password" />
                                {errors.oldPassword && (<Alert className="mt-1" color="danger">{errors.oldPassword}</Alert>)}
                                <Label for="newpassword">New password</Label>
                                <Input value={data.newPassword} onChange={onChange} type="password" name="newPassword" placeholder="Password" />
                                {errors.newPassword && (<Alert className="mt-1" color="danger">{errors.newPassword}</Alert>)}
                                <Label for="confirmnewpassword">Confirm password</Label>
                                <Input value={data.confirmNewPassword} onChange={onChange} type="password" name="confirmNewPassword" placeholder="Password" />
                                {errors.confirmNewPassword && (<Alert className="mt-1" color="danger">{errors.confirmNewPassword}</Alert>)}
                            </FormGroup>
                            :
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input value={data.password} onChange={onChange} type="password" name="password" placeholder="Password" />
                                {errors.password && (<Alert className="mt-1" color="danger">{errors.password}</Alert>)}
                            </FormGroup>

                    }
                    <div className="d-flex">
                        <Button type="submit" color="primary">{type ? 'Edit User' : 'Add User'}</Button>{' '}
                        <Button className="mx-1" color="secondary" onClick={toggle}>Cancel</Button>
                    </div>
                </Form>
            </ModalBody>

        </Modal>
    )
}