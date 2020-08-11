import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const styles = {
    list: { height: '100vh', listStyle: 'none' },
    item: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '5px 0',
    },
    link: {
        display: 'block',
        width: '100%',
        height: '100%',
        padding: '10px',
        textAlign: 'center',
        textDecoratin: 'none'
        // cursor: 'pointer'
    }
}

export default () => {
    const user = useSelector(state => state.auth.user)
    return (
        <ul style={styles.list} className="w-25 border p-1">
            {user && user.isSuperAdmin && <li style={styles.item}><NavLink style={styles.link} to="/admin/adminpanel/users">Users</NavLink></li>}
            <li style={styles.item}><NavLink style={styles.link} to="/admin/adminpanel/participans">Participants</NavLink></li>
        </ul>
    )
}