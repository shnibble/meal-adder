import React from 'react'
import Styled from 'styled-components'

const Container = Styled.header`
    flex-shrink: 0;
    background: #0094ff;
    text-align: center;
    padding: 10px;
`

const Footer = () => {
    return (
        <Container>
            <span>Footer</span>
        </Container>
    )
}

export default Footer