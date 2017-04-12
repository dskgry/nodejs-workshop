/**
 * @author Sven Koelpin
 */
import React from 'react';
import { shape, string } from 'prop-types';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import style from './tweet.less';


const Tweet = props => {
    const {user, tweet} = props.tweet;
    return (
        <ListGroupItem className={style.tweet}>
            <ListGroupItemHeading>{user}</ListGroupItemHeading>
            <ListGroupItemText className={style.content}>{tweet}</ListGroupItemText>
        </ListGroupItem>
    );
};

Tweet.propTypes = {
    tweet: shape({
        user: string.isRequired,
        tweet: string.isRequired
    })
};

export default Tweet;

