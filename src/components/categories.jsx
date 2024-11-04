
import React from 'react'
import Categoryitem from './CategoryItem'
import {Category} from '../data'
import styled from 'styled-components'


const Container = styled.div`
    display:flex
`;

const categories = () => {
  return (
    <Container>{
        Category.map(item=>(
           <Categoryitem key={item.id} item={item} />
        ))
    }
    </Container>
    
  )
}

export default categories