import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: inline-block;
    height: 10px;
    width: 30px;
    vertical-align: top;

    > div {
        display: inline-block;
        width: 4px;
        height: 4px;
        margin: 3px;
        background: #0094ff;
        border-radius: 2px;
        opacity: 0;
        box-shadow: 0 0 1px 2px rgba(0, 148, 255, 0.5);
        animation-name: pulse;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }

    > div:nth-child(1) {
        animation-delay: 0s;
    }

    > div:nth-child(2) {
        animation-delay: 0.25s;
    }

    > div:nth-child(3) {
        animation-delay: 0.5s;
    }

    @keyframes pulse {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`

const SmallLoadingAnimation = () => {
    return (
        <Container>
            <div></div>
            <div></div>
            <div></div>
        </Container>
    )
}

export default SmallLoadingAnimation