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
const Subtitle = Styled.p`
    font-size: 18px;
    color: #f2f2f2;
    font-style: italic;
`
const Link = Styled.a`
    color: #ffa94d;
    transition: color .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #f88000;
    }
`

const Header = () => {
    return (
        <Container>
            <Title>Meal Adder</Title>
            <Subtitle>For the <Link href='https://api.somethingtocook.com'>api.somethingtocook.com</Link> database.</Subtitle>
        </Container>
    )
}

export default Header