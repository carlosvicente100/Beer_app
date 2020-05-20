import { all } from 'redux-saga/effects'
import fetchDataFromUrl from './fetch'

export default function* rootSaga() {
  yield all([fetchDataFromUrl()])
}
