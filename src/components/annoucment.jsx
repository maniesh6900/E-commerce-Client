import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
    color: white;
    height: 30px;
    background-color: teal;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size; 14px;
    font-weight: 500;
`;

const annoucment = () => {
  return (
    <Container>
        New Sale of the Month is here get 30% off now
    </Container>
  )
}

export default annoucment