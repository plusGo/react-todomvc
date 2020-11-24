import {Component} from 'react'

class TodoMvcHeader extends Component {
    static ENTER_KEY = 13;

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== TodoMvcHeader.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        const value = this.state.newTodo.trim();
        if (value) {
            this.setState({newTodo: ''})
            console.log(value)
        }

    };

    handleChange = (event) => {
        this.setState({newTodo: event.target.value})
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            newTodo: ''
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input type="text" className="new-todo" placeholder="what needs to be done?"
                       value={this.state.newTodo}
                       onKeyDown={this.handleNewTodoKeyDown}
                       onChange={this.handleChange}/>
            </header>
        )
    }
}

export default TodoMvcHeader;
