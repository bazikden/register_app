import React, { useState, useRef, useEffect } from 'react'
import { Form, FormGroup, Label, Button, Alert } from 'reactstrap'
import { useHistory } from 'react-router'
import DatePicker from 'react-date-picker';
import FormSelect from '../FormComponents/FormSelect/FormSelect';
import FormInput from '../FormComponents/FormInput/FormInput';
import RangePicker from "react-range-picker"
import FormModal from '../FormComponents/Modal/FormModal';
import { useDispatch, useSelector } from 'react-redux';
import { SET_INFO, SAVE_CONF_INFO_SAGA } from '../../../../redux/reducers/types';
import { validate } from '../../../../utils/validation';
import { Capitalize } from '../../../../utils/utils';

export default () => {
    const history = useHistory()
    const info = useSelector(state => state.info.info)
    const dispatch = useDispatch()
    const formRef = useRef()
    const [errors, setErrors] = useState({})
    const [modal, setModal] = useState(false)
    const [values, setValues] = useState({
        dateOfArival: '',
        dateOfDeparture: '',
        positionInCompany: '',
        companyName: '',
        role: "Listener",
        sex: 'Male',
        country: ''
    })

    useEffect(() => {
        Object.keys(info).length > 3 &&
            setValues({
                dateOfArival: info.dateOfArival,
                dateOfDeparture: info.dateOfDeparture,
                positionInCompany: info.positionInCompany,
                companyName: info.companyName,
                role: info.role,
                sex: info.sex,
                country: info.country,
                birthday: info.birthday
            })
    }, [info])



    useEffect(() => {
        formRef.current.classList.add('active-form')
    }, [])

    const onChange = e => {
        setErrors({ ...errors, [e.target.name]: null })
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onPrevBtnClick = () => {
        const classList = formRef.current.classList
        classList.remove('active-form')
        classList.add('remove-form')
        dispatch({ type: SET_INFO, payload: values })
        setTimeout(()=>{
            history.push('/register/first')
        },1000)

    }
    const onDateChange = (date, fieldName) => {
        setValues({ ...values, [fieldName]: date })
    }

    const onFormSubmit = e => {
        e.preventDefault()
        const validation = validate(values)
        if (validation === null) {
            const classList = formRef.current.classList
            dispatch({ type: SET_INFO, payload: values })
            classList.remove('active-form')
            classList.add('remove-form')
            const payload = {
                firstName: Capitalize(info.firstName),
                lastName: Capitalize(info.lastName),
                email: info.email,
                ...values
            }

            
            setTimeout(() => {
                dispatch({ type: SET_INFO, payload: values })
                dispatch({ type: SAVE_CONF_INFO_SAGA, payload })
                classList.remove('remove-form')
                history.push('/register/last')
            }, 1500)
        }
        else {
            setErrors({ ...validation })
        }

    }

    const onInputClick = () => {
        setModal(prevState => !prevState)
    }

    const onDateSelected = (date1, date2) => {
        setValues({
            ...values, dateOfArival: date1, dateOfDeparture: date2
        })
    }
    
    return (
        <div ref={formRef} className="second-form form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <FormGroup >
                    <div className="d-flex justify-content-center">
                        <RangePicker
                            onDateSelected={onDateSelected}
                            value={{ startDate: values.dateOfArival, endDate: values.dayOfDeparture }}
                        />
                    </div>
                    {errors.dayOfArival && (<Alert color="danger" className="mt-1">{errors.dayOfArival}</Alert>)}
                    {errors.dayOfDeparture && (<Alert color="danger" className="mt-1">{errors.dayOfDeparture}</Alert>)}
                </FormGroup>

                <FormInput
                    label='Company name'
                    name='companyName'
                    onChange={onChange}
                    placeholder='Enter the name of company'
                    value={values.companyName}
                    error={errors.companyName}

                />

                <FormInput
                    label='Position'
                    name='positionInCompany'
                    onChange={onChange}
                    placeholder='Enter your position'
                    value={values.positionInCompany}
                    error={errors.positionInCompany}
                />

                <FormSelect
                    name='role'
                    value={values.role}
                    onChange={onChange}
                    options={['Listener', 'Speaker']}
                />
                <FormSelect
                    name='sex'
                    value={values.sex}
                    onChange={onChange}
                    options={['Male', 'Female']}
                />
                <FormGroup>
                    <Label className="mr-3" for="birthday">Birth Date</Label>
                    <DatePicker
                        name='birthday'
                        value={values.birthday}
                        onChange={date => onDateChange(date, 'birthday')}
                    />
                </FormGroup>
                <FormInput
                    label='Country'
                    name='country'
                    onChange={onChange}
                    placeholder='Click to choose country'
                    value={values.country}
                    onClick={onInputClick}
                    error={errors.country}
                />

                <FormModal
                    modal={modal}
                    setModal={setModal}
                    onChange={onChange}
                    value={values.country}
                />

                <FormGroup className="d-flex">
                    <Button onClick={onPrevBtnClick} color="primary" className="d-block mr-auto">Back</Button>
                    <Button type='submit' color="primary" className="d-block ml-auto">Next</Button>
                </FormGroup>
            </Form>
        </div>
    )
}