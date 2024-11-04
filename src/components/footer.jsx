import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 300px;
  `;

const Left = styled.div`
  flex:1;
  margin-left: 20px;
`;

const  Logo= styled.h1`

`;
const  Desc = styled.p`

`;

const SocialContainter = styled.div`
  display: flex;
`;

const  SocialIcon = styled.div`
  margin-right: 20px;
  font-size: 50px;
  cursor: pointer;
`;

const Center = styled.div`
  flex:1;
 padding: 20px;

`;


const Title = styled.h2`                                                     
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding:  0;
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

`;

const ListItem = styled.li`
  width: 50%;
  margin: 3px;
  cursor: pointer;
  &:hover{
  text-decoration: underline;
  }
`;

const Right = styled.div`
 flex:1;
`;

const Contact = styled.p``;

const Footer = () => {

  const navigate = useNavigate();

  return (
    <Container>
        <Left>
          <Logo>THIEF'S</Logo>
          <Desc>The Store. </Desc>
          <SocialContainter>
          <SocialIcon>
            <FacebookIcon  href='https://www.instagram.com/maniesh_69x/' style={{backgroundColor: "white", color:"blue"}}/> 
          </SocialIcon>
          <SocialIcon>
            <InstagramIcon style={{backgroundColor: "white", color:"red"}} /> 
          </SocialIcon>
          <SocialIcon>
            <TwitterIcon style={{color: "cyan"}} /> 
          </SocialIcon>
          </SocialContainter>
        </Left>

        <Center>
          <Title>User Links</Title>
         <List>
          <ListItem onClick={()=> navigate('../home')} >Home</ListItem>
          <ListItem onClick={()=> navigate('../cart')} >Cart</ListItem>
          <ListItem onClick={()=>navigate('../products')}>Man Fashion</ListItem>
          <ListItem onClick={()=>navigate('../products')} >Woman Fashion</ListItem>
          <ListItem onClick={()=>navigate('../products')} >Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <Contact> 
            <LocationOnIcon style={{marginRight: "20px"}} />221B Baker Street     
          </Contact> 
          <Contact> 
            <LocalPhoneIcon style={{marginRight: "20px"}} />666999 
          </Contact> 
          <Contact> 
            <EmailIcon style={{marginRight: "20px"}} /> kaj882626@gmail.com
          </Contact> 
        </Right>
    </Container>
  )
}

export default Footer