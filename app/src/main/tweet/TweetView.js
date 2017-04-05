/**
 * @author Sven Koelpin
 */
import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Navigation from '../nav/Navigation';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

import * as ServerApi from '../api/ServerApi';
import style from './tweetView.less';
import { getToken } from '../auth/AuthService';

export default class TweetView extends PureComponent {

    constructor() {
        super();
        this.onAddTweet = this.onAddTweet.bind(this);

        this.state = {
            tweets: [],
            fetchingData: true,
            user: getToken().name
        }
    }

    componentDidMount() {
        this.fetchTweets();
        ServerApi.subscribe(newTweets => this.setState({tweets: [...newTweets, ...this.state.tweets]}));
    }

    componentWillUnmount() {
        ServerApi.unSubscribe();
    }

    async fetchTweets() {
        try {
            const tweets = await ServerApi.get('tweets');
            this.setState({tweets, fetchingData: false});
        } catch (e) {
            this.setState({fetchingData: false});
        }
    }


    async onAddTweet(newTweet) {
        this.setState({fetchingData: true});
        try {
            const createdTweet = await ServerApi.post('tweets', newTweet);

            this.setState({
                tweets: [createdTweet, ...this.state.tweets],
                fetchingData: false
            });
        } catch (e) {
            this.setState({fetchingData: false});
        }
    }

    render() {
        const {tweets, fetchingData, user} = this.state;

        return (
            <Container>
                <Navigation home/>
                <Row>
                    <Col>
                        <div className={style.tweetView}>
                            <TweetForm user={user} onAddTweet={this.onAddTweet} loading={fetchingData}/>
                            <TweetList tweets={tweets} loading={fetchingData}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}
