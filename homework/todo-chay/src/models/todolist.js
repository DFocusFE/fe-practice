export default {
  namespace: 'todolist',
  state: {
    todos: [],
    status: 'ALL'
  },
  subscriptions: {
    setup({ dispatch }) {
      const data = localStorage.getItem('todos')
      const todolists = JSON.parse(data)
      if(data) {
        dispatch({
          type: 'querySuccess',
          payload: todolists
        })
      }
    }
  },
  effects: {
    *deleteTodoItem({payload}, {put, call}) {
      yield put({type: 'delete', payload})
    },
    *addTodoItem({ payload }, { put, call }) {
      yield put({type: 'addItem', payload})
    },
    *changeTodoItemStatus({payload}, {put, call}) {
      yield put({type: 'changeStatus', payload})
    },
    *changeValue({payload}, {put, call}) {
      yield put({type: 'changeDefaultValue', payload})
    },
    *clearCompletedIteam({payload}, {put, call}) {
      yield put({type: 'clearIteam'})
    },
    *changeTodosStatus({payload}, {put, call}) {
      yield put({type: 'changeAllStatus', payload})
    }
  },
  reducers: {
    querySuccess(state, {payload}) {
      return { ...state, todos: payload};
    },
    delete(state, {payload}) {
      const todos = state.todos.filter((item, index) => index !== payload);
      localStorage.setItem('todos', JSON.stringify(todos))
      return {...state, todos: todos}
    },
    addItem(state, {payload}) {
      localStorage.setItem('todos', JSON.stringify([...state.todos, payload]))
      return {...state, todos:[ ...state.todos, payload]}
    },
    changeStatus(state, {payload}) {
      const todos = state.todos.map((item, index) => {
        if (index === payload) {
          item.complete = !item.complete
        }
        return {...item}
      });
      localStorage.setItem('todos', JSON.stringify(todos))
      return {...state, todos: todos}
    },
    changeDefaultValue(state, {payload}) {
      return {...state, status: payload}
    },
    clearIteam(state, {payload}) {
      const todos = state.todos.filter((item, index) => item.complete === false);
      localStorage.setItem('todos', JSON.stringify(todos))
      return {...state, todos: todos}
    },
    changeAllStatus(state, {payload}) {
      const todos = state.todos.map((item) => {
        item.complete = payload
        return {...item}
      });
      localStorage.setItem('todos', JSON.stringify(todos))
      return {...state, todos: todos}
    }
  }
}
