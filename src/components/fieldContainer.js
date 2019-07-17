import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
    width: 100%;
    max-width: 900px;
    margin: 10px auto;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 3px 0px rgba(0,0,0,0.09);
`
const SubTitle = Styled.h3`
    color: #666666;
    font-size: 16px;
`

const FieldContainer = ({ title, children }) => {
    return (
        <Container>
            <SubTitle>{title}</SubTitle>
            {children}
        </Container>
    )
}

export default FieldContainer