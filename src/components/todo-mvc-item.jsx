import React, {Component} from 'react';
import {ENTER_KEY, ESCAPE_KEY} from '../App';
import classnames from 'classnames'

export default class TodoMvcItem extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {editText: this.props.todo.title}
    }

    handleSubmit = (event) => {
        const value = this.state.editText.trim();
        if (value) {
            this.props.onSave(value);
            this.setState({editText: value});
        } else {
            this.props.onDestroy();
        }
    }

    handleEdit = () => {
        this.props.onEdit();
        this.setState({editText: this.props.todo.title});
    }

    handleKeyDown = (event) => {
        if (event.which === ESCAPE_KEY) {
            if (event.which === ESCAPE_KEY) {
                this.setState({editText: this.props.todo.title});
                this.props.onCancel(event);
            } else if (event.which === ENTER_KEY) {
                this.handleSubmit(event);
            }
        }
    }

    handleChange = (event) => {
        if (this.props.editing) {
            this.setState({editText: event.target.value});
        }
    }

    getInitialState = () => {
        return {editText: this.props.todo.title};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText
        );
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            const node = React.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }

    render() {
        return (
            <li className={classnames({
                completed: this.props.todo.completed,
                editing: this.props.editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.props.onDestroy}/>
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        )
    }

}
