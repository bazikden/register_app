import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_CONF_INFO_SAGA } from '../../../../../../../redux/reducers/types'
import { Table } from 'reactstrap'
import { useHistory } from 'react-router'
import SearchPanel from './SearchPanel'
import PaginationPanel from './PaginationPanel'
import FormatDate from '../../../../../../../utils/moment'
import { BsFillCaretDownFill,BsFillCaretUpFill } from "react-icons/bs";

export default () => {
    const confirences = useSelector(state => state.confirences.confirences)
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [filteredArray, setFilteredArray] = useState(null)
    const [activePage, setActivePage] = useState(1)
    const [order,setOrder] = useState({
        name:"ASC",
        companyName:'ASC',
        email:'ASC',
        country:'ASC',
        position:'ASC',
        status:'ASC',
        createdAt:'ASC',
    })

    useEffect(() => {
        console.log('page', activePage)
    }, [activePage])

    useEffect(() => {
        dispatch({ type: GET_CONF_INFO_SAGA })
    }, [dispatch])


    const filterConf = (elem) => (
        elem.email.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase() ||
        elem.companyName.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase() ||
        elem.firstName.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase()
    )

    useEffect(() => {
        if (searchValue !== "") {
            const newArray = [...confirences]
            const filtered = newArray.filter(filterConf)
            setFilteredArray(filtered)
        } else {
            setFilteredArray(null)
        }
    }, [searchValue])

    const onStatusChange = e => {
        const status = e.target.value
        status === 'all' ? setFilteredArray(null) : setFilteredArray(confirences.filter(elem => elem.status === status))
    }


    const onClick = id => {
        history.push(`/admin/adminpanel/participans/${id}`)
    }

    const onSearch = e => {
        setSearchValue(e.target.value)
    }



    const mapConfirences = (elem, index) => (
        <tr style={{ cursor: 'pointer' }} onClick={() => onClick(elem.id)} key={elem.id}>
            <th>{index + 1}</th>
            <th >{elem.firstName} {elem.lastName}</th>
            <th>{elem.companyName}</th>
            <th>{elem.position}</th>
            <th>{elem.country}</th>
            <th>{elem.email}</th>
            <th>{FormatDate.dateTime(elem.createdAt)}</th>
            <th>{elem.status}</th>
        </tr>
    )

    const sortBy = (e) => {
        // const arr = filteredArray ? [...filteredArray] : [...confirences]
        // console.log("arr", arr)
        const field = e.target.dataset.name
        console.log(field,order)
        setOrder({...order,[field]:order[field] === 'ASC'? 'DESC':'ASC'})
        const orderObj = [`${field}`, order[field]] // DESC
        console.log(orderObj)
        dispatch({ type: GET_CONF_INFO_SAGA, payload: { page: activePage, order:orderObj } })
    }


    return (
        <div>
            <SearchPanel onStatusChange={onStatusChange} searchValue={searchValue} onSearch={onSearch} />
            {
                confirences.length !== 0 && (
                    <Table hover bordered>
                        <thead>
                            <tr className="headrow">
                                <th>#</th>
                                <th onClick={sortBy} data-name="name">Name {order.name === "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>}</th>
                                <th onClick={sortBy} data-name="companyName">Company {order.companyName=== "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>} </th>
                                <th onClick={sortBy} data-name="position">Position {order.position === "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>}</th>
                                <th onClick={sortBy} data-name="country">Country {order.country === "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>}</th>
                                <th onClick={sortBy} data-name="email">Email {order.email === "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>}</th>
                                <th onClick={sortBy} data-name="createdAt">Registaration date{order.createdAt === "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>}</th>
                                <th onClick={sortBy} data-name="status">Status{order.status === "ASC"? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArray ? filteredArray.map(mapConfirences) : confirences.map(mapConfirences)}

                        </tbody>
                    </Table>
                )
            }
            <PaginationPanel setActivePage={setActivePage} />
        </div>
    )
}