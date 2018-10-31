import * as React from 'react'
import { Todo} from "./Interfaces";
import * as cx from 'classnames'

export interface Props{
    todo: Todo
    onToggle: (todo: Todo) => void
    onDestroy: (todo: Todo) => void
    onUpdate: (todo: Todo, title: string) => void
}

export interface State{
    editing: boolean
    title: string
}

export default class TodoItem extends React.PureComponent<Props, State> {

    constructor(props: Props){
        super(props)
        this.state = {
            editing: false,
            title: ''
        }

        //this.handleSubmit = this.handleKeyDown.bind(this)
        //this.handleKeyDown = this.handleKeyDown.bind(this)
        //this.handleInput = this.handleInput.bind(this)
    }
    render () {
        console.log("item render")
        let {todo} = this.props
        let {editing, title} = this.state
         return (<li className={cx({ completed: todo.completed, editing })}>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={this.toggle} checked={todo.completed} />
                <label onDoubleClick={this.startEditing}>{todo.title}</label>
                <button className="destroy" onClick={this.destroy}></button>
            </div>
             <input
                 className="edit"
                 type="text"
                 value={title}
                onBlur={this.handleSubmit}
                onKeyDown={this.handleKeyDown}
                onInput={this.handleInput}
             />
        </li>)
    }

    toggle = () => {
        this.props.onToggle(this.props.todo)
    }

    destroy = () => {
        this.props.onDestroy(this.props.todo)
    }

    startEditing = (e: any) => {
        this.setState({editing: true, title: this.props.todo.title})
    }

    handleSubmit = () => {
        this.props.onUpdate(this.props.todo, this.state.title)
        this.setState({editing: false})
    }

    handleKeyDown = (e: any) => {
        if(e.key == "Escape"){
            this.setState({editing: false})
        }else if(e.key === 'Enter'){
            this.handleSubmit()
        }
    }

    handleInput  = (e: any) => {
        this.setState({title: e.target.value})
    }
}
