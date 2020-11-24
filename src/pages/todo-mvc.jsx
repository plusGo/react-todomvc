import {Component} from 'react'
import TodoMvcHeader from "../components/todo-mvc-header";

class TodoMvc extends Component {
    render() {
        return (
            <section className="todoapp">
                <TodoMvcHeader></TodoMvcHeader>
            </section>
        )
    }
}

export default TodoMvc;
