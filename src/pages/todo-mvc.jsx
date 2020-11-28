import React, {Component} from 'react'
import TodoMvcItem from "../components/todo-mvc-item";
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, ENTER_KEY} from '../App';
import TodoMvcFooter from '../components/todo-mvc-footer';

class TodoMvc extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            nowShowing: ALL_TODOS,
            editing: null,
            newTodo: ''
        }
    }


    componentWillUnmount() {
        window.onhashchange = null
    }

    componentDidMount() {
        this.changeNowShowingByHash(window.location.hash);
        window.onhashchange = event => this.changeNowShowingByHash(event.newURL)
    }

    changeNowShowingByHash(hash) {
        if (hash.endsWith('/')) {
            this.setState({nowShowing: ALL_TODOS});
        } else if (hash.endsWith('/active')) {
            this.setState({nowShowing: ACTIVE_TODOS});
        } else {
            this.setState({nowShowing: COMPLETED_TODOS});
        }
    }

    handleChange = (event) => {
        this.setState({newTodo: event.target.value});
    };

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }
        event.preventDefault();

        const val = this.state.newTodo.trim();

        if (val) {
            this.props.model.addTodo(val);
            this.setState({newTodo: ''});
        }
    };

    toggleAll(event) {
        const checked = event.target.checked;
        this.props.model.toggleAll(checked);
    }

    toggle(todoToToggle) {
        this.props.model.toggle(todoToToggle);
    }

    destroy(todo) {
        this.props.model.destroy(todo);
    }

    edit(todo) {
        this.setState({editing: todo.id});
    }

    save(todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    }

    cancel() {
        this.setState({editing: null});
    }

    clearCompleted() {
        this.props.model.clearCompleted();
    }

    render() {
        let footer, main;
        const todos = this.props.model.todos;

        const shownTodos = todos.filter((todo) => {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });

        const todoItems = shownTodos.map((todo) => {
            return (
                <TodoMvcItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel}
                />
            );
        });


        const activeTodoCount = todos.filter($todo => !$todo.completed).length;

        const completedCount = todos.length - activeTodoCount;


        if (activeTodoCount || completedCount) {
            footer =
                <TodoMvcFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />;
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        id="toggle-all"
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <label
                        htmlFor="toggle-all"
                    />
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input type="text" className="new-todo" placeholder="what needs to be done?"
                           value={this.state.newTodo}
                           onKeyDown={this.handleNewTodoKeyDown}
                           onChange={this.handleChange}/>
                </header>
                {main}
                {footer}
            </section>
        )
    }
}

export default TodoMvc;
