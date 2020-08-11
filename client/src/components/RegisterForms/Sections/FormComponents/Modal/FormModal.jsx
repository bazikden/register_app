import React from 'react'
import {Button,Modal, ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import FormMultiplySelect from '../FormMultiplySelect/FormMultiplySelect'
export default ({ modal, setModal, onChange, value }) => {

    const toggle = () => setModal(prevState => !prevState)
    return (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Select country</ModalHeader>
                <ModalBody>
                    <FormMultiplySelect onChange={onChange} value={value}/>    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3 ml-auto" onClick={toggle}>Ok</Button>
                </ModalFooter>
            </Modal>
    )
}