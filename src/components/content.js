import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Styled from 'styled-components'
import LoadingAnimation from './loadingAnimation'
import Redir from './redir'
import Meals from './meals'
import Categories from './categories'
import Origins from './origins'
import Tags from './tags'

const Container = Styled.div`
    position: relative;
    flex-grow: 1;
    flex-shrink: 1

    & .page {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 10px;
        overflow-y: auto;
        transition: all .25s ease;
    }
    & .page-enter {
        opacity: 0;
        top: -50px;
    }
    & .page-enter-active {
        opacity: 1;
        top: 0;
    }
    & .page-exit {
        opacity: 1;
        top: 0;
    }
    & .page-exit-active {
        opacity: 0;
        top: 100px;
    }
`
const ErrorTitle = Styled.h2`
    color: #ff0000;
    text-align: center;
`
const ErrorMessage = Styled.p`
    color: #ff6666;
    text-align: center;
`

const Content = ({ data, methods }) => {
    
    const routes = [
        { path: '/', name: 'DefaultRedirect', Component: Redir , componentData: null },
        { path: '/meals/', name: 'Meals', Component: Meals, componentData: data },
        { path: '/categories/', name: 'Categories', Component: Categories, componentData: data },
        { path: '/origins/', name: 'Origins', Component: Origins, componentData: data },
        { path: '/tags/', name: 'Tags', Component: Tags, componentData: data }
    ]

    return (
        <Container>
            {(data.loading)
            ?
            <div className="page">
                <LoadingAnimation />
            </div>          
            :
            (data.error)
            ?
            <div className="page">
                <ErrorTitle>Error</ErrorTitle>
                <ErrorMessage>{data.errorText}</ErrorMessage>
            </div>
            :
            routes.map(({ path, Component, componentData }) => (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <CSSTransition
                      in={match != null}
                      timeout={250}
                      classNames="page"
                      unmountOnExit
                    >
                      <div className="page">
                        <Component data={componentData} methods={methods} />
                      </div>
                    </CSSTransition>
                  )}
                </Route>
            ))
            }
        </Container>
    )
}

export default Content