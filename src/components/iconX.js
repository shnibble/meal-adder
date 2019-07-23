import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: inline-block;
    position: relative;
    height: 10px;
    width: 10px;
    vertical-align: top;

    > div {
        position: absolute;
        top: 3px;
        left: -1px;
        width: 12px;
        height: 4px;
        background: #b30000;
    }

    > div:nth-child(1) {
        transform: rotate(45deg);
    }

    > div:nth-child(2) {
        transform: rotate(-45deg);        
    }
`

const IconX = () => {
    return (
        <Container>
            <div></div>
            <div></div>
        </Container>
    )
}

export default IconX