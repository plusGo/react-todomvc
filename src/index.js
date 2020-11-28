import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodoModel from './model/todo.model';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <Route path="/" exact component={App}/>
            </Router>
        </React.StrictMode>
        ,
        document.getElementById('root')
    );
}
render();
