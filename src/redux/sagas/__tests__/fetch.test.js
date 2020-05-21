import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRequested, fetchSuccessItems, fetchErrorItems } from '../../actions'
import fetchDataFromUrl, { fetchData } from '../fetch'

import * as GenericFetch from '../fetchGeneric'

import { runSaga } from 'redux-saga'

import itemList from '../../../fixtures/itemList'

beforeEach(() => {
  jest.clearAllMocks()
})

const fetchCallFixture = { url: 'https://api.punkapi.com/v2/beers' }

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

  //reference from https://redux-saga.js.org/docs/advanced/Testing.html

  describe('fetchData function', () => {
    test('fetchData returns fetchSuccess', async () => {
      const mockFetchPromise = Promise.resolve({
        itemList
      })
      const fetchGenericMock = jest.spyOn(GenericFetch, 'fetchGeneric').mockImplementation(() => mockFetchPromise)

      const dispatched = []

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        fetchData,
        fetchCallFixture
      ).toPromise()

      expect(fetchGenericMock).toHaveBeenCalledTimes(1)
      expect(dispatched[0]).toEqual({
        type: fetchSuccessItems,
        data: { itemList }
      })
    })

    test('fetchData returns fetchErrorItems', async () => {
      const mockFetchPromise = Promise.resolve({
        error: 'dummy error'
      })
      const fetchGenericMock = jest.spyOn(GenericFetch, 'fetchGeneric').mockImplementation(() => mockFetchPromise)

      const dispatched = []

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        fetchData,
        fetchCallFixture
      ).toPromise()

      expect(fetchGenericMock).toHaveBeenCalledTimes(1)
      expect(dispatched[0]).toEqual({
        type: fetchErrorItems
      })
    })
  })
})
