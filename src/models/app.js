import { queryRecomendDataApi, queryAppListDataApi } from '@/api'

export default {
  namespace: 'app',
  state: {
    page: 0,
    pageSize: 10,
    keywords: '',
    recomendData: [],
    appListData: []
  },
  effects: {
    *queryRecomendData({ payload }, { call, put, select }) {
      const { keywords } = yield select(_ => _.app)
      const res = yield queryRecomendDataApi({ keywords })
      if (res.code === 200) {
        yield put({
          type: 'SAVE_RECOMEND_DATA',
          payload: {
            recomendData: res.data
          }
        })
      }
    },
    *queryAppListData({ payload }, { call, put, select }) {
      if (payload && payload.type && payload.type === 'down') {
        yield put({
          type: 'CHANGE_PAGE',
          payload: {
            page: 1
          }
        })
      } else {
        yield put({
          type: 'PLUS_PAGE'
        })
      }
      const { page, pageSize, keywords } = yield select(_ => _.app)
      payload && payload.scrollListRef && payload.scrollListRef.reInit()
      const res = yield queryAppListDataApi({ page, pageSize, keywords })
      if (res.code === 200) {
        if (res.data && res.data.length > 0) {
          yield put({
            type: 'SAVE_APP_LIST_DATA',
            payload: {
              appListData: res.data,
              type: payload && payload.type && payload.type
            }
          })
          payload && payload.scrollListRef && payload.scrollListRef.finishLoad()
        } else {
          payload && payload.scrollListRef && payload.scrollListRef.loadedDone()
        }
      }
    }
  },
  reducers: {
    SAVE_RECOMEND_DATA(state, action) {
      return { ...state, ...action.payload }
    },
    SAVE_APP_LIST_DATA(state, action) {
      if (action.payload.type === 'down') {
        state.appListData = []
      }
      state.appListData.push.apply(state.appListData, action.payload.appListData)
      return { ...state }
    },
    PLUS_PAGE(state, action) {
      ++state.page
      return { ...state }
    },
    CHANGE_PAGE(state, action) {
      state.page = action.payload.page
      return { ...state }
    },
    CHANGE_KWORDS(state, action) {
      state.keywords = action.payload.keywords
      return { ...state }
    },
    CLEAR_DATA(state, action) {
      state.recomendData = []
      state.appListData = []
      return { ...state }
    }
  }
}
