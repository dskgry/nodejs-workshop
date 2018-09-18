//@flow

/**
 * @author Sven Koelpin
 */
import React from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import type { $Tweet } from './Tweet.type';


type $Props = {|
    tweet: $Tweet
|}
const Tweet = (props: $Props) => {
    const {
        user,
        tweet
    } = props.tweet;   //eslint-disable-line

    return (
        <ListGroupItem style={{display: 'block'}}>
            <ListGroupItemHeading>{user}</ListGroupItemHeading>
            <ListGroupItemText style={{overflowWrap: 'break-word', wordWrap: 'break-word'}}>
                {tweet}
            </ListGroupItemText>
        </ListGroupItem>
    );
};

export default Tweet;
