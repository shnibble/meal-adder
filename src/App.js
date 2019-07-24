import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Styled from 'styled-components'
import axios from 'axios'
import './App.css'
import Header from './components/header'
import Nav from './components/nav'
import Notifications from './components/notifications'
import Content from './components/content'

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
    connection: {
        location: '',
        key: '',
        verified: false
    },
    data: {
        loading: false,
        loaded: false,
        allCategories: [],
        allOrigins: [],
        allTags: []
    },
    notifications: [],
    templates: {
        meal: {
            uploading: false,
            name: '',
            description: '',
            categories: [],
            origins: [],
            tags: []
        },
        category: {
            uploading: false,
            name: ''
        },
        origin: {
            uploading: false,
            name: ''
        },
        tag: {
            uploading: false,
            name: ''
        }
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = initialAppState
        this.childMethods = {}
        this.removeNotificationInterval = null
    }

    addNotification = (title, message, error=false) => {
        const stateObj = {...this.state}
        stateObj.notifications.push({ title, message, error })
        this.setState(stateObj)
    }

    removeNotification = (index) => {
        const stateObj = {...this.state}
        stateObj.notifications.splice(index, 1)
        this.setState(stateObj)
    }

    removeOldestNotification = () => {
        const stateObj = {...this.state}
        if (stateObj.notifications.length) {
            stateObj.notifications.shift()
        } 
        if (stateObj.notifications.length === 0) {
            clearInterval(this.removeNotificationInterval)
            this.removeNotificationInterval = null
        }
        this.setState(stateObj)
    }
    
    handleCloseNotification = (event) => {
        const index = event.target.value
        this.removeNotification(index)
    }

    handleConnectionUpdate = async (location, key) => {
        const stateObj = {...this.state}
        stateObj.connection.location = location
        stateObj.connection.key = key
        stateObj.connection.verified = true
        await this.setState(stateObj)
        await this.getData()
    }

    handleTemplateMealNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.templates.meal.name = event.target.value
        this.setState(stateObj)
    }

    handleTemplateMealDescriptionChange = (event) => {
        const stateObj = {...this.state}
        stateObj.templates.meal.description = event.target.value
        this.setState(stateObj)
    }

    handleTemplateMealCategoryChange = (event) => {
        const val = Number(event.target.value)
        const stateObj = {...this.state}
        const masterItem = stateObj.data.allCategories.filter((cat) => cat.id === val)[0]
        const activeIndex = stateObj.templates.meal.categories.map((e) => e.id).indexOf(val)
        if (activeIndex !== -1) {
            stateObj.templates.meal.categories.splice(activeIndex, 1)
        } else {
            stateObj.templates.meal.categories.push({ id: masterItem.id, name: masterItem.name })
        }
        this.setState(stateObj)
    }

    handleTemplateMealOriginChange = (event) => {
        const val = Number(event.target.value)
        const stateObj = {...this.state}
        const masterItem = stateObj.data.allOrigins.filter((cat) => cat.id === val)[0]
        const activeIndex = stateObj.templates.meal.origins.map((e) => e.id).indexOf(val)
        if (activeIndex !== -1) {
            stateObj.templates.meal.origins.splice(activeIndex, 1)
        } else {
            stateObj.templates.meal.origins.push({ id: masterItem.id, name: masterItem.name })
        }
        this.setState(stateObj)
    }

    handleTemplateMealTagChange = (event) => {
        const val = Number(event.target.value)
        const stateObj = {...this.state}
        const masterItem = stateObj.data.allTags.filter((cat) => cat.id === val)[0]
        const activeIndex = stateObj.templates.meal.tags.map((e) => e.id).indexOf(val)
        if (activeIndex !== -1) {
            stateObj.templates.meal.tags.splice(activeIndex, 1)
        } else {
            stateObj.templates.meal.tags.push({ id: masterItem.id, name: masterItem.name })
        }
        this.setState(stateObj)
    }

    handleTemplateCategoryNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.templates.category.name = event.target.value
        this.setState(stateObj)
    }

    handleTemplateOriginNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.templates.origin.name = event.target.value
        this.setState(stateObj)
    }

    handleTemplateTagNameChange = (event) => {
        const stateObj = {...this.state}
        stateObj.templates.tag.name = event.target.value
        this.setState(stateObj)
    }

    handleAddMeal = async () => {
        const stateObj = {...this.state}
        stateObj.templates.meal.uploading = true
        this.setState(stateObj)

        let validated = true
        let data = {}
        if (
            this.state.templates.meal.name.length <= 0 ||
            this.state.templates.meal.description.length <= 0 ||
            this.state.templates.meal.categories.length <= 0 || 
            this.state.templates.meal.origins.length <= 0
        ) {
            validated = false
        } else {
            data = {
                key: this.state.connection.key,
                name: this.state.templates.meal.name,
                description: this.state.templates.meal.description,
                categories: this.state.templates.meal.categories.map(item => item.id),
                origins: this.state.templates.meal.origins.map(item => item.id),
                tags: this.state.templates.meal.tags.map(item => item.id) || []
            }
        }

        if (validated) {
            await axios 
                .post(`${this.state.connection.location}/upload/meal`, data)
                .then(() => {
                    stateObj.templates.meal.uploading = false
                    stateObj.templates.meal.name = ''
                    stateObj.templates.meal.description = ''
                    stateObj.templates.meal.categories = []
                    stateObj.templates.meal.origins = []
                    stateObj.templates.meal.tags = []
                    this.addNotification('Success', 'Successfully added new meal.')
                    this.setState(stateObj)
                })
                .catch(() => {
                    stateObj.templates.meal.uploading = false
                    this.addNotification('Update Error', 'Could not add meal. It could be a duplicate entry or an issue with the API server.', true)
                    this.setState(stateObj)
                })
        } else {
            stateObj.templates.meal.uploading = false
            this.addNotification('Validation Error', 'Could not validate data. Please ensure the name and description fields are entered and at least one category and one origin are chosen.', true)
            this.setState(stateObj)
        }
    }

    handleAddCategory = async () => {
        const stateObj = {...this.state}
        stateObj.templates.category.uploading = true
        this.setState(stateObj)

        let validated = true    
        let data = {}
        if (this.state.templates.category.name <= 0) {
            validated = false
        } else {
            data = {
                key: this.state.connection.key,
                name: this.state.templates.category.name
            }
        }

        if (validated) {
            await axios 
                .post(`${this.state.connection.location}/upload/category`, data)
                .then(result => {
                    stateObj.data.allCategories.push({
                        id: result.data[0],
                        name: data.name
                    })
                    stateObj.templates.category.uploading = false
                    stateObj.templates.category.name = ''
                    this.addNotification('Success', 'Successfully added new category.')
                    this.setState(stateObj)
                })
                .catch(() => {
                    stateObj.templates.category.uploading = false
                    this.addNotification('Update Error', 'Could not add category. It could be a duplicate entry or an issue with the API server.', true)
                    this.setState(stateObj)
                })
        } else {
            stateObj.templates.category.uploading = false
            this.addNotification('Validation Error', 'Could not validate data. Please ensure that a valid category name is entered.', true)
            this.setState(stateObj)
        }
    }

    handleAddOrigin = async () => {
        const stateObj = {...this.state}
        stateObj.templates.origin.uploading = true
        this.setState(stateObj)

        let validated = true    
        let data = {}
        if (this.state.templates.origin.name <= 0) {
            validated = false
        } else {
            data = {
                key: this.state.connection.key,
                name: this.state.templates.origin.name
            }
        }

        if (validated) {
            await axios 
                .post(`${this.state.connection.location}/upload/origin`, data)
                .then(result => {
                    stateObj.data.allOrigins.push({
                        id: result.data[0],
                        name: data.name
                    })
                    stateObj.templates.origin.uploading = false
                    stateObj.templates.origin.name = ''
                    this.addNotification('Success', 'Successfully added new origin.')
                    this.setState(stateObj)
                })
                .catch(() => {
                    stateObj.templates.origin.uploading = false
                    this.addNotification('Update Error', 'Could not add origin. It could be a duplicate entry or an issue with the API server.', true)
                    this.setState(stateObj)
                })
        } else {

            stateObj.templates.origin.uploading = false
            this.addNotification('Validation Error', 'Could not validate data. Please ensure that a valid origin name is entered.', true)
            this.setState(stateObj)
        }
    }

    handleAddTag = async () => {
        const stateObj = {...this.state}
        stateObj.templates.tag.uploading = true
        this.setState(stateObj)

        let validated = true    
        let data = {}
        if (this.state.templates.tag.name <= 0) {
            validated = false
        } else {
            data = {
                key: this.state.connection.key,
                name: this.state.templates.tag.name
            }
        }

        if (validated) {
            await axios 
                .post(`${this.state.connection.location}/upload/tag`, data)
                .then(result => {
                    stateObj.data.allTags.push({
                        id: result.data[0],
                        name: data.name
                    })
                    stateObj.templates.tag.uploading = false
                    stateObj.templates.tag.name = ''
                    this.addNotification('Success', 'Successfully added new tag.')
                    this.setState(stateObj)
                })
                .catch(() => {
                    stateObj.templates.tag.uploading = false
                    this.addNotification('Update Error', 'Could not add tag. It could be a duplicate entry or an issue with the API server.', true)
                    this.setState(stateObj)
                })
        } else {
            stateObj.templates.tag.uploading = false
            this.addNotification('Validation Error', 'Could not validate data. Please ensure that a valid tag name is entered.', true)
            this.setState(stateObj)
        }
    }

    getData = async () => {
        const stateObj = {...this.state}
        stateObj.data.loading = true
        stateObj.data.loaded = false
        this.setState(stateObj)

        let categories = []
        let origins = []
        let tags = []
        let error = false  
        
        await axios
            .get(`${this.state.connection.location}/meta/categories`)
            .then(result => categories = result.data)
            .catch(() => {
                error = true
                return false
            })
        await axios
            .get(`${this.state.connection.location}/meta/origins`)
            .then(result => origins = result.data)
            .catch(() => {
                error = true
                return false
            })
        await axios
            .get(`${this.state.connection.location}/meta/tags`)
            .then(result => tags = result.data)
            .catch(() => {
                error = true
                return false
            })
        
        if (error) {
            this.addNotification('API Connection Error', 'Could not load all necessary data from the API. Please check the URL and try again.', true)
        }
        stateObj.data.loading = false
        stateObj.data.loaded = !error
        stateObj.data.allCategories = categories
        stateObj.data.allOrigins = origins
        stateObj.data.allTags = tags

        await this.setState(stateObj)
        return true
    }

    componentWillMount = () => {
        const { 
            handleConnectionUpdate,
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
            handleConnectionUpdate,
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

    componentWillUpdate = () => {
        if (this.removeNotificationInterval === null && this.state.notifications.length) {
            this.removeNotificationInterval = setInterval(this.removeOldestNotification, 4000)
        }
    }

    render = () => {
        const { 
            state: data, 
            state: { 
                connection: { 
                    verified 
                },
                notifications,
                data: { 
                    loaded 
                } 
            }, 
            handleCloseNotification,
            childMethods 
        } = this
        return (
            <Router>
                <Wrapper>
                    <Header />
                    <Nav connectionVerified={verified} dataLoaded={loaded} />
                    <Notifications data={notifications} onClickFunction={handleCloseNotification} />
                    <Content data={data} methods={childMethods} />
                </Wrapper>
            </Router>
        )
    }
}

export default App;
