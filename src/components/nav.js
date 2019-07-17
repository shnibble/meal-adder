import React from 'react'
import { NavLink } from 'react-router-dom'
import Styled from 'styled-components'

const Container = Styled.nav`
    flex-shrink: 0;
    text-align: center;
    background: #0094ff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > a {
        display: inline-block;
        padding: 10px;
        margin: 0px 1px 2px 1px;
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        color: #f2f2f2;
        transition: color .25s ease, background-color .25s ease;


        &:hover, &:focus {
            background: #80caff;
            outline: none;
        }
        &.active {
            background: #fff;
            color: #0094ff;
        }
    }
`

const Nav = () => {
    return (
        <Container>
            <NavLink to='/meals/'>Meals</NavLink>
            <NavLink to='/categories/'>Categories</NavLink>
            <NavLink to='/origins/'>Origins</NavLink>
            <NavLink to='/tags/'>Tags</NavLink>
        </Container>
    )
}

export default Nav