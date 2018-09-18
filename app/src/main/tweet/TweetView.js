/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
import Navigation from '../nav/Navigation';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

import { createSocket, requestGet, requestPost, URLS } from '../api/ServerApi';
import { getToken } from '../auth/Auth';
import { CancelledPromiseError } from '../api/CancelablePromise';

class TweetView extends Component {
    constructor() {
        super();
        this.onAddTweet = this.onAddTweet.bind(this);
        this.streamTweets = this.streamTweets.bind(this);

        this.state = {
            tweets: [],
            fetchingData: true,
            user: getToken().name,
            error: false
        };
    }

    async componentDidMount() {
        await this.fetchTweets();
        this.socket = createSocket(this.streamTweets);
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.close();
        }

        if (this.request) {
            this.request.cancel();
        }
    }


    async onAddTweet(newTweet) {
        this.setState({fetchingData: true});
        try {
            this.request = requestPost('tweets', newTweet);
            const createdTweet = await this.request;

            const nextTweets =
                this.tweetIsNotFetched(createdTweet) ? [createdTweet, ...this.state.tweets] : this.state.tweets;

            this.setState({
                tweets: nextTweets,
                fetchingData: false
            });
        } catch (e) {
            if (!(e instanceof CancelledPromiseError)) {
                this.setState({
                    fetchingData: false
                });
            }
        }
    }

    async fetchTweets() {
        try {
            this.request = requestGet(URLS.TWEETS);
            const tweets = await this.request;
            this.setState({
                tweets,
                fetchingData: false
            });
        } catch (e) {
            if (!(e instanceof CancelledPromiseError)) {
                this.setState({
                    fetchingData: false,
                    error: true
                });
            }
        }
    }

    streamTweets(newTweet) {
        if (this.tweetIsNotFetched(newTweet)) {
            this.setState({
                tweets: [newTweet, ...this.state.tweets]
            });
        }
    }

    tweetIsNotFetched(newTweet) {
        return typeof this.state.tweets.find(tweet => tweet.id === newTweet.id) === 'undefined';
    }

    render() {
        const {
            tweets,
            fetchingData,
            user,
            error
        } = this.state;

        return (
            <Container>
                <Navigation home/>
                <Row>
                    <Col>
                        <Wrap>
                            <TweetForm user={user} onAddTweet={this.onAddTweet} loading={fetchingData}/>
                            <TweetList tweets={tweets} loading={fetchingData} error={error}/>
                        </Wrap>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TweetView;


const Wrap = styled.div`
  min-height: 200px;
`;