import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Col, Input, Checkbox, Icon, Radio } from 'antd'

import styles from './index.less'

class Todos extends Component {
  static propTypes = {
    todolist: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      todoTitle: '',
      edit: false
    }
  }

  handlerTodoTitle = (e) => {
    this.setState({
      todoTitle: e.target.value
    })
  }

  handlerKeydown = (e) => {
    const title = e.target.value.trim()
    const { dispatch } = this.props
    if (title === '') {
      return
    }
    if(e.keyCode === 13) {
      dispatch({
        type: 'todolist/addTodoItem',
        payload: {
          complete: false,
          title: title
        }
      })
      this.setState({
        todoTitle: ''
      })
    }
  }

  handlerDeleteTodos = (index) => {
    const { dispatch } = this.props
    dispatch({
      type: 'todolist/deleteTodoItem',
      payload: index
    })
  }

  changeTodoItemStatus = (index) => {
    const { dispatch } = this.props
    dispatch({
      type: 'todolist/changeTodoItemStatus',
      payload: index
    })
  }

  changeAllTodosStatus = (e) => {
    const { dispatch } = this.props
    dispatch({
      type: 'todolist/changeTodosStatus',
      payload: e.target.checked
    })
  }

  selectTodos = (status) => {
    const { dispatch } = this.props
    dispatch({
      type: 'todolist/changeValue',
      payload: status
    })
  }

  clearCompletedIteam = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'todolist/clearCompletedIteam'
    })
  }

  render() {
    const { todos, status } = this.props
    // console.log(todos)
    const todoList = {
      ALL: todos,
      ACTIVE: todos.filter((item) => item.complete === false),
      COMPLETED: todos.filter((item) => item.complete === true)
    }
    return (
      <div className={styles.todos}>
        <h1>TODOS</h1>
        <div className={styles.todoContent}>
          {/* TODO INPUT */}
          <Col span={24} className={styles.formItem}>
            <Checkbox checked={todoList['ACTIVE'].length === 0 ? true : false} className={styles.checkBtn} onChange={e => this.changeAllTodosStatus(e)} />
            <Input placeholder="What needs to be done?" 
              maxLength={20}
              value={this.state.todoTitle}
              onChange={this.handlerTodoTitle} 
              onKeyDown={this.handlerKeydown} />
          </Col>
          {/* TODO LIST */}
          <Col span={24}>
            <ul className={styles.item}>
              {todoList[status].map((item, index) => {
                return (
                  <li key={index} className={ !item.complete ? null : styles.completed }>
                    <Checkbox checked={item.complete} className={styles.checkBtn} onChange={e => this.changeTodoItemStatus(index, e)} />
                    {item.title}
                    <a className={styles.deleteBtn} 
                      onClick={() => this.handlerDeleteTodos(index)}>
                        <Icon type="close" />
                    </a>
                  </li>
                )                
              })}
            </ul>
          </Col>
          {/* TODO TOOLS */}
          <Col span={24} className={styles.tools}>
            <p>{todoList['ACTIVE'].length} item left</p>
            <Radio.Group value={status} onChange={e => this.selectTodos(e.target.value)}>
              <Radio.Button className={styles.radioButton} value="ALL">
                All
              </Radio.Button>
              <Radio.Button className={styles.radioButton} value="ACTIVE">
                Active
              </Radio.Button>
              <Radio.Button className={styles.radioButton} value="COMPLETED">
                Completed
              </Radio.Button>
            </Radio.Group>
            {todoList['COMPLETED'].length? <a onClick={this.clearCompletedIteam}>Clear completed</a> : null}
          </Col>
        </div>
      </div>
    )
  }
}

export default connect(({todolist}) => {
  return todolist
})(Todos)
