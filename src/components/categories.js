import React from 'react'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import AddButton from './addButton'

const Categories = ({ data, methods }) => {

    const { name } = data.templates.category
    const { 
        handleTemplateCategoryNameChange,
        handleAddCategory
    } = methods

    return (
        <>
            <PageTitle>Manage Categories</PageTitle>
            <FieldContainer title='New'>
                <TextField label='Name' val={name} onChangeFunction={handleTemplateCategoryNameChange} />
                <AddButton val='Add Category' callback={handleAddCategory} />
            </FieldContainer>
        </>
    )
}

export default Categories