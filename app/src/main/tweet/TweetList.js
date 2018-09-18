//@flow

/**
 * @author Sven Koelpin
 */
import React from 'react';
import styled from 'styled-components';
import { ListGroup } from 'reactstrap';
import Loading from '../component/Loading';
import Tweet from './Tweet';
import type { $Tweet } from './Tweet.type';

type $Props = {|
    tweets: Array<$Tweet>;
    loading: boolean;
    error: boolean;
|}

const TweetList = ({tweets, loading, error}: $Props) => {
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
