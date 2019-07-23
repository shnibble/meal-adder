import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Styled from 'styled-components'
import LoadingAnimation from './loadingAnimation'
import routes from '../routes.js'

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

const Content = ({ data, methods }) => {

    return (
        <Container>
            {routes.map(({ path, Component }) => {
                return (
                    <Route key={path} exact path={path}>
                    {({ match }) => (
                        <CSSTransition
                        in={match != null}
                        timeout={250}
                        classNames="page"
                        unmountOnExit
                        >
                        <div className="page">
                            {(data.data.loading)?<LoadingAnimation />:null}
                            <Component data={data} methods={methods} />
                        </div>
                        </CSSTransition>
                    )}
                    </Route>
                )
            })}
        </Container>
    )
}

export default Content