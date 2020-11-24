import './App.css';
import TodoMvc from "./pages/todo-mvc";

export const ALL_TODOS = 'ALL';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';
export const ESCAPE_KEY = 27;
export const ENTER_KEY = 13;


function App(props) {


    return (
        <TodoMvc model={props.model}></TodoMvc>
    );
}

export default App;
