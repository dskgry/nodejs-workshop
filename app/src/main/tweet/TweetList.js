/**
 * @author Sven Koelpin
 */
import React from 'react';
import { ListGroup } from 'reactstrap';
import Loading from '../component/Loading';
import Tweet from './Tweet';


const TweetList = ({tweets, loading}) => {
    if (loading) {
        return <Loading/>;
    }

    return <ListGroup>{tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet}/>)}</ListGroup>;
};


TweetList.propTypes = {
    tweets: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            user: React.PropTypes.string.isRequired,
            tweet: React.PropTypes.string.isRequired
        })
    ),
    loading: React.PropTypes.bool
};

export default TweetList;
