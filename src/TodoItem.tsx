import * as React from 'react'
import {Todo} from "./Interfaces";


 interface Props{
     todo: Todo
 }

 interface State{

 }

export default class TodoItem extends React.Component<Props, State> {

    render () {
        let {todo} = this.props
        return (<li className="completed">
            <div className="view">
                <input className="toggle" type="checkox"/>
                <label>{todo.title}</label>
                <button className="destroy"></button>
            </div>
        </li>)
    }

}