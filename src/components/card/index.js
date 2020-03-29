import React from 'react';
import './card.css'

export default class Card extends React.Component {
    render(){
        return(
            <div className={`card ${ this.props.className }`} style={{minHeight: `${ this.props.min_height }rem`}}>
                <h6>{this.props.children}</h6>
            </div>
        );
    }
}

Card.defaultProps = {
    min_height: '1'
};