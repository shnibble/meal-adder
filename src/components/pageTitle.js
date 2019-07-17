import React from 'react'
import Styled from 'styled-components'

const Title = Styled.h2`
    text-align: center;
`

const PageTitle = ({ children }) => {
    return (
        <Title>{children}</Title>
    )
}

export default PageTitle