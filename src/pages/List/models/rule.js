import { queryRule, removeRule, addRule, updateRule, getArticleById, deleteArticleById } from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: {
          data: {
            list: response.data.list,
            pagination: response.data.pagination,
          },
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    }, 
    *getArticleById({ payload, callback }, { call, put }) {
      const response = yield call(getArticleById, payload);
      if(callback) {
        callback(response)
      }
    },
    *deleteArticleById({ payload, callback }, { call, put }) {
      const response = yield call(deleteArticleById, payload);
      if(callback) {
        callback(response)
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
