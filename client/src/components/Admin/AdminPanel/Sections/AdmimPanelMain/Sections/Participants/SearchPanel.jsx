import React from 'react'
import { Input } from 'reactstrap'


const statusOptions = [
    { option: "all" },
    { option: "new" },
    { option: "approved" },
    { option: "declined" },
]

const mapedOptions = (elem) => <option key={elem.option + 'statusselect'}>{elem.option}</option>
export default ({ searchValue, onSearch, onStatusChange }) => {



    return (
        <div className="d-flex my-3">
            <Input onChange={onSearch} className="mx-1" type="text" value={searchValue} placeholder="Search..." />
            <Input onChange={onStatusChange} className="w-25 mx-1" type="select" defaultValue="all">
                {statusOptions.map(mapedOptions)}
            </Input>
        </div >
    )
}