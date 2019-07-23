import React from 'react'
import Styled from 'styled-components'

const Container = Styled.header`
    flex-shrink: 0;
    background: #0094ff;
    text-align: center;
    padding: 10px;
`
const Title = Styled.h1`
    font-size: 32px;
    color: #f2f2f2;
`

const Header = () => {
    return (
        <Container>
            <Title>Meal Adder</Title>
        </Container>
    )
}

export default Header