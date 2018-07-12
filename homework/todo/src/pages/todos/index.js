import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Row, Button, Col, Icon, Input, Card, Radio } from 'antd'
import classnames from 'classnames'
import styles from './index.less'

const Login = ({
  login,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  },
  dispatch,
}) => {
  const {list, value, btns } = login
  const  updateList =  result => {
    dispatch({
      type: 'login/updateState',
      payload: {
        list: result,
      },
    })
  }
  const todos = {
    ALL: list,
    ACTIVE: list.filter((item) => item.complete === false),
    COMPLETED: list.filter((item) => item.complete === true),
  }
  let result
  // 增加列表
  const handleAddList = () => {
    let field = getFieldsValue()
    field['complete'] = false
    field['edit'] = false
    dispatch({
      type: 'login/addList',
      payload: field,
    })
    resetFields()
  }
  const handleDeleteList = (index) => {
    dispatch({
      type: 'login/deleteList',
      payload: index,
    })
  }
  const handleComplete = (index, type) => {
    dispatch({
      type: 'login/updateComplete',
      payload: {
        id: index,
        type: type,
      },
    })
  }
  const radioOnChange = (value) => {
    dispatch({
      type: 'login/updateState',
      payload: {
        value: value,
      },
    })
  }
  const handleClear = () => {
    dispatch({
      type: 'login/updateState',
      payload: { 
        list: todos.ACTIVE,
      },
    })
  }
  const handleUpdate = id => {
    result = list.map((item, index) =>{
      if(index === id) {
        item.edit = true
      } else {
        item.edit = false
      }
      return item
    })
    updateList(result)
  }
  const handleEdit = id => {
    result = list.map((item, index) =>{
      if(index === id) {
        item.edit = false
        item.title = getFieldsValue().theme
      }
      return item
    })
    updateList(result)
  }
  const handleSelectAll = () => {
    if (todos['ACTIVE'].length) {
      result = list.map(item => {
        item.complete = true
        return item
      })
    } else {
      result = list.map(item => {
        item.complete = false
        return item
      })
    }
    updateList(result)
  }
  return (
    <div className={styles.form}>
      <Row>
        <Col>
          {getFieldDecorator('title')( 
          <Input
            placeholder="What needs to be done?"
            prefix={<Icon type="down" className={classnames(styles.icon,{[styles.gray]: todos['ACTIVE'] ? (todos['ACTIVE'].length === 0 ? false : true) : false })} onClick={handleSelectAll}/>}
            onPressEnter={handleAddList}
          />)}
          <Card>
            {todos[value].map((item,index) => {
              return <p key={index} onDoubleClick={handleUpdate.bind(this, index)}>
              {item.edit ? getFieldDecorator('theme',{ initialValue: item.title })(<Input onPressEnter={handleEdit.bind(this, index)} className={styles.edit}/>) : 
              <span>
              <span className={classnames(styles.circle,{[styles.hidden]: !item.complete})} onClick={handleComplete.bind(this, index, 'on')}></span>
              <Icon type="check-circle-o" className={classnames(styles.green,{[styles.hidden]: item.complete})} onClick={handleComplete.bind(this, index, 'off')} />
              <span className={classnames(styles.content,{[styles.gray]: item.complete })}>{item.title}
              <span className={classnames(styles.completed,{[styles.line]: item.complete})}></span>
              </span>
              <Icon type="close" className={classnames(styles.red,styles.dis)} onClick={handleDeleteList.bind(this, index)} />
              </span>}
              </p>
            })}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className={styles.padding}>
          <span>{todos['ACTIVE']? todos['ACTIVE'].length : 0 } item left</span>
          <Radio.Group value={value} onChange={e => radioOnChange(e.target.value)}>
            {btns && btns.map((item, index) => {
              return <Radio.Button key={index} className={styles.all} value={item.value}>{item.name}</Radio.Button>
            })}
          </Radio.Group>
          {todos['COMPLETED'].length ? <Button className={classnames(styles.clear)} onClick={handleClear}>Clear completed</Button> : null}
        </Col>
      </Row>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login))
