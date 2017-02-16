/**
 * @author Sven Koelpin
 */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Navbar } from 'reactstrap';
import style from './navigation.less';
import { signOut } from '../api/AuthService';

const Navigation = props => {
    const {home} = props;

    return (
        <Row>
            <Col>
                <Navbar className={style.nav}>
                    <h4>TWTTR</h4>
                    {
                        home && <Link to="/auth" onClick={signOut}>Sign out</Link>
                    }
                </Navbar>
            </Col>
        </Row>
    )
};

Navigation.propTypes = {
    home: React.PropTypes.bool
};

Navigation.defaultProps = {
    home: false
};

export default Navigation;
