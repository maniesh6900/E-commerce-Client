import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = styled.div`
  position: relative;
  min-height: 340px;
  border-radius: 18px;
  overflow: hidden;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.26);
  transition: transform 200ms ease, border-color 200ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(37, 99, 235, 0.28);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 600ms ease;

  ${Card}:hover & {
    transform: scale(1.07);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 16, 33, 0.12) 0%, rgba(11, 16, 33, 0.82) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #f8fafc;
`;

const Button = styled.button`
  align-self: flex-start;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  cursor: pointer;
  font-weight: 600;
  transition: all 160ms ease;

  &:hover {
    background: rgba(37, 99, 235, 0.18);
    color: #f8fafc;
  }
`;

const Kicker = styled.span`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--muted);
`;

const CategoryItem = ({ item }) => {
  return (
    <Link to={`/products/${item.cat}`}>
      <Card className='glass'>
        <Image src={item.img} alt={item.title} />
        <Overlay>
          <Kicker>Featured</Kicker>
          <Title>{item.title}</Title>
          <Button>Shop this edit</Button>
        </Overlay>
      </Card>
    </Link>
  )
}

export default CategoryItem
