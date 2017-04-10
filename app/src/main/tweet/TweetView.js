/**
 * @author Sven Koelpin
 */
import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Navigation from '../nav/Navigation';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

import ServerApi, { URLS } from '../api/ServerApi';
import style from './tweetView.less';
import { getToken } from '../auth/AuthService';

export default class TweetView extends PureComponent {

    constructor() {
        super();
        this.onAddTweet = this.onAddTweet.bind(this);

        this.state = {
            tweets: [],
            fetchingData: true,
            user: getToken().name,
            error: false
        }
    }

    async componentDidMount() {
        await this.fetchTweets();
        ServerApi.subscribeStream(this.streamTweets.bind(this));
    }

    componentWillUnmount() {
        ServerApi.unSubscribeStream();
    }

    tweetIsNotFetched(newTweet) {
        return typeof this.state.tweets.find(tweet => tweet.id === newTweet.id) === 'undefined';
    }

    streamTweets(newTweet) {
        if (this.tweetIsNotFetched(newTweet)) {
            this.setState({tweets: [newTweet, ...this.state.tweets]});
        }
    }

    async fetchTweets() {
        try {
            const tweets = await ServerApi.get(URLS.TWEETS);
            this.setState({tweets, fetchingData: false});
        } catch (e) {
            this.setState({fetchingData: false, error: true});
        }
    }


    async onAddTweet(newTweet) {
        this.setState({fetchingData: true});
        try {
            const createdTweet = await ServerApi.post('tweets', newTweet);
            const nextTweets =
                this.tweetIsNotFetched(createdTweet) ? [createdTweet, ...this.state.tweets] : this.state.tweets;

            this.setState({
                tweets: nextTweets,
                fetchingData: false
            });
        } catch (e) {
            this.setState({fetchingData: false});
        }
    }

    render() {
        const {tweets, fetchingData, user, error} = this.state;

        return (
            <Container>
                <Navigation home/>
                <Row>
                    <Col>
                        <div className={style.tweetView}>
                            <TweetForm user={user} onAddTweet={this.onAddTweet} loading={fetchingData}/>
                            <TweetList tweets={tweets} loading={fetchingData} error={error}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}
