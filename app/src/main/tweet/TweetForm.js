//@flow
/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import type { $Tweet } from './Tweet.type';

const MIN_TWEET_LENGTH = 3;
const MAX_TWEET_LENGTH = 100;

type $Props = {|
    user: string;
    onAddTweet: (tweet: $Tweet) => any;
    loading: boolean;
|}

type $State = {|
    tweet: string;
|}

class TweetForm extends Component<$Props, $State> {
    constructor(props: $Props) {
        super(props);
        (this: any).onChangeTweet = this.onChangeTweet.bind(this);
        (this: any).onSubmitTweet = this.onSubmitTweet.bind(this);

        this.state = {tweet: ''};
    }

    onSubmitTweet(event: *) {
        event.preventDefault();
        const {
            user,
            onAddTweet
        } = this.props;

        const {
            tweet
        } = this.state;

        onAddTweet({tweet, user});
        this.setState({tweet: ''});
    }

    onChangeTweet(event: *) {
        const tweet = event.target.value;

        if (tweet.length <= MAX_TWEET_LENGTH) {
            this.setState({tweet});
        }
    }


    render() {
        const {
            loading,
            user
        } = this.props;

        const {
            tweet
        } = this.state;

        return (
            <Form inline onSubmit={this.onSubmitTweet}>
                <FormGroup style={{margin: '10px auto'}}>
                    <Label for="tweet">
                        {`${user}:`}
                    </Label>
                    <Input
                        value={tweet}
                        disabled={loading}
                        required
                        pattern={`.{${MIN_TWEET_LENGTH},${MAX_TWEET_LENGTH}}`}
                        max={MAX_TWEET_LENGTH}
                        onChange={this.onChangeTweet}
                        type="text"
                        name="tweet"
                        placeholder="Tweet what u want"
                    />

                    <CharsLeft>
                        {tweet.length}
                        /
                        {MAX_TWEET_LENGTH}
                    </CharsLeft>

                    <Button disabled={loading || tweet.length < (MIN_TWEET_LENGTH)} color="primary">
                        Let&apos;s do this
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default TweetForm;

const CharsLeft = styled.span`
  margin: 10px 10px 10px 0;
  display: inline-block;
  width: 60px;
  text-align: right;
`;
