import React from 'react'
import { FormGroup, Label, Input, Alert } from 'reactstrap'

export default ({ name, onChange, placeholder, value, label, onClick, error, type }) => {
    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input onClick={onClick} value={value} onChange={onChange} type={type ? type : 'text'} name={name} id={name} placeholder={placeholder} />
            {(error !== undefined && error !== null) && (<Alert color="danger">{error}</Alert>)}
        </FormGroup>
    )
}