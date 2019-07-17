import React from 'react'
import Styled from 'styled-components'

const Button = Styled.button`
    display: inline-block;
    position: relative;
    background-color: #66bfff;
    color: #fff;
    padding: 10px;
    max-height: 80px;
    max-width: 500px;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    margin: 2px;
    border: none;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all .25s ease;

    &.active {
        background-color: #ffa666;
    }
    &:focus, &:hover {
        outline: none;
        background-color: #0094FF;
    }
    &.active:focus, &.active:hover {
        outline: none;
        background-color: #FF6A00;
    }
    &.tag-enter {
        opacity: 0;
        max-width: 0;
        padding: 0;
    }
    &.tag-enter-active {
        opacity: 1;
        max-width: 500px;
        padding: 10px;
    }
    &.tag-exit {
        opacity: 1;
        padding: 10px;
    }
    &.tag-exit-active {
        opacity: 0;
        padding: 0;
        max-width: 0;
    }
`

const TagButton = ({ val, active, callback }) => {
    return (
        <Button onClick={callback} className={(active)?'active':''} value={val}>{val}</Button>
    )
}

export default TagButton