import React from 'react'
import Styled from 'styled-components'

const Input = Styled.button`
    display: inline-block;
    margin: 10px 5px;
    padding: 8px;
    width: 100%;
    max-width: 200px;
    box-sizing: border-box;
    background: none;
    color: #ffa666;
    font-size: 16px;
    font-weight: bold;
    border: 2px solid #ffa666;
    border-radius: 4px;
    cursor: pointer;
    transition: all .25s ease;

    &:focus, &:hover {
        outline: none;
        background: #FF6A00;
        border-color: transparent;
        color: #fff;
    }

    &:disabled {
        background: none;
        border-color: #ccc;
        color: #ccc;
        cursor: not-allowed;
    }
`

const Button = ({ val, enabled=true, callback }) => {
    return (
        <Input value={val} disabled={!enabled} onClick={callback}>{val}</Input>
    )
}

export default Button