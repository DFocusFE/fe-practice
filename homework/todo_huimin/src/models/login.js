import { btns } from '../utils/enums'

export default {
  namespace: 'login',

  state: {
    list:[],
    btns: btns,
    value: 'ALL',
  },
  effects: {
    * addList ( { payload }, { select, put }) {
        const { list } = yield select(_ => _.login)
        list.push(payload)
        yield put({
          type: 'updateState',
          payload:{
            list: list,
          },
        })
    },
    * deleteList ({ payload }, { select, put }) {
        const { list } = yield select(_ => _.login)
        let result = list.filter((item, index ) => {
          return index !== payload
        })
        yield put({
          type: 'updateState',
          payload:{
            list: result,
          },
        })
    },
    * updateComplete ({ payload }, { select, put }){
        const { list } = yield select(_ => _.login)
        const { id, type } = payload
        let result = list.map((item, index) =>{
          if(index === id) {
            if (type === 'on'){
              item.complete = true
            } else {
              item.complete = false
            }
          }
          return item
        })
        yield put({
          type: 'updateState',
          payload:{
            list: result,
          },
        })
    },
    * btnChange ({ payload }, { put }) {
        yield put({
          type: 'updateState',
          payload: {
            highlightId: payload,
          },
        })
    },
  },
  reducers: {
    // 更新状态
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

}
