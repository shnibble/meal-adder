import React from 'react'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import AddButton from './addButton'

const Tags = ({ data, methods }) => {

    const { name } = data.templates.tag
    const { 
        handleTemplateTagNameChange,
        handleAddTag
    } = methods

    return (
        <>
            <PageTitle>Manage Tags</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} onChangeFunction={handleTemplateTagNameChange} />
                <AddButton val='Add Tag' callback={handleAddTag} />
            </FieldContainer>
        </>
    )
}

export default Tags