import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CardContainer = styled.div`
  background-color: #706fd3;
  color: black;
  border-radius: 25px 0 25px 0;
  overflow: hidden;
  height: 200px;
  display: grid;
  grid-template-rows: 50px 20px auto;
  grid-template-columns: 125px auto auto;
  column-gap: 10px;
  grid-template-areas:
    'image title title'
    'image . .'
    'image description description';
  img {
    grid-area: image;
  }
  h1 {
    height: auto;
    grid-area: title;
    font-size: 16px;
    text-transform: uppercase;
  }
  p {
    grid-area: description;
    font-size: 14px;
  }
`

const CardImage = styled.img`
  margin-inline-start: 20px;
  height: 200px;
  width: auto;
`

const Card = ({ name, description, image_url, tagline, first_brewed }) => {
  const checkLength = (string, maxLenght = 120) => {
    if (string.length > maxLenght) {
      return string.slice(0, maxLenght) + '...'
    } else {
      return string
    }
  }
  return (
    <CardContainer>
      <CardImage src={image_url}></CardImage>
      <h1>{name}</h1>
      <span>{`${tagline}  (${first_brewed})`}</span>
      <p>{checkLength(description)}</p>
    </CardContainer>
  )
}
Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  first_brewed: PropTypes.string.isRequired
}

Card.defaultProps = {}

export default Card
