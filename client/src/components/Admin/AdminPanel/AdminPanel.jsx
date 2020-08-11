import React from 'react'
import AdminSideBar from './Sections/AdminSideBar/AdminSideBar'
import AdminPanelMain from './Sections/AdmimPanelMain/AdminPanelMain'



export default () => {
    return (
        <div className="d-flex">
            <AdminSideBar />
            <AdminPanelMain />
        </div>
    )
}