/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import Navigation from '../nav/Navigation';
import { Button, Form, FormGroup, Input, Label, Container, Row, Col } from 'reactstrap';
import { signIn } from '../api/AuthService';


export default class AuthView extends Component {

    constructor(props, state) {
        super(props, state);
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            userName: '',
            pass: ''
        }
    }

    onLogin(e) {
        e.preventDefault();
        signIn();
    }

    onChangeLogin({prop, val}) {
        const nextState = {};
        nextState[prop] = val;
        this.setState(nextState);
    }


    render() {
        const {userName, pass} = this.state;
        return (
            <Container>
                <Navigation/>
                <Row>
                    <Col>
                        <Form onSubmit={this.onLogin}>
                            <FormGroup>
                                <Label>Your name</Label>
                                <Input value={userName}
                                       onChange={e => this.onChangeLogin({prop: 'userName', val: e.target.value})}
                                       type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Your pass</Label>
                                <Input value={pass}
                                       onChange={e => this.onChangeLogin({prop: 'pass', val: e.target.value})}
                                       type="text"/>
                            </FormGroup>
                            <Button color="primary">Let's go</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

}