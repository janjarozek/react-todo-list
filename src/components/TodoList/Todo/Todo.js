import React, { Component } from 'react'

export default class Todo extends Component {
    render() {
    const { todo, changeStatus } = this.props;
        return (
            <div>
                <input id={todo.id} type="checkbox" checked={todo.finished} onChange={changeStatus} />
                <label className="todoLabel">
                    {todo.name}
                </label>
            </div>
        )
    }
}
