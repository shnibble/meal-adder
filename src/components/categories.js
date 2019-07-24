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

    const { name } = data.templates.category
    const { 
        handleTemplateCategoryNameChange,
        handleAddCategory
    } = methods

    let validated = true
    if (!name.length) {
        validated = false
    }

    return (
        <>
            <PageTitle>Manage Categories</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} validation={(name.length > 0)?true:null} onChangeFunction={handleTemplateCategoryNameChange} />
                <AddButton val='Add Category' enabled={validated} callback={handleAddCategory} />
            </FieldContainer>
        </>
    )
}

export default Categories