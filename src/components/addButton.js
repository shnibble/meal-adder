import React from 'react'
import Styled from 'styled-components'

const Button = Styled.button`
    display: block;
    margin: 10px auto;
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
`

const AddButton = ({ val, callback }) => {
    return (
        <Button value={val} onClick={callback}>{val}</Button>
    )
}

export default AddButton