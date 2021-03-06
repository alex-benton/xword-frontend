/**
 * Created by alex on 12/7/15.
 */

import React from 'react';
import Clue from './../../objects/clue.js';
import CrosswordClue from './CrosswordClue.js';
import './EditableCrosswordClue.css';
class EditableCrosswordClue extends CrosswordClue {

    constructor(props) {
        super(props);
        this.clue = this.props.clue;
        this.state = {
            value: this.props.clue.text,
            isEditing: this.props.isEditing
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillReceiveProps(props) {
        this.state = {
            value: props.clue.text,
            isEditing: props.isEditing
        };
        this.clue = props.clue;
    }

    getEditingClueStyle() {
        return {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "15px"
        };
    }

    getEditBoxStyle() {
        return {
            border: "0px",
            backgroundColor: "#DDDDDD",
            marginLeft: "5px",
            width: "calc(100% - 45px)",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "13px"
        };
    }

    handleBlur(event) {
        this.setState({isEditing: false});
        if (this.props.onFinishEditing) {
            this.props.onFinishEditing(this.clue);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.clue.text = event.target.value;
    }

    handleKeydown(event) {
        if (event.which === 13 || event.which === 27) {
            this.setState({isEditing: false});
            if (this.props.onFinishEditing) {
                this.props.onFinishEditing(this.clue);
            }
        } else if (event.which === 38) { //up
            event.preventDefault();
            this.setState({isEditing: false});
            if (this.props.onNavigateClue) {
                this.props.onNavigateClue(this.clue, 'down');
            }
        } else if (event.which === 40) { //down
            event.preventDefault();
            this.setState({isEditing: false});
            if (this.props.onNavigateClue) {
                this.props.onNavigateClue(this.clue, 'up');
            }
        }
    }

    render() {
        var value = this.state.value;
        if (this.state.isEditing) {
            return (<div className="crossword-clue"><b>{this.props.clue.number}</b><input type="text" ref="edit" value={value} onChange={this.handleChange} onKeyDown={this.handleKeydown} onBlur={this.handleBlur} /></div>);
        } else {
            return super.render();
        }
    }

    componentDidUpdate() {
        if (this.state.isEditing) {
            this.refs.edit.focus();

            // hack to always put the cursor at the end of the value
            let val = this.refs.edit.value;
            this.refs.edit.value = "";
            this.refs.edit.value = val;
        }
    }
}

EditableCrosswordClue.propTypes = {
    clue: React.PropTypes.instanceOf(Clue).isRequired,
    isEditing: React.PropTypes.bool,
    onFinishEditing: React.PropTypes.func,
    onNavigateClue: React.PropTypes.func
};

module.exports = EditableCrosswordClue;