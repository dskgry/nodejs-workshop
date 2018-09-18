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
        const {
            Component
        } = this.state;

        if (!Component) {
            const loadedComponent = await getComponent();
            AsyncComponent.Component = loadedComponent;
            this.setState({Component: loadedComponent});
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const {
                Component
            } = this.state;

            if (Component === null) {
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
