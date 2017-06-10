/**
 * @author Sven Koelpin
 */
import React from 'react';
import { arrayOf, shape, oneOfType, string, number, bool } from 'prop-types';
import { ListGroup } from 'reactstrap';
import Loading from '../component/Loading';
import Tweet from './Tweet';
import style from './tweetList.less';

const TweetList = ({tweets, loading, error}) => {
    if (error) {
        return <div className={style.error}>Unable to load tweets :(</div>;
    }

    return (
        <ListGroup>
            {loading && <Loading cover/>}
            {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet}/>)}
        </ListGroup>
    );
};


TweetList.propTypes = {
    tweets: arrayOf(
        shape({
            id: oneOfType([number, string]).isRequired,
            user: string.isRequired,
            tweet: string.isRequired
        })
    ).isRequired,
    loading: bool.isRequired,
    error: bool.isRequired
};


export default TweetList;
