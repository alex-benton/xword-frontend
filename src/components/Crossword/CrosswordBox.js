import React from 'react';
import Box from './../../objects/box.js';
import {boxState} from './../../objects/constants.js';

class CrosswordBox extends React.Component {

    constructor(props) {
        super(props);
    }

    getBoxStyle() {
        switch (this.props.box.state) {
            case boxState.NORMAL:
                return {
                    height: this.props.height + 'px',
                    width: this.props.width + 'px',
                    border: '1px black solid',
                    boxSizing: 'border-box'
                };
            case boxState.FOCUSED:
                return {
                    height: this.props.height + 'px',
                    width: this.props.width + 'px',
                    border: '1px black solid',
                    boxSizing: 'border-box',
                    backgroundColor: '#CBCBFF'
                };
            case boxState.SELECTED:
                return {
                    height: this.props.height + 'px',
                    width: this.props.width + 'px',
                    border: '1px black solid',
                    boxSizing: 'border-box',
                    backgroundColor: '#EBEBEB'
                };
            case boxState.ACTIVE:
                return {
                    height: this.props.height + 'px',
                    width: this.props.width + 'px',
                    border: '1px black solid',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFF0CB'
                };
            case boxState.BLACKBOX:
                return {
                    height: this.props.height + 'px',
                    width: this.props.width + 'px',
                    border: '1px black solid',
                    boxSizing: 'border-box',
                    backgroundColor: 'black'
                };
        }
    }

    getNumberStyle() {
        return {
            fontSize: Math.floor(this.props.height/3.5) + 'px',
            padding: '1px',
            position: 'absolute'
        };
    }

    getValueStyle() {
        return {
            lineHeight: this.props.height + 'px',
            textAlign: 'center',
            fontFamily: "'Raleway', sans-serif"
        };
    }

    render() {
        var boxStyle = this.getBoxStyle();
        var numberStyle = this.getNumberStyle();
        var valueStyle = this.getValueStyle();
        var onClick = (function(that) {
            return function() {that.props.onClick(that.props.box);};
        })(this);
        var clueNumber = null;
        var value = this.props.box.value !== null ? (
            <div style={valueStyle}>
                {this.props.box.value}
            </div>
        ) : null;

        if (this.props.box.isBlackBox()) {
            // do nothing
        } else if (this.props.box.across !== null && this.props.box.across.char === 0) {
            clueNumber = (
                <div style={numberStyle}>
                    {this.props.box.across.clue}
                </div>);
        } else if (this.props.box.down !== null && this.props.box.down.char === 0) {
            clueNumber = (
                <div style={numberStyle}>
                    {this.props.box.down.clue}
                </div>);
        }

        return (<div style={boxStyle} onClick={onClick}>
            {clueNumber}
            {value}
        </div>);
    }
}


CrosswordBox.propTypes = {
    box: React.PropTypes.instanceOf(Box).isRequired,
    onClick: React.PropTypes.func.isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.number
};

CrosswordBox.defaultProps = {
    height: 30,
    width: 30
};

module.exports = CrosswordBox;