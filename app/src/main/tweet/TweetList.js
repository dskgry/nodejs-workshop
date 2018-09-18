/**
 * @author Sven Koelpin
 */
import React from 'react';
import styled from 'styled-components';
import { ListGroup } from 'reactstrap';
import Loading from '../component/Loading';
import Tweet from './Tweet';

const TweetList = ({tweets, loading, error}) => {
    if (error) {
        return <Error>Unable to load tweets :(</Error>;
    }

    return (
        <ListGroup>
            {loading && <Loading cover/>}
            {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet}/>)}
        </ListGroup>
    );
};

export default TweetList;

const Error = styled.div`
  color: red;
  text-align: center;
`;
