
import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Container = styled.div`
  flex: 1;
  margin : 5px;
  height: 50vh;
  position: relative;
 
`;
const Image = styled.img`
  width :100%;
  heigth: 100%;
  border-radius: 7px;
  object-fit: cover;
`;
const Info = styled.div`
  position : absolute;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
const Title = styled.h1`
  color: white;
  margin-Button: 20px;
`;
const Button = styled.button`
  background-color: white;
  padding: 10px;
  border:none;
  color: gray;
  cusor: pointer;
`;


const CategoryItem = ({item}) => {
  return (
    <Container> 
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Info>
        <Title>{item.title}</Title>
        <Button>Shop now</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem