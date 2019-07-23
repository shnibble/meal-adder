import React from 'react'
import Styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TextField from './textField'
import TagButton from './tagButton'
import newId from '../utils/newId'

const Container = Styled.div`
    padding: 10px;
    background: rgba(0, 148, 255, 0.1);
    border-radius: 3px;
`
const TagContainer = Styled.div`
    text-align: center;
`

class TagAdder extends React.Component {
    constructor(props) {
        super()
        this.state = {
            filter: ''
        }
        this.uniqueId = null
    }

    handleChangeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    handleChangeFilterReset = () => {
        this.setState({ filter: '' })
    }

    componentWillMount = () => {
        this.uniqueId = newId()
    }

    render = () => {
        const { handleChangeFilter, uniqueId } = this
        const { allTags, callback } = this.props
        const { filter } = this.state

        return (
            <Container>
                <TextField label='Search' val={filter} onChangeFunction={handleChangeFilter}/>
                <TagContainer>
                    <TransitionGroup>
                    {allTags.map((tag) => {
                        if (tag.name.toLowerCase().includes(filter.toLowerCase())) {
                            return (
                                <CSSTransition key={`all_${tag.id}`} timeout={250} classNames={`tag`}>
                                    <TagButton key={`allTags_${tag.name}_${uniqueId}`} label={tag.name} val={tag.id} active={false} callback={callback} />
                                </CSSTransition>
                            )
                        } else {
                            return false
                        }
                    })}
                    </TransitionGroup>
                </TagContainer>
            </Container>
        )
    }
}

export default TagAdder