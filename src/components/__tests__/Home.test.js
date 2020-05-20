import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { initialState as initialStateFilters } from '../../redux/reducers/filters'
import { initialState as initialStateItems } from '../../redux/reducers/items'
import reducer from '../../redux/reducers'

import itemListFixture from '../../fixtures/itemList'

import Home from '../Home'

beforeEach(() => {
  jest.clearAllMocks()
})

const initialReducerState = {
  filtersReducer: initialStateFilters,
  itemsReducer: initialStateItems
}

function render(ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('Home Component Suite', () => {
  test('Snapshot check', () => {
    expect(render(<Home />, { initialReducerState }).baseElement).toMatchSnapshot()
  })

  describe('Home Structure', () => {
    test('Should have Filters, ItemList and Pagination - with items to list', () => {
      const store = createStore(() => ({
        filtersReducer: initialStateFilters,
        itemsReducer: {
          error: null,
          items: itemListFixture
        }
      }))
      const { container } = render(<Home />, { store })
      expect(container.getElementsByClassName('Filters').length).toBe(1)
      expect(container.getElementsByClassName('ItemList').length).toBe(1)
      expect(container.getElementsByClassName('Pagination').length).toBe(1)
      expect(container.getElementsByClassName('NoResults').length).toBe(0)
    })
    test('Should have Filters, NoResults and Pagination - without items to list', () => {
      const { container } = render(<Home />)
      expect(container.getElementsByClassName('Filters').length).toBe(1)
      expect(container.getElementsByClassName('NoResults').length).toBe(1)
      expect(container.getElementsByClassName('ItemList').length).toBe(0)
      expect(container.getElementsByClassName('Pagination').length).toBe(0)
    })
  })
})
