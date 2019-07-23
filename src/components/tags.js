import React from 'react'
import { Redirect } from 'react-router'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import AddButton from './addButton'

const Tags = ({ data, methods }) => {

    if (!data.connection.verified || !data.data.loaded) {
        return (
            <Redirect to='/connection' />
        )
    }

    const { name, uploading } = data.templates.tag
    const { 
        handleTemplateTagNameChange,
        handleAddTag
    } = methods

    return (
        <>
            <PageTitle>Manage Tags</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} validation={(uploading)?'checking':null} onChangeFunction={handleTemplateTagNameChange} />
                <AddButton val='Add Tag' callback={handleAddTag} />
            </FieldContainer>
        </>
    )
}

export default Tags