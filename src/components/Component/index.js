import React from 'react';
import './style.css';

class Component extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='componentInfo'>
                О компонентах
            </div>
        )
    }
}
export default Component;