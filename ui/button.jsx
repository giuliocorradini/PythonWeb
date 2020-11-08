import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.updateLabel = this.updateLabel.bind(this);
    }

    updateLabel(label) {
        this.props.label = label;
    }

    render() {
        return <button>{this.props.label}</button>
    }
}

class SwitchButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {clicked: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        evt.preventDefault();
        this.setState(state => {
            state.clicked = !state.clicked;
        })
    }

    render() {
        return <Button onClick={this.handleClick}>{this.state.clicked ?
            this.props.label.clicked : this.props.label.nonClicked}</Button>
    }
}