import React from 'react'
import { Redirect } from 'react-router'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import AddButton from './addButton'

const Categories = ({ data, methods }) => {

    if (!data.connection.verified || !data.data.loaded) {
        return (
            <Redirect to='/connection' />
        )
    }

    const { name, uploading } = data.templates.category
    const { 
        handleTemplateCategoryNameChange,
        handleAddCategory
    } = methods

    return (
        <>
            <PageTitle>Manage Categories</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} validation={(uploading)?'checking':null} onChangeFunction={handleTemplateCategoryNameChange} />
                <AddButton val='Add Category' callback={handleAddCategory} />
            </FieldContainer>
        </>
    )
}

export default Categories