import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

import 'jest-styled-components'

import Select from '../Select'
import { MonthList, DEFAULT_VALUE } from '../../utils'

const dummyProps = {
  onSelect: jest.fn(),
  values: MonthList,
  current: DEFAULT_VALUE
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Select Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<Select {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('Select Structure', () => {
    test('Should have a default value - empty', () => {
      const SelectComponent = render(<Select {...dummyProps} />)
      expect(SelectComponent.getByText('Empty')).toBeInTheDocument()
    })
  })
  describe('Select Functionallity', () => {
    test('Should call onSelect on change value', () => {
      const SelectComponent = render(<Select {...dummyProps} />)
      // expect(SelectComponent.getByText('Empty')).toBeInTheDocument()
      fireEvent.change(SelectComponent.getByTestId('select'), {
        target: { value: dummyProps.values[4].value }
      })

      expect(dummyProps.onSelect).toHaveBeenCalledTimes(1)
      expect(dummyProps.onSelect).toHaveBeenCalledWith(dummyProps.values[4].value)
    })

    test("Shouldn't call onSelect on select same value", () => {
      const SelectComponent = render(<Select {...dummyProps} current={dummyProps.values[2].value} />)
      expect(dummyProps.onSelect).toHaveBeenCalledTimes(0)

      fireEvent.change(SelectComponent.getByTestId('select'), {
        target: { value: dummyProps.values[2].value }
      })

      expect(dummyProps.onSelect).toHaveBeenCalledTimes(0)
    })
  })
})
