import React from 'react'
import Styled from 'styled-components'
import PageTitle from './pageTitle'
import FieldContainer from './fieldContainer'
import SelectField from './selectField'
import TextField from './textField'
import Button from './button'

const ButtonContainer = Styled.div`
    text-align: center;
`

const initialState = {
    location: '',
    key: '',
    typing: false,
    verified: false,
    rememberedConnection: '-1',
    rememberedConnectionsLoaded: false,
    rememberedConnections: []
}

class Connection extends React.Component {
    constructor(props) {
        super()
        this.state = initialState
        this.validateTimeout = false
    }

    loadLocalStorage = () => {
        if (localStorage.getItem('rememberedConnections') !== null) {
            const remCons = JSON.parse(localStorage.getItem('rememberedConnections'))
            this.setState({ rememberedConnections: remCons })
        }
    }

    saveConnection = () => {
        let remCons = this.state.rememberedConnections
        remCons.push({ location: this.props.data.connection.location, key: this.props.data.connection.key })
        localStorage.setItem('rememberedConnections', JSON.stringify(remCons))
        this.loadLocalStorage()
    }

    clearLocalStorage = () => {
        localStorage.clear()
        this.setState({ rememberedConnections: [] })
    }

    trimTrailingSlash = (str) => {
        return str.replace(/\/$/, '')
    }

    validateUrl = (str) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i') // fragment locator
        // return !!pattern.test(str)
        return true
    }

    validateLocation = () => {
        const url = this.state.location
        if (this.validateUrl(url)) {
            this.setState({ location: this.trimTrailingSlash(url), typing: false, verified: true })
        } else {            
            this.setState({ typing: false, verified: false })
        }
    }

    handleLocationUpdate = (event) => {
        this.setState({ location: event.target.value, typing: true, verified: false })

        clearTimeout(this.validateTimeout)
        this.validateTimeout = setTimeout(this.validateLocation, 1000)
    }

    handleKeyUpdate = (event) => {
        this.setState({ key: event.target.value })
    }

    handleUpdateConnection = () => {
        const existingLocation = this.props.data.connection.location
        const existingKey = this.props.data.connection.key        
        const location = this.state.location
        const key = this.state.key
        const verified = this.state.verified

        // both location and key being updated
        if (verified && key.length > 0) {
            this.props.methods.handleConnectionUpdate(location, key)
            this.setState(initialState)

        // just location being updated
        } else if (verified && key.length === 0) {
            this.props.methods.handleConnectionUpdate(location, existingKey)
            this.setState(initialState)

        // just key being updated
        } else if (!verified && existingLocation.length > 0 && key.length > 0) {            
            this.props.methods.handleConnectionUpdate(existingLocation, key)
            this.setState(initialState)

        } else {
            alert('Could not submit connection update. Please ensure a valid URL is entered or already set.')
        }
    }

    handleRememberedConnectionSelect = async (event) => {
        const index = event.target.value
        const stateObj = {...this.state}
        stateObj.typing = false
        stateObj.verified = false
        if (index !== '-1') {
            const remCon = this.state.rememberedConnections[index]
            stateObj.rememberedConnection = index
            stateObj.location = remCon.location
            stateObj.key = remCon.key
        } else {
            stateObj.rememberedConnection = index
            stateObj.location = ''
            stateObj.key = ''
        }
        await this.setState(stateObj) 
        this.validateLocation()
               
    }

    componentWillUpdate = () => {
        if (!this.state.rememberedConnectionsLoaded) {
            this.setState({ rememberedConnectionsLoaded: true })
            this.loadLocalStorage()
        }        
    }

    componentWillMount = () => {
        this.loadLocalStorage()
    }

    render = () => {
        const { 
            handleRememberedConnectionSelect, 
            handleLocationUpdate,  
            handleKeyUpdate, 
            handleUpdateConnection, 
            saveConnection,
            clearLocalStorage,
            props: {
                data: {
                    connection: {
                        location, 
                        key
                    }
                }
            }, 
            state: {
                location: stateLocation,
                key: stateKey,
                typing,
                verified,
                rememberedConnection,
                rememberedConnections
            }
        } = this

        // check if url+key are unique to remembered connections
        let canSave = true
        if (location.length) {
            if (rememberedConnections.length) {
                rememberedConnections.map(item => {
                    if (location === item.location && key === item.key) {
                        canSave = false
                    }
                    return true
                })
            }
        } else {
            canSave = false
        }

        return (
            <>
                <PageTitle>API Server</PageTitle>
                <FieldContainer label='Connection Details'>
                    {(rememberedConnections.length)
                    ?
                    <SelectField label='Remembered Connections' val={rememberedConnection} options={rememberedConnections} onChangeFunction={handleRememberedConnectionSelect} />
                    :
                    null
                    }
                    <TextField  label='URL' 
                                placeholder={location} 
                                val={stateLocation} 
                                validation={(stateLocation.length > 0)?(typing)?'checking':(verified)?true:false:null} 
                                onChangeFunction={handleLocationUpdate} />                    
                    <TextField  label='Key' 
                                placeholder={key} 
                                val={stateKey} 
                                validation={(stateKey.length > 0)?true:null}
                                onChangeFunction={handleKeyUpdate} />
                    <ButtonContainer>
                        <Button val='Connect' enabled={verified || (location.length > 0 && stateLocation === '' && stateKey.length > 0)} callback={handleUpdateConnection} />
                        <Button val='Save Connection' enabled={canSave} callback={saveConnection} />
                        <Button val='Clear Connections' enabled={(rememberedConnections.length)?true:false} callback={clearLocalStorage} />
                    </ButtonContainer>
                </FieldContainer>
            </>
        )
    }
}

export default Connection