import React from 'react'
import Categoryitem from './CategoryItem'
import { Category } from '../data'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  padding: 10px clamp(18px, 4vw, 30px);
`;

const Categories = () => {
  return (
    <Container>
      {Category.map((item) => (
        <Categoryitem key={item.id} item={item} />
      ))}
    </Container>
  )
}

export default Categories
