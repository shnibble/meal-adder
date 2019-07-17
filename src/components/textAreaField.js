import React from 'react'
import Styled from 'styled-components'
import newId from '../utils/newId'

const Container = Styled.div`
    position: relative;
    width: 100%;
    margin: 10px auto;
`
const Input = Styled.textarea`
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 15px;
    min-height: 150px;
    resize: none;
    padding: 18px 10px 5px 10px;
    margin-top: 3px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.09);

    &:focus {
        outline: none;
        border-color: rgba(0,148,255,0.15);
    }

    &:focus + label, &.entered + label {
        top: 0px;
        left: 5px;
        color: #000;
        font-size: 10px;
    }
`
const Label = Styled.label`
    position: absolute;
    top: 18px;
    right: 18px;
    left: 18px;
    height: 15px;
    font-size: 15px;
    color: #ccc;
    background: linear-gradient(to bottom, #fff 0%, #fff 70%, transparent 100%);
    transition: all .15s ease-in;
`

const TextAreaField = ({ label, val, onChangeFunction }) => {
    const uniqueId = newId()
    return (
        <Container>
            <Input id={`labelForTextField_${uniqueId}`} className={(val.length > 0)?'entered':null} type='text' value={val} onChange={onChangeFunction} />
            <Label htmlFor={`labelForTextField_${uniqueId}`}>{label}</Label>
        </Container>
    )
}

export default TextAreaField