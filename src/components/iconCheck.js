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
        height: 3px;
        background: #009933;
    }

    > div:nth-child(1) {
        top: 5px;
        width: 6px;
        transform: rotate(40deg); 
    }

    > div:nth-child(2) {
        top: 3px
        left: 2px;
        width: 10px;
        transform: rotate(-50deg);        
    }
`

const IconCheck = () => {
    return (
        <Container>
            <div></div>
            <div></div>
        </Container>
    )
}

export default IconCheck