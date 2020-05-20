import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRequested, fetchSuccessItems, fetchErrorItems } from '../actions'

export default function* fetchDataFromUrl() {
  yield takeEvery(fetchRequested, fetchData)
}

const fetchGeneric = function (url) {
  return fetch(url)
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        throw response.error
      }
      return response
    })
    .catch((error) => {
      console.error('error on url', error)
      return { error: true }
    })
}

export function* fetchData({ url }) {
  const data = yield call(fetchGeneric, url)
  if (data.error) {
    yield put({ type: fetchErrorItems })
  } else {
    yield put({ type: fetchSuccessItems, data })
  }
}
