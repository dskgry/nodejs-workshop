/**
 * @author Sven Koelpin
 */
import React from 'react';
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
    tweet: React.PropTypes.shape({
        user: React.PropTypes.string.isRequired,
        tweet: React.PropTypes.string.isRequired
    })
};

export default Tweet;

