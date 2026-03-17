import React, { useContext } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { Badge } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ThemeContext } from '../App'

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  background: var(--panel);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
`;

const Wrapper = styled.div`
  padding: 12px clamp(18px, 4vw, 36px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 20px;
  letter-spacing: 0.12em;
  font-weight: 700;
  cursor: pointer;
  color: var(--text);
`;

const Tag = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 12px;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 520px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--panel);
  border: 1px solid var(--border);
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  justify-content: flex-end;
`;

const GhostButton = styled.button`
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 140ms ease;

  &:hover {
    border-color: rgba(37, 99, 235, 0.4);
    color: var(--accent);
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(GhostButton)`
  background: linear-gradient(130deg, var(--accent), var(--accent-2));
  color: white;
  border-color: transparent;
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.18);
`;

const CartButton = styled(GhostButton)`
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModeButton = styled(GhostButton)`
  padding: 9px 10px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  const navigate = useNavigate()
  const quantity = useSelector((state) => state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const firstName = user?.username?.split(' ')[0] || 'there'

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => navigate('/')}>THIEF'S</Logo>
          <Tag>New-season edit</Tag>
        </Left>

        <SearchContainer>
          <SearchIcon style={{ fontSize: 18, color: 'var(--muted)' }} />
          <Input placeholder='Search by name or category' />
        </SearchContainer>

        <Right>
          <ModeButton onClick={toggleTheme} aria-label='Toggle theme'>
            {theme === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </ModeButton>
          <GhostButton onClick={() => navigate('/products')}>Shop</GhostButton>
          {user ? (
            <>
              <GhostButton onClick={() => navigate('/orders')}>Orders</GhostButton>
              <GhostButton onClick={() => navigate('/cart')}>Hi, {firstName}</GhostButton>
            </>
          ) : (
            <PrimaryButton onClick={() => navigate('/login')}>Log in / Sign up</PrimaryButton>
          )}
          <CartButton onClick={() => navigate('/cart')}>
            <Badge badgeContent={quantity} color='primary'>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </CartButton>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
