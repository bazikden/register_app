import React, { useState } from 'react'
import { Navbar, NavbarToggler, NavItem, Collapse, Nav } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_USER_SAGA } from '../../redux/reducers/types'


export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const toggle = () => setIsOpen(prevState => !prevState);

    const onLogoutClick = () => {
        dispatch({ type: LOGOUT_USER_SAGA })
    }
    return (
        <Navbar color="light" light expand="md">
            <NavLink to="/">Home</NavLink>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-5 w-100 d-flex justify-content-between" navbar>
                    <NavItem>
                        <NavLink className="px-2" to="/register">Register Confirence</NavLink>
                    </NavItem>
                    <NavItem>
                        {
                            user ?
                                (
                                    <>
                                        <NavLink to='/admin/adminpanel'>Admin Panel</NavLink>
                                        <NavLink onClick={onLogoutClick} className="px-2" to="/">Logout</NavLink>
                                    </>
                                )
                                :
                                <NavLink className="px-2" to="/admin">Login</NavLink>

                        }
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}