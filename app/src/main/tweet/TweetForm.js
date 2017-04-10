/**
 * @author Sven Koelpin
 */
import React, { PureComponent } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import style from './tweetForm.less';

const MAX_TWEET_LENGTH = 100;

export default class TweetForm extends PureComponent {
    static get propTypes() {
        return {
            onAddTweet: React.PropTypes.func.isRequired,
            loading: React.PropTypes.bool,
            user: React.PropTypes.string.isRequired
        }
    }

    constructor(props) {
        super(props);
        this.onChangeTweet = this.onChangeTweet.bind(this);
        this.onSubmitTweet = this.onSubmitTweet.bind(this);

        this.state = {tweet: ''}
    }

    onSubmitTweet(event) {
        event.preventDefault();
        const {user, onAddTweet} = this.props;

        onAddTweet({tweet: this.state.tweet, user});
        this.setState({tweet: ''});
    }

    onChangeTweet(event) {
        const tweet = event.target.value;

        if (tweet.length <= MAX_TWEET_LENGTH) {
            this.setState({tweet});
        }
    }


    render() {
        const {loading, user} = this.props;
        const {tweet} = this.state;

        return (
            <Form inline onSubmit={this.onSubmitTweet}>
                <FormGroup className={style.form}>
                    <Label for="tweet">{user}:</Label>
                    <Input value={tweet}
                           disabled={loading}
                           max={MAX_TWEET_LENGTH}
                           onChange={this.onChangeTweet}
                           type="text"
                           name="tweet"
                           placeholder="Tweet what u want"/>

                    <span>{tweet.length}/{MAX_TWEET_LENGTH}</span>

                    <Button disabled={loading || tweet.length === 0} color="primary">Let's do this</Button>
                </FormGroup>
            </Form>
        );
    }
}
