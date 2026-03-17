import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import { useNavigate } from 'react-router-dom'

const Container = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 28px;
  padding: clamp(24px, 5vw, 42px);
  margin: 40px clamp(18px, 4vw, 32px) 30px;
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
`;

const Logo = styled.h1`
  margin: 0 0 12px;
`;

const Desc = styled.p`
  margin: 0 0 16px;
  color: var(--muted);
`;

const SocialContainter = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  background: rgba(255, 255, 255, 0.03);
  transition: all 150ms ease;

  &:hover {
    color: var(--accent);
    border-color: rgba(0, 230, 184, 0.4);
  }
`;

const Title = styled.h2`
  margin: 0 0 16px;
  font-size: 18px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
`;

const ListItem = styled.li`
  cursor: pointer;
  color: var(--muted);
  transition: color 120ms ease;

  &:hover {
    color: var(--accent);
  }
`;

const Contact = styled.p`
  margin: 0 0 8px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FooterNote = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 8px;
  color: var(--muted);
  font-size: 13px;
`;

const Footer = () => {
  const navigate = useNavigate()

  return (
    <Container className="glass">
      <div>
        <Logo>THIEF'S</Logo>
        <Desc>Independent label curating elevated everyday pieces.</Desc>
        <SocialContainter>
          <SocialIcon href='https://www.instagram.com/maniesh_69x/' target='_blank' rel='noreferrer'>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon href='https://www.instagram.com/maniesh_69x/' target='_blank' rel='noreferrer'>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon href='https://twitter.com' target='_blank' rel='noreferrer'>
            <TwitterIcon />
          </SocialIcon>
        </SocialContainter>
      </div>

      <div>
        <Title>User Links</Title>
        <List>
          <ListItem onClick={() => navigate('/home')}>Home</ListItem>
          <ListItem onClick={() => navigate('/cart')}>Cart</ListItem>
          <ListItem onClick={() => navigate('/products')}>Menswear</ListItem>
          <ListItem onClick={() => navigate('/products')}>Womenswear</ListItem>
          <ListItem onClick={() => navigate('/products')}>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </div>

      <div>
        <Title>Contact</Title>
        <Contact>
          <LocationOnIcon />221B Baker Street
        </Contact>
        <Contact>
          <LocalPhoneIcon />666999
        </Contact>
        <Contact>
          <EmailIcon />kaj882626@gmail.com
        </Contact>
      </div>

      <FooterNote>Made with care — THIEF'S 2026</FooterNote>
    </Container>
  )
}

export default Footer
