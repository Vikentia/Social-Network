import React from "react";

class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    componentWillMount() {
        console.log('------componentWillMount-------');
    }
    handleClick() {
        this.setState(state => ({ count: state.count++ }))
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.handleClick()}>Click me</button>
            </div>
        )
    }
}

export default Example;