import React from 'react'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import AddButton from './addButton'

const Origins = ({ data, methods }) => {

    const { name } = data.templates.origin
    const { 
        handleTemplateOriginNameChange,
        handleAddOrigin
    } = methods

    return (
        <>
            <PageTitle>Manage Origins</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} onChangeFunction={handleTemplateOriginNameChange} />
                <AddButton val='Add Origin' callback={handleAddOrigin} />
            </FieldContainer>
        </>
    )
}

export default Origins