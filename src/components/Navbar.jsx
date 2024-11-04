import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge, MenuItem } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const Container = styled.div`
    height: 60px;
    padding-bottom: 10px;
    
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items :center;
    justify-content: space-around;
`;
const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display:flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
    border: none;
`;

const Center = styled.div`
    flex:1;
    text-align: center;
`;
const Logo = styled.h1`
   font-weight: bold; 
`;
const Right = styled.div`
    flex: 1;
    display:flex;
    align_items: center;
    justify-content: flex-end;
`;




const Navbar = () => {

    const navigate = useNavigate();
    const quantity = useSelector(state=>state.cart.quantity)


    

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input/>
                    <SearchIcon style={{fontSize: 16, color:'gray'}} />
                </SearchContainer>
            </Left>
            <Center>
                <Logo>THIEF'S</Logo>
            </Center>
            <Right>
                <MenuItem>MENU</MenuItem>
                <MenuItem onClick={() => navigate('../login')}>LOG-IN</MenuItem>
                <MenuItem onClick={() => navigate('../register')} >SIGN-UP</MenuItem>
                <MenuItem>
                    <Badge onClick={()=>navigate('../cart')} badgeContent={quantity} color='primary'>
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar