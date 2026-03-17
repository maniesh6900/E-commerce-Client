import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Search from '@mui/icons-material/Search'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { Link } from 'react-router-dom'

const Card = styled.div`
  position: relative;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(37, 99, 235, 0.28);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.14);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  height: 240px;
  background: color-mix(in srgb, var(--panel) 85%, rgba(37, 99, 235, 0.05) 15%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 200px;
  width: 100%;
  object-fit: contain;
`;

const Body = styled.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: var(--accent);
`;

const Chip = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 12px;
`;

const Actions = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
    color: var(--accent);
    border-color: rgba(37, 99, 235, 0.4);
  }
`;

const ProductCard = ({ item }) => {
  const priceValue = Number(item.price)
  const displayPrice = Number.isFinite(priceValue) ? `$ ${priceValue.toFixed(2)}` : 'New in'
  const category = item.categories?.[0] || item.color?.[0] || 'Essentials'

  return (
    <Card className='glass'>
      <Actions>
        <IconButton>
          <ShoppingCartIcon fontSize='small' />
        </IconButton>
        <Link to={`/product/${item._id}`}>
          <IconButton>
            <Search fontSize='small' />
          </IconButton>
        </Link>
        <IconButton>
          <FavoriteBorder fontSize='small' />
        </IconButton>
      </Actions>

      <Link to={`/product/${item._id}`}>
        <ImageWrap>
          <Image src={item.img} alt={item.title || 'Product'} />
        </ImageWrap>
        <Body>
          <Title>{item.title || 'Featured piece'}</Title>
          <MetaRow>
            <Price>{displayPrice}</Price>
            <Chip>{category}</Chip>
          </MetaRow>
        </Body>
      </Link>
    </Card>
  )
}

export default ProductCard
