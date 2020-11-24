import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodoModel from './model/todo.model';

const model = new TodoModel('react-todos');

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App model={model}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

model.subscribe(() => {
    console.log(model);
    render()
});

render();
