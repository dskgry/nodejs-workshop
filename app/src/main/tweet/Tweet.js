/**
 * @author Sven Koelpin
 */
import React from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


const Tweet = props => {
    const {user, tweet} = props.tweet;
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

