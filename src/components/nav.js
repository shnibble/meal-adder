import React from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Styled from 'styled-components'
import routes from '../routes.js'

const Container = Styled.nav`
    flex-shrink: 0;
    text-align: center;
    background: #0094ff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > div > a {
        display: inline-block;
        padding: 10px;
        margin: 0px 1px 2px 1px;
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        color: #f2f2f2;
        transition: all .25s ease;

        &:hover, &:focus {
            background: #80caff;
            outline: none;
        }
        &.active {
            background: #fff;
            color: #0094ff;
        }        
        &.navLink-enter {
            opacity: 0;
            max-width: 0;
            padding: 0;
        }
        &.navLink-enter-active {
            opacity: 1;
            max-width: 500px;
            padding: 10px;
        }
        &.navLink-exit {
            opacity: 1;
            padding: 10px;
        }
        &.navLink-exit-active {
            opacity: 0;
            padding: 0;
            max-width: 0;
        }
    }
`

const Nav = ({ connectionVerified, dataLoaded }) => {
    return (
        <Container>
            <TransitionGroup>
            {routes.map((route) => {
                if (route.name !== 'default' && (!route.protected || (connectionVerified && dataLoaded))) {
                    return (
                        <CSSTransition key={`route_${route.path}`} timeout={250} classNames={`navLink`}>
                            <NavLink key={route.path} to={route.path}>{route.name}</NavLink> 
                        </CSSTransition>
                        )
                }
                return null              
            })}
            </TransitionGroup>
        </Container>
    )
}

export default Nav