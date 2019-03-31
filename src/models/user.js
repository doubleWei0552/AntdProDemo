import { query as queryUsers, queryCurrent, updataCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({payload, callback}, { call, put }) {
      const response = yield call(queryCurrent);
      if(payload) {
        response.data.avatar= payload.url;
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      callback && callback(response);
    },
    *updataCurrent({payload, callback}, { call, put }) {
      const response = yield call(updataCurrent, payload);
      callback && callback(response);
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
