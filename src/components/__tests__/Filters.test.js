import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { initialState as initialStateFilters } from '../../redux/reducers/filters'
import { initialState as initialStateItems } from '../../redux/reducers/items'
import reducer from '../../redux/reducers'

import Filters from '../Filters'

beforeEach(() => {
  jest.clearAllMocks()
})

const dummyProps = {
  updateFilters: jest.fn()
}
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

describe('Filters Component Suite', () => {
  test('Snapshot check', () => {
    expect(render(<Filters {...dummyProps} />, { initialReducerState }).baseElement).toMatchSnapshot()
  })

  describe('Filters Structure', () => {
    test('Should have 4 inputs with their titles and two buttons ', () => {
      const { container, getByText } = render(<Filters {...dummyProps} />)

      expect(getByText('Start Month')).toBeInTheDocument()
      expect(getByText('End Month')).toBeInTheDocument()
      expect(getByText('Start year')).toBeInTheDocument()
      expect(getByText('End year')).toBeInTheDocument()

      expect(container.getElementsByClassName('Select').length).toBe(4)

      expect(getByText('Filter')).toBeInTheDocument()
      expect(getByText('Filter')).toHaveAttribute('disabled')
      expect(getByText('Reset All')).toBeInTheDocument()
      expect(getByText('Filter')).toHaveAttribute('disabled')
    })
  })

  describe('Filters Functionallity', () => {
    test('Should reset Filters on Reset Button click', () => {
      const store = createStore(() => ({
        filtersReducer: {
          startDate: {
            year: 2020,
            month: 5
          },
          endDate: {
            year: 2040,
            month: 12
          }
        },
        itemsReducer: initialStateItems
      }))
      const { container, getByText } = render(<Filters {...dummyProps} />, { store })
      expect(getByText('Filter')).not.toHaveAttribute('disabled')
      fireEvent.click(getByText('Reset All'))
      expect(getByText('Filter')).toHaveAttribute('disabled')
      expect(dummyProps.updateFilters).toHaveBeenCalledTimes(1)
    })

    test('Should set Filters on Filter Button click', () => {
      const store = createStore(() => ({
        filtersReducer: {
          startDate: {
            year: 2020,
            month: 5
          },
          endDate: {
            year: 2040,
            month: 12
          }
        },
        itemsReducer: initialStateItems
      }))
      const { container, getByText } = render(<Filters {...dummyProps} />, { store })
      expect(getByText('Filter')).not.toHaveAttribute('disabled')
      fireEvent.click(getByText('Filter'))
      expect(getByText('Filter')).not.toHaveAttribute('disabled')
      expect(dummyProps.updateFilters).toHaveBeenCalledTimes(1)
    })
  })
})
