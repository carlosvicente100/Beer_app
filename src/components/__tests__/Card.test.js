import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Card from '../Card'

const dummyProps = {
  name: 'dummy Name',
  description: 'dummy description extra large for test shorter function if is required',
  image_url: 'http://placekitten.com/200/300',
  tagline: 'dummy tagline',
  first_brewed: '05/2020'
}

describe('Card Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<Card {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Should use props correcty', () => {
    const { getByText } = render(<Card {...dummyProps} />)
    expect(getByText(dummyProps.name)).toBeInTheDocument()
    expect(getByText(`${dummyProps.tagline} (${dummyProps.first_brewed})`)).toBeInTheDocument()
    expect(getByText(`${dummyProps.tagline} (${dummyProps.first_brewed})`)).toBeInTheDocument()
    expect(getByText(dummyProps.description)).toBeInTheDocument()
  })

  describe('Card Component Internal Functions', () => {
    test('checkLength Function', () => {
      const longDescription =
        "dummy description extra large for test shorter function if is required , for that reason, I'm extending this value with random content"
      const { getByText } = render(<Card {...dummyProps} description={longDescription} />)
      expect(getByText(/I'm extending this value with .../)).toBeInTheDocument()
    })
  })
})
