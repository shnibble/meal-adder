import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Styled from 'styled-components'
import axios from 'axios'
import './App.css'
import Header from './components/header'
import Nav from './components/nav'
import Content from './components/content'
import Footer from './components/footer'

const Wrapper = Styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const initialAppState = {
    api_key: '',
    data: {
        loading: false,
        error: false,
        errorText: '',
        allCategories: [],
        allOrigins: [],
        allTags: [],        
        templates: {
            meal: {
                name: '',
                description: '',
                categories: [],
                origins: [],
                tags: []
            },
            category: {
                name: ''
            },
            origin: {
                name: ''
            },
            tag: {
                name: ''
            }
        }
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = initialAppState
        this.childMethods = {}
    }

    handleTemplateMealNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.data.templates.meal.name = event.target.value
        this.setState(stateObj)
    }

    handleTemplateMealDescriptionChange = (event) => {
        const stateObj = {...this.state}
        stateObj.data.templates.meal.description = event.target.value
        this.setState(stateObj)
    }

    handleTemplateMealCategoryChange = (event) => {
        const val = event.target.value
        const stateObj = {...this.state}

        const activeIndex = stateObj.data.templates.meal.categories.indexOf(val)
        if (activeIndex !== -1) {
            stateObj.data.templates.meal.categories.splice(activeIndex, 1)
        } else {
            stateObj.data.templates.meal.categories.push(val)
        }
        this.setState(stateObj)
    }

    handleTemplateMealOriginChange = (event) => {
        const val = event.target.value
        const stateObj = {...this.state}

        const activeIndex = stateObj.data.templates.meal.origins.indexOf(val)
        if (activeIndex !== -1) {
            stateObj.data.templates.meal.origins.splice(activeIndex, 1)
        } else {
            stateObj.data.templates.meal.origins.push(val)
        }
        this.setState(stateObj)
    }

    handleTemplateMealTagChange = (event) => {
        const val = event.target.value
        const stateObj = {...this.state}

        const activeIndex = stateObj.data.templates.meal.tags.indexOf(val)
        if (activeIndex !== -1) {
            stateObj.data.templates.meal.tags.splice(activeIndex, 1)
        } else {
            stateObj.data.templates.meal.tags.push(val)
        }
        this.setState(stateObj)
    }

    handleTemplateCategoryNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.data.templates.category.name = event.target.value
        this.setState(stateObj)
    }

    handleTemplateOriginNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.data.templates.origin.name = event.target.value
        this.setState(stateObj)
    }

    handleTemplateTagNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.data.templates.tag.name = event.target.value
        this.setState(stateObj)
    }

    handleAddMeal = () => {
        console.log('Adding meal...')
    }

    handleAddCategory = () => {
        console.log('Adding category...')
    }

    handleAddOrigin = () => {
        console.log('Adding origin...')
    }

    handleAddTag = () => {
        console.log('Adding tag...')
    }

    getApiMetaData = async () => {
        const stateObj = {...this.state}
        stateObj.data.loading = true
        stateObj.data.error = false
        stateObj.data.errorText = ''
        this.setState(stateObj)

        let categories = false
        let origins = false
        let tags = false        
        
        await axios
            .get(`https://api.somethingtocook.com/meta/categories`)
            .then(result => categories = result.data)
            .catch(err => {
                stateObj.data.loading = false
                stateObj.data.error = true
                stateObj.data.errorText = 'Failed to load categories from the API.'
                this.setState(stateObj)
                return false
            })
            await axios
            .get(`https://api.somethingtocook.com/meta/origins`)
            .then(result => origins = result.data)
            .catch(err => {
                stateObj.data.loading = false
                stateObj.data.error = true
                stateObj.data.errorText = 'Failed to load origins from the API.'
                this.setState(stateObj)
                return false
            })
        await axios
            .get(`https://api.somethingtocook.com/meta/tags`)
            .then(result => tags = result.data)
            .catch(err => {
                stateObj.data.loading = false
                stateObj.data.error = true
                stateObj.data.errorText = 'Failed to load tags from the API.'
                this.setState(stateObj)
                return false
            })

        if (categories.length > 0 && origins.length > 0 && tags.length > 0) {
            stateObj.data.loading = false
            stateObj.data.error = false
            stateObj.data.errorText = ''
            stateObj.data.allCategories = categories
            stateObj.data.allOrigins = origins
            stateObj.data.allTags = tags

            await this.setState(stateObj)
            return true
        }
    }

    componentWillMount = () => {
        this.getApiMetaData()
        const { 
            handleTemplateMealNameChange,
            handleTemplateMealDescriptionChange,
            handleTemplateMealCategoryChange, 
            handleTemplateMealOriginChange, 
            handleTemplateMealTagChange,
            handleTemplateCategoryNameChange,
            handleTemplateOriginNameChange,
            handleTemplateTagNameChange,
            handleAddMeal,
            handleAddCategory,
            handleAddOrigin,
            handleAddTag
        } = this
        this.childMethods = {
            handleTemplateMealNameChange,
            handleTemplateMealDescriptionChange,
            handleTemplateMealCategoryChange,
            handleTemplateMealOriginChange,
            handleTemplateMealTagChange,
            handleTemplateCategoryNameChange,
            handleTemplateOriginNameChange,
            handleTemplateTagNameChange,
            handleAddMeal,
            handleAddCategory,
            handleAddOrigin,
            handleAddTag
        }
    }

    render = () => {
        const { data } = this.state

        return (
            <Router>
                <Wrapper>
                    <Header />
                    <Nav />
                    <Content data={data} methods={this.childMethods} />
                    <Footer />
                </Wrapper>
            </Router>
        )
    }
}

export default App;
