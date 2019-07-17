import React from 'react'
import Styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TagButton from './tagButton'
import newId from '../utils/newId'

const Container = Styled.div`
    position: relative;
    width: 100%;
    margin: 10px auto;
`
const TagContainer = Styled.div`
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 15px;
    min-height: 50px;
    padding: 18px 10px 5px 10px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.09);
`

const TagField = ({ arr, callback }) => {
    const uniqueId = newId()
    return (
        <Container>
            <TagContainer>
                <TransitionGroup>
                    {arr.map((tag) => (
                        <CSSTransition key={`active_${tag}`} timeout={250} classNames={`tag`}>
                            <TagButton key={`activeTags_${tag}_${uniqueId}`} val={tag} active={true} callback={callback} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </TagContainer>
        </Container>
    )
}

export default TagField