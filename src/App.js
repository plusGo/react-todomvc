import './App.css';
import TodoMvc from "./pages/todo-mvc";
import TodoModel from './model/todo.model';

export const ALL_TODOS = 'ALL';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';
export const ESCAPE_KEY = 27;
export const ENTER_KEY = 13;


const model = new TodoModel('react-todos');

model.subscribe(() => {
    console.log(model);
});


function App(props) {
    console.log(props)

    return (
        <TodoMvc model={model}></TodoMvc>
    );
}

export default App;
