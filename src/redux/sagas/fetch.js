import { call, put, takeEvery } from "redux-saga/effects";
import { fetchRequested } from "../actions";

const fetchGeneric = function(url) {
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw response.error;
      }
      return response;
    })
    .catch(error => {
      return response;
    });
};

export function* fetchData({ url, fetchSucceeded, fetchPending, fetchFailed }) {
  try {
    yield put({ type: fetchPending });
    const data = yield call(fetchGeneric, url);
    yield put({ type: fetchSucceeded, data });
  } catch (error) {
    yield put({ type: fetchFailed });
  }
}

export default function* fetchFromUrl() {
  yield takeEvery(fetchRequested, fetchData);
}
