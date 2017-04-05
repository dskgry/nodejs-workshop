/**
 * @author Sven Koelpin
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Navigation from '../nav/Navigation';
import Loading from '../component/Loading';

import { signIn } from './AuthService';
import { ROUTES } from '../router/AppRouter';


class AuthView extends PureComponent {
    static get propTypes() {
        return {
            history: React.PropTypes.object.isRequired
        }
    }

    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            userName: '',
            pass: '',
            loading: false
        }
    }

    async onLogin(event) {
        event.preventDefault();
        this.setState({loading: true});

        try {
            await signIn(this.state);
            this.props.history.push(ROUTES.HOME);
        } catch (e) {
            this.setState({loading: false});
        }
    }

    handleFormChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        const {userName, pass, loading} = this.state;

        return (
            <Container>
                <Navigation/>
                <Row>
                    <Col>
                        {loading && <Loading cover/>}
                        <Form onSubmit={this.onLogin}>
                            <FormGroup>
                                <Label>Your name</Label>
                                <Input name="userName" value={userName} onChange={this.handleFormChange} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Your pass</Label>
                                <Input name="pass" value={pass} onChange={this.handleFormChange} type="password"/>
                            </FormGroup>
                            <Button disabled={loading} color="primary">Let's go</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default withRouter(AuthView);
