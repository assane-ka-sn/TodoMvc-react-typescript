import * as React from 'react'
import TodoStore from './TodoStore'
import TodoItem from './TodoItem'
import {Todo} from "./Interfaces";

type FilterOptions = 'all' | 'completed' | 'active'

interface TodoListProps { }

interface TodoListState {
    todos: Todo[],
    newTodo: string,
    filter: FilterOptions
}

export default class TodoList extends React.Component<TodoListProps, TodoListState> {
    private store: TodoStore = new TodoStore()
    private toggleTodo: (todo: Todo) => void
    private destroyTodo: (todo: Todo) => void
    private updateTitle: (todo: Todo, title: string) => void
    private clearCompleted: () => void

    constructor (props: TodoListProps) {
        super(props)
        this.store.addTodo('Salut')
        this.store.addTodo('les gens')
        this.state = {
            todos: this.store.todos,
            newTodo: '',
            filter: 'all'
        }

        // On injecte les méthodes du store en méthode du composant
        this.toggleTodo = this.store.toggleTodo.bind(this.store)
        this.destroyTodo = this.store.removeTodo.bind(this.store)
        this.updateTitle = this.store.updateTitle.bind(this.store)
        this.clearCompleted = this.store.clearCompleted.bind(this.store)
    }


    render () {
        let { todos } = this.state
        return (<section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                     />
            </header>
            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {
                        todos.map(todo => {
                            return <TodoItem todo={todo} key={todo.id} />
                        })
                    }
                </ul>
            </section>
            <footer className="footer">
                <span className="todo-count"><strong>k</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a href="#/" className="selected">All</a>
                    </li>
                    <li>
                        <a href="#/active" className="selected">Active</a>
                    </li>
                    <li>
                        <a href="#/completed" className="selected">Completed</a>
                    </li>
                </ul>
                <button className="clear-completed">Clear completed</button>
            </footer>
        </section>)
    }

}