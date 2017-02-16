/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import style from './tweetForm.less';

const MAX_TWEET_LENGTH = 100;

export default class TweetForm extends Component {
    static get propTypes() {
        return {
            onAddTweet: React.PropTypes.func.isRequired
        }
    }

    constructor(props, state) {
        super(props, state);
        this.onChangeTweet = this.onChangeTweet.bind(this);
        this.onSubmitTweet = this.onSubmitTweet.bind(this);
        this.state = {
            tweet: '',
            invalid: false
        }
    }

    onSubmitTweet(e) {
        e.preventDefault();
        const {onAddTweet} = this.props;
        onAddTweet(this.state.tweet);
        this.setState({
            tweet: ''
        });
    }

    onChangeTweet(e) {
        const tweet = e.target.value;
        if (tweet.length <= MAX_TWEET_LENGTH) {
            this.setState({tweet, invalid: false});
        } else {
            this.setState({invalid: true});
        }
    }


    render() {
        const {tweet, invalid} = this.state;
        return (
            <Form inline onSubmit={this.onSubmitTweet}>
                <FormGroup color={invalid ? 'danger' : null} className={style.form}>
                    <Input value={tweet}
                           max={MAX_TWEET_LENGTH}
                           onChange={this.onChangeTweet}
                           type="text"
                           name="tweet"
                           placeholder="Tweet what u want"/>
                    <span>{tweet.length}/{MAX_TWEET_LENGTH}</span>
                    <Button color="primary">Let's do this</Button>
                </FormGroup>
            </Form>
        );
    }
}