/**
 * @author Sven Koelpin
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Navbar, Row } from 'reactstrap';
import style from './navigation.less';
import { ROUTES } from '../router/AppRouter';
import { signOut } from '../auth/AuthService';

const Navigation = ({home}) => {
    return (
        <Row>
            <Col>
                <Navbar className={style.nav}>
                    <h4>TWTTR</h4>
                    {
                        home && <Link to={ROUTES.AUTH} onClick={signOut}>Sign out</Link>
                    }
                </Navbar>
            </Col>
        </Row>
    )
};

Navigation.propTypes = {
    home: React.PropTypes.bool
};

export default Navigation;
