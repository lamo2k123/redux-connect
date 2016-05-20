import { Component, PropTypes, Children } from 'react'

const store = PropTypes.shape({
    dispatch    : PropTypes.func.isRequired,
    getState    : PropTypes.func.isRequired,
    subscribe   : PropTypes.func.isRequired
}).isRequired;

export default class extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        store
    };

    static childContextTypes = {
        store
    };

    getChildContext() {
        return { store: this._store }
    }

    constructor(props) {
        super(...arguments);

        console.log('PROVIDER props', props);
        this._store = props.store
    }

    render() {
        return Children.only(this.props.children)
    }
}
