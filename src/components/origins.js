import React from 'react'
import { Redirect } from 'react-router'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import AddButton from './addButton'

const Origins = ({ data, methods }) => {

    if (!data.connection.verified || !data.data.loaded) {
        return (
            <Redirect to='/connection' />
        )
    }

    const { name, uploading } = data.templates.origin
    const { 
        handleTemplateOriginNameChange,
        handleAddOrigin
    } = methods

    return (
        <>
            <PageTitle>Manage Origins</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} validation={(uploading)?'checking':null} onChangeFunction={handleTemplateOriginNameChange} />
                <AddButton val='Add Origin' callback={handleAddOrigin} />
            </FieldContainer>
        </>
    )
}

export default Origins