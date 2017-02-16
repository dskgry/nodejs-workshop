/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import * as ServerApi from '../api/ServerApi';
import style from './tweetView.less';
import TweetForm from './TweetForm';
import TweetList from './TweetList';
import Navigation from '../nav/Navigation';

export default class TweetView extends Component {

    constructor(props, state) {
        super(props, state);
        this.onAddTweet = this.onAddTweet.bind(this);
        this.state = {
            tweets: [],
            fetchingData: true
        }
    }

    componentDidMount() {
        ServerApi.get('tweets').then(tweets => this.setState({tweets, fetchingData: false}));
        ServerApi.subscribe(newTweets => this.setState({
            tweets: [...newTweets, ...this.state.tweets]
        }));
    }

    componentWillUnmount() {
        ServerApi.unSubscribe();
    }


    onAddTweet(newTweet) {
        this.setState({fetchingData: true});
        ServerApi.post('tweets', newTweet).then(tweets => this.setState({tweets, fetchingData: false}));
    }

    render() {
        const {tweets, fetchingData} = this.state;

        return (
            <Container>
                <Navigation home/>
                <Row>
                    <Col>
                        <div className={style.tweetView}>
                            <TweetForm onAddTweet={this.onAddTweet}/>
                            <TweetList tweets={tweets} loading={fetchingData}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}