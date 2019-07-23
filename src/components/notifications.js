import React from 'react'
import Styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Container = Styled.div`
    height: 0;
    padding: 0 5px;
    z-index: 3;
`
const Notification = Styled.div`
    max-width: 900px;
    margin: 5px auto;
    border: 2px solid #33aaff;
    border-radius: 3px;
    background: #e6f4ff;
    box-shadow: 0 0 2px 1px rgba(0,0,0,0.1);
    transition: all .25s ease;

    &.notification-enter {
        opacity: 0;
    }
    &.notification-enter-active {
        opacity: 1;
    }
    &.notification-exit {
        opacity: 1;
    }
    &.notification-exit-active {
        opacity: 0;
    }
`
const ErrorNotification = Styled.div`
    max-width: 900px;
    margin: 5px auto;
    border: 2px solid #ff0000;
    border-radius: 3px;
    background: #ffe6e6;
    box-shadow: 0 0 2px 1px rgba(0,0,0,0.1);
    transition: all .25s ease;

    &.notification-enter {
        opacity: 0;
    }
    &.notification-enter-active {
        opacity: 1;
    }
    &.notification-exit {
        opacity: 1;
    }
    &.notification-exit-active {
        opacity: 0;
    }
`
const Header = Styled.div`
    position: relative;
    background: #33aaff;
    padding: 2px 32px 2px 2px;
`
const ErrorHeader = Styled.div`
    position: relative;
    background: #ff0000;
    padding: 2px 32px 2px 2px;
`
const Title = Styled.h2`
    color: #fff;
    font-size: 16px;
    line-height: 16px;

`
const HeaderButton = Styled.button`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 18px;
    border: none;
    font-size: 22px;
    line-height: 18px;
    color: #fff;
    background: #33aaff;
    border-radius: 0 3px 0 0;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #33aaff;
        background: #fff;
    }
`
const ErrorHeaderButton = Styled.button`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 18px;
    border: none;
    font-size: 22px;
    line-height: 18px;
    color: #fff;
    background: #ff0000;
    border-radius: 0 3px 0 0;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #ff0000;
        background: #fff;
    }
`
const Message = Styled.p`
    padding: 5px;
    text-align: center;
`
const Button = Styled.button`
    display: block;
    width: 60px;
    margin: 0 auto 5px auto;
    padding: 5px;
    background: #e6f4ff;
    color: #33aaff;
    font-weight: bold;
    font-size: 12px;
    line-height: 12px;
    border: 2px solid #33aaff;
    border-radius: 3px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #fff;
        background: #33aaff;
    }
`
const ErrorButton = Styled.button`
    display: block;
    width: 60px;
    margin: 0 auto 5px auto;
    padding: 5px;
    background: #ffe6e6;
    color: #ff0000;
    font-weight: bold;
    font-size: 12px;
    line-height: 12px;
    border: 2px solid #ff0000;
    border-radius: 3px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: #fff;
        background: #ff0000;
    }
`

class Notifications extends React.Component {
    constructor(props) {
        super()
    }

    render = () => {
        const notifications = this.props.data
        const onClickFunction = this.props.onClickFunction
        return (
            <Container>
                <TransitionGroup>
                {notifications.map((n, index) => 
                    <CSSTransition key={`notification_${index}`} timeout={250} classNames={`notification`}>
                        {(n.error)
                        ?
                        <ErrorNotification>
                            <ErrorHeader>
                                <Title>{n.title}</Title>
                                <ErrorHeaderButton value={index} onClick={onClickFunction}>&times;</ErrorHeaderButton>
                            </ErrorHeader>
                            <Message>{n.message}</Message>
                            <ErrorButton value={index} onClick={onClickFunction}>Close</ErrorButton>
                        </ErrorNotification>
                        :
                        <Notification>
                            <Header>
                                <Title>{n.title}</Title>
                                <HeaderButton value={index} onClick={onClickFunction}>&times;</HeaderButton>
                            </Header>
                            <Message>{n.message}</Message>
                            <Button value={index} onClick={onClickFunction}>Okay</Button>
                        </Notification>}
                    </CSSTransition>
                )}
                </TransitionGroup>
            </Container>
        )
    }
}

export default Notifications