import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default ({ name, options, value, onChange }) => {
    const mapOptions = (elem,index) => (
        <option key={elem+index}>{elem}</option>
    )
    return (
        <FormGroup>
            <Label for={name}>Select {name}</Label>
            <Input value={value} onChange={onChange} type="select" name={name} id={name}>
                {
                    options && options.map(mapOptions)
                }
            </Input>
        </FormGroup>
    )
}