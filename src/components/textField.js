import React from 'react'
import Styled from 'styled-components'
import newId from '../utils/newId'
import SmallLoadingAnimation from './smallLoadingAnimation'
import IconX from './iconX'
import IconCheck from './iconCheck'

const Container = Styled.div`
    position: relative;
    width: 100%;
    height: 51px;
    margin: 10px auto;
`
const Input = Styled.input`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 15px;
    padding: 18px 10px 5px 10px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.09);

    &:focus {
        outline: none;
        border-color: rgba(0,148,255,0.15);
    }

    &:focus + label, &.entered + label {
        top: 3px;
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
    transition: all .15s ease-in;
`

const TextField = ({ label, placeholder='', val, validation=null, onChangeFunction }) => {
    const uniqueId = newId()
    let d = null
    switch (validation) {
        case 'checking':
            d = <SmallLoadingAnimation />
            break
        case true:
            d = <IconCheck />
            break
        case false:
            d = <IconX />
            break
        default:
            break
    }
    return (
        <Container>
            <Input type='text' id={`labelForTextField_${uniqueId}`} className={(val.length > 0 || placeholder.length > 0)?'entered':null} placeholder={placeholder} value={val} onChange={onChangeFunction} />
            <Label htmlFor={`labelForTextField_${uniqueId}`}>{label} {d}</Label>
        </Container>
    )
}

export default TextField