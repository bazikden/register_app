import React, { useEffect } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { GET_CONF_INFO_SAGA } from '../../../../../../../redux/reducers/types'


export default ({setActivePage}) => {
    const {pages} = useSelector(state => state.confirences)
    const [pagesArr,setPagesArr] = useState([])    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        let arr = []
        for(let i = 1; i <= pages; i++){ arr.push(i)}
        setPagesArr(arr)
    },[pages])

    const onPaginationItemClick = (page) => {
        dispatch({type:GET_CONF_INFO_SAGA,payload:{page}})
        setActivePage(page)
    }

    return (
        <Pagination className="d-flex justify-content-center">
            <PaginationItem onClick={() => onPaginationItemClick(1)}>
                <PaginationLink first href="" />
            </PaginationItem>
            {
                pagesArr.length > 0 && pagesArr.map(elem => (
                    <PaginationItem key={'paginationItemConf'+elem} onClick={() => onPaginationItemClick(elem)}>
                    <PaginationLink href="">
                        {elem}
                    </PaginationLink>
                </PaginationItem>
                ))
            }
            <PaginationItem onClick={()=> onPaginationItemClick(pages)}>
                <PaginationLink last href="" />
            </PaginationItem>
        </Pagination>
    )
}