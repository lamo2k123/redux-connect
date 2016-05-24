import React, { Component, PropTypes } from 'react'

const store = PropTypes.shape({
    dispatch    : PropTypes.func.isRequired,
    getState    : PropTypes.func.isRequired,
    subscribe   : PropTypes.func.isRequired
});

export default ComponentConnect => class extends Component {

    static contextTypes = { ...ComponentConnect.contextTypes, store : store.isRequired };

    static propTypes = { ...ComponentConnect.contextTypes, store };

    constructor() {
        super(...arguments);

        this.state = this.connect(this.store.getState());
    }

    get store() {
        return this.props.store || this.context.store;
    }

    get connect() {
        let connect = state => ({});

        if(typeof ComponentConnect.connect == 'function') {
            connect = ComponentConnect.connect;
        }

        return connect;
    }

    subscribe = () => {
        let state = JSON.stringify(this.state),
            store = JSON.stringify(this.connect(this.store.getState()));

        if(state != store) {
            this.setState(this.connect(this.store.getState()));
        }
    };

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(this.subscribe);
    }

    componentWillUnmount() {
        if(this.unsubscribe) {
            this.unsubscribe();

            this.unsubscribe = null;
        }
    }

    render() {
        return <ComponentConnect {...this.props} {...this.state} />
    }

}
