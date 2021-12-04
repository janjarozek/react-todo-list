import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Todo from './Todo'

const LOCAL_STORAGE_KEY = "todos"

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.todoNameInputRef = React.createRef();
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(todos) {
            this.setState(() => {
                return {todos}}
            )
        }
    }

    componentDidUpdate() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.todos));
    }

    handleAddTodo = () => {
        if ( this.todoNameInputRef.current.value === '' ) return
        const newTodo = {
            id: uuidv4(),
            name: this.todoNameInputRef.current.value,
            finished: false
        }
        this.setState( state => {
            // const list = state.todos.concat(newTodo);
            const todos = [...state.todos, newTodo]
            return {todos}
        })
        this.todoNameInputRef.current.value = ''
    }

    handleClearTodos = () => {
        this.setState( state => {
            const todos = state.todos.filter(todo => !todo.finished)
            return {todos}
        })
        this.todoNameInputRef.current.value = ''
    }

    handleDeleteTodos = () => {
        this.setState( () => {
            const todos = []
            return {todos}
        })
        this.todoNameInputRef.current.value = ''
    }

    handleChangeStatus = (e) => {
        // console.log(e);
        this.setState( state => {
            const todos = state.todos.map( todo =>
            {
                if(todo.id === e.target.id) {
                    todo.finished = e.target.checked
                }
                return todo
            });
            return todos
        });
    }


    render() {
        return (
            <div>
                <h1 className="title">Your to-do list application!</h1>
                <div className="controls">
                    <input ref={this.todoNameInputRef} type="text" />
                    <button onClick={this.handleAddTodo}>Add todo</button>
                    <button onClick={this.handleClearTodos}>Clear done todos</button>
                    <button onClick={this.handleDeleteTodos}>Delete all todos</button>
                </div>
                <div className="todosList">
                    {this.state.todos.map( todo => (
                        <Todo key={todo.id} todo={todo} changeStatus={this.handleChangeStatus}/>
                    ))}
                </div>
            </div>
        )
    }
}
