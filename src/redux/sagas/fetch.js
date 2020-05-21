import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRequested, fetchSuccessItems, fetchErrorItems } from '../actions'

import { fetchGeneric } from './fetchGeneric'

export default function* fetchDataFromUrl() {
  yield takeEvery(fetchRequested, fetchData)
}

export function* fetchData({ url }) {
  const data = yield call(fetchGeneric, url)
  if (data.error) {
    yield put({ type: fetchErrorItems })
  } else {
    yield put({ type: fetchSuccessItems, data })
  }
}
