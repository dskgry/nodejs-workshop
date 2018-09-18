/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Navigation from '../nav/Navigation';
import Loading from '../component/Loading';

import { signIn } from './Auth';
import { ROUTES } from '../router/AppRouter';


class AuthView extends Component {
    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            userName: '',
            pass: '',
            loading: false,
            loginError: false
        };
    }

    async onLogin(event) {
        event.preventDefault();
        this.setState({loading: true, loginError: false});

        try {
            await signIn(this.state);
            this.props.history.push(ROUTES.HOME);
        } catch (e) {
            this.setState({loading: false, loginError: true});
        }
    }

    handleFormChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        const {userName, pass, loading, loginError} = this.state;

        return (
            <Container>
                <Navigation/>
                <Row>
                    <Col>
                        {loading && <Loading cover/>}
                        <Form onSubmit={this.onLogin}>
                            <FormGroup>
                                <Label>Your name (min. 3 characters)</Label>
                                <Input name="userName" value={userName} onChange={this.handleFormChange} required pattern=".{3,50}" type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Your pass</Label>
                                <Input name="pass" value={pass} onChange={this.handleFormChange} required pattern=".{6,50}" type="password"/>
                            </FormGroup>
                            {
                                loginError && <ErrorMsg>Ups that did not work. The password is &apos;summit&apos; :)</ErrorMsg>
                            }
                            <Button disabled={loading} color="primary">Let&apos;s go</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(AuthView);

const ErrorMsg = styled.div`
  text-align: center;
  color: #721c24;
  border: darkred solid 1px;
  background: #f8d7da;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
`;
