//@flow

/**
 * @author Sven Koelpin
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';

type $Props = {|
    cover?: boolean;
|}

const Loading = ({cover}: $Props) => (
    <Container cover={cover}>
        <LoaderElement/>
    </Container>
);

Loading.defaultProps = {
    cover: false
};

export default Loading;


const CoveredMixin = `
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

const SpinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderElement = styled.div`
  display: inline-block;
  border: 5px solid black;
  border-top: 5px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${SpinAnimation} 1s linear infinite;
`;


const Container = styled.div`
  margin-top: 20px;
  padding: 5px;
  text-align: center;
  ${({cover}) => cover ? CoveredMixin : null}
`;
