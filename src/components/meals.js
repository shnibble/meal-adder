import React from 'react'
import { Redirect } from 'react-router'
import FieldContainer from './fieldContainer'
import TextField from './textField'
import TextAreaField from './textAreaField'
import TagField from './tagField'
import TagAdder from './tagAdder'
import PageTitle from './pageTitle'
import AddButton from './addButton'

const Meals = ({ data, methods }) => {

    if (!data.connection.verified || !data.data.loaded) {
        return (
            <Redirect to='/connection' />
        )
    }

    const { allCategories, allOrigins, allTags } = data.data
    const { name, description, categories, origins, tags } = data.templates.meal
    const { 
        handleTemplateMealNameChange, 
        handleTemplateMealDescriptionChange, 
        handleTemplateMealCategoryChange, 
        handleTemplateMealOriginChange, 
        handleTemplateMealTagChange,
        handleAddMeal
    } = methods

    let validated = true
    if (!name.length || !description.length || !categories.length || !origins.length) {
        validated = false
    }

    return (
        <>
            <PageTitle>Add Meal</PageTitle>
            <FieldContainer title='Details'>
                <TextField label='Name' val={name} validation={(name.length > 0)?true:null} onChangeFunction={handleTemplateMealNameChange}/>
                <TextAreaField label='Description' val={description} validation={(description.length > 0)?true:null} onChangeFunction={handleTemplateMealDescriptionChange}/>
            </FieldContainer>
            <FieldContainer title='Categories'>
                <TagField arr={categories} callback={handleTemplateMealCategoryChange}/>
                <TagAdder key='TagAdderCategories' allTags={allCategories} callback={handleTemplateMealCategoryChange} />
            </FieldContainer>
            <FieldContainer title='Origins'>
                <TagField arr={origins} callback={handleTemplateMealOriginChange}/>
                <TagAdder key='TagAdderOrigins' allTags={allOrigins} callback={handleTemplateMealOriginChange} />
            </FieldContainer>
            <FieldContainer title='Tags'>
                <TagField arr={tags} callback={handleTemplateMealTagChange}/>
                <TagAdder key='TagAdderTags' allTags={allTags} callback={handleTemplateMealTagChange} />
            </FieldContainer>
            
            
            <AddButton val='Add Meal' enabled={validated} callback={handleAddMeal} />
        </>
    )
}

export default Meals