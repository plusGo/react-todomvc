import {Component} from 'react';
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS} from '../App';
import classnames from 'classnames'

export default class TodoMvcFooter extends Component {
    render() {
        let clearButton = null;
        if (this.props.completeCount > 0) {
            clearButton = (
                <button className="clear-completed"
                        onClick={this.props.onClearCompleted}>清除已完成的</button>
            )
        }
        const nowShowing = this.props.nowShowing;
        return (
            <footer className="footer">
                <span className="todo-count">
                   还剩下<strong>{this.props.count}</strong>个待完成
                </span>
                <ul className="filters">
                    <li>
                        <a href="#/" className={classnames({selected: nowShowing === ALL_TODOS})}>ALL</a>
                    </li>
                    <li>
                        <a href="#/active" className={classnames({selected: nowShowing === ACTIVE_TODOS})}>ACTIVE</a>
                    </li>
                    <li>
                        <a href="#/completed" className={classnames({selected: nowShowing === COMPLETED_TODOS})}>COMPLETED</a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        )
    }

}
