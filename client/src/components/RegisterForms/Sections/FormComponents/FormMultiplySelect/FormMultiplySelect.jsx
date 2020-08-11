import React, { useState } from 'react'
import { Label, Input } from 'reactstrap'
import { useSelector } from 'react-redux'

export default ({value, onChange}) => {
    const countries = useSelector(state => state.countries.countries)
    const [input,setInput] = useState('')
    const [allCountries,setAllCountries] = useState(countries)

    const onInputChange = (e) => {
        const selected = countries.filter(country => {
            return country.name.slice(0,e.target.value.length).toLowerCase() === e.target.value.toLowerCase()
       
        })
        setAllCountries(selected)
        setInput(e.target.value)
    }

    const onSelectChange = (e) => {
        setInput(e.target.value)
        onChange(e)
    }

    const mapCountries = (country) => (
        <option key={country.name+country.population}>{country.name}</option>
    )
        
    

    return(
        <div>
            <Label for="country">Choose a country</Label>
            <Input onChange={onInputChange} className="my-3" type="text" value ={input}/>
            <Input type="select" onChange={onSelectChange}  name="country" id="country" multiple>
                {
                    allCountries && allCountries.map(mapCountries)
                }
            </Input>
            </div>
    )
}