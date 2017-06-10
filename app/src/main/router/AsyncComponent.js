/**
 * @author Sven Koelpin
 */
import React from 'react';
import Loading from '../component/Loading';

export default getComponent => class AsyncComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            Component: (AsyncComponent.Component) ? AsyncComponent.Component : null,
            loading: false
        };
    }

    async componentWillMount() {
        if (!this.state.Component) {
            const Component = await getComponent();
            AsyncComponent.Component = Component;
            this.setState({Component});
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.Component === null) {
                this.setState({loading: true});
            }
        }, 250);
    }

    render() {
        const {Component, loading} = this.state;
        if (Component) {
            return <Component {...this.props}/>;
        }
        return loading ? <Loading/> : null;
    }
};
