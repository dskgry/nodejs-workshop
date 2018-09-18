//@flow

/**
 * @author Sven Koelpin
 */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { ROUTES } from '../router/AppRouter';
import { signOut } from '../auth/Auth';

type $Props = {|
    home?: boolean;
|}

const Navigation = ({home}: $Props) => (
    <Row>
        <Col>
            <NavBar>
                <h4>TWTTR</h4>
                {
                    home && <Link to={ROUTES.AUTH} onClick={signOut}>Sign out</Link>
                }
            </NavBar>
        </Col>
    </Row>
);

Navigation.defaultProps = {
    home: false
};

export default Navigation;

const NavBar = styled.nav`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #0275d8;
  color: white;
  
  > a {
    color: white;
    text-align: right;
  }
`;
