import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Card, CardBody, CardHeader, CardText, Button, CardTitle, CardFooter } from 'reactstrap'

import { CONFIRM_CONFIRENCE_SAGA } from '../../../../../../../redux/reducers/types'
import FormatDate from '../../../../../../../utils/moment'

export default () => {
    const dispatch = useDispatch()
    const params = useParams()
    const confirences = useSelector(state => state.confirences.confirences)
    const [elem, setElem] = useState(null)

    const onBtnClick = e => {
        const action = e.target.getAttribute('data')
        const data = { id: params.id, action }
        dispatch({ type: CONFIRM_CONFIRENCE_SAGA, payload: data })

    }

    useEffect(() => {
        const newElem = confirences.find(elem => elem.id === Number(params.id))
        setElem(newElem)
    }, [confirences, params.id])

    return (
        <Card>
            <CardHeader tag="h3">INFO</CardHeader>
            <CardBody>
                <CardTitle>Confirence Info</CardTitle>
                <CardText>Day of Arrival : {elem && FormatDate.date(elem.dateOfArival)}</CardText>
                <CardText>Day of Departure : {elem && FormatDate.date(elem.dateOfDeparture)}</CardText>
                <CardText>Country : {elem && elem.country}</CardText>

                <Button onClick={onBtnClick} className="mr-3" data='approved' color="success">Approve</Button>
                <Button onClick={onBtnClick} data="declined" color="danger">Decline</Button>
            </CardBody>
            <CardFooter className="text-muted">Footer</CardFooter>
        </Card>
    )
}