import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRequested, fetchSuccessItems, fetchErrorItems } from '../../actions'
import fetchDataFromUrl, { fetchGeneric, fetchData } from '../fetch'

describe('fetch Test Suite', () => {
  describe('fetchDataFromUrl function', () => {
    const fetchDataFromUrlTest = fetchDataFromUrl()
    test('should call fetchData and finish', () => {
      //first
      expect(fetchDataFromUrlTest.next().value).toEqual(takeEvery(fetchRequested, fetchData))
      //second
      expect(fetchDataFromUrlTest.next().value).toEqual(undefined)
      expect(fetchDataFromUrlTest.next().done).toEqual(true)
    })
  })

  describe('fetchGeneric function', () => {})

  xdescribe('fetchData function', () => {})
})
