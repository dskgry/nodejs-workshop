/**
 * @author Sven Koelpin
 */
import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Navbar, Row } from 'reactstrap';
import style from './navigation.less';
import { ROUTES } from '../router/AppRouter';
import { signOut } from '../auth/Auth';

const Navigation = ({home}) => (
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
);

Navigation.propTypes = {
    home: bool
};

Navigation.defaultProps = {
    home: false
};

export default Navigation;
