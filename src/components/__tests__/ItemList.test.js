import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import ItemList from '../ItemList'
import fixtureItemList from '../../fixtures/itemList'

describe('ItemList Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<ItemList items={fixtureItemList} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Should show each item correcty - array with 3 values', () => {
    const { getByText } = render(<ItemList items={fixtureItemList} />)
    expect(getByText(fixtureItemList[0].name)).toBeInTheDocument()
    expect(getByText(fixtureItemList[1].name)).toBeInTheDocument()
    expect(getByText(fixtureItemList[2].name)).toBeInTheDocument()
  })

  test('Should use props correcty - empty array', () => {
    const { getByText } = render(<ItemList items={[]} />)
    expect(getByText('no beers for you :(')).toBeInTheDocument()
  })
})
