import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'reactstrap'

import { GET_ALL_USERS_SAGA, CHANGE_USER_STATUS_SAGA, DELETE_USER_SAGA } from '../../../../../../../redux/reducers/types'
import AddUserModal from './Sections/UserModal'

export default () => {
    const users = useSelector(state => state.auth.users)

    const [addUserModal, setAddUserModal] = useState(false)
    const [editData, setEditData] = useState(null)
    const [modalType, setModalType] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_ALL_USERS_SAGA })
    }, [dispatch])

    const onAddBtnClick = () => {
        setModalType(null)
        setAddUserModal(prevState => !prevState)
    }

    const onEditBtnClick = (data) => {
        setModalType('edit')
        setAddUserModal(prevState => !prevState)
        setEditData(data)
    }
    const onSoftDelClick = (user) => {
        const data = {
            email: user.email,
            active: !user.active
        }
        dispatch({ type: CHANGE_USER_STATUS_SAGA, payload: data })
    }

    const onDelClick = (email) => {
        const data = { email }
        dispatch({ type: DELETE_USER_SAGA, payload: data })
    }

    const mapUsers = (user, index) => (
        <tr key={`adminUser${user.email}${index}`}>
            <th scope="row">{index + 1}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td><Button onClick={() => onEditBtnClick(user)} className="py-0 px-3" color="primary">Edit</Button></td>
            <td>
                {
                    user.active ?
                        <Button
                            disabled={user.isSuperAdmin ? true : false}
                            onClick={() => onSoftDelClick(user)}
                            className="py-0 px-3 d-block mx-auto"
                            color="danger"
                        >Delete</Button>
                        :
                        <div className="d-flex">
                            <Button onClick={() => onSoftDelClick(user)} className="py-0 px-3" color="success">Return</Button>
                            <Button onClick={() => onDelClick(user.email)} className="py-0 px-3 ml-3" color="danger">X</Button>
                        </div>

                }
            </td>
        </tr>
    )
    return (
        <div>
            <AddUserModal
                setModalType={setModalType}
                type={modalType}
                addUserModal={addUserModal}
                setAddUserModal={setAddUserModal}
                editData={editData}
            />
            <Table dark>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length !== 0 && users.map(mapUsers)
                    }
                </tbody>
            </Table>
            <Button onClick={onAddBtnClick} color="primary">Add new user</Button>

        </div>
    )
}