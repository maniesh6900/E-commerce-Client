import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: #0b1021;
  height: 42px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
`;

const Annoucment = () => {
  return (
    <Container>
        New Drop — free shipping this week + 30% off new arrivals
    </Container>
  )
}

export default Annoucment
