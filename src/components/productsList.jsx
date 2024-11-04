import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from '@mui/icons-material/Search';
import FavoriteBorder  from '@mui/icons-material/FavoriteBorder';
import { Link, useLocation } from 'react-router-dom';

const Info = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top : 0;
  left : 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items : center;
  cursor: pointer;
  `; 

const Container = styled.div`
  flex: 1;
  border-radius: 7px;
  margin : 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
  opacity: 1;

  }
  `;
  
  const Circle= styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  `;

  const Image = styled.img`
  height: 100%;
  z-index : 2; 
  width: 99%;
  object-fit: cover;
`;

  const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover{
  background-color: #e9f5f5;
  transform: scale(1.1);
  }
`; 



const productsList = ({item}) => {



  

  return (
    <Container>
        <Circle>
        <Image src={item.img}/>
        <Info>
            <Icon>
                <ShoppingCartIcon />
            </Icon>
            <Icon>
              <Link to={`/product/${item._id}`}>
                <Search />
              </Link>
            </Icon>
            <Icon>
                <FavoriteBorder />
            </Icon>
        </Info>

        </Circle>
    </Container>
  )
}

export default productsList