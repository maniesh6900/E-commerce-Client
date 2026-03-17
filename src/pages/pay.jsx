import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcment from '../components/annoucment'
import Footer from '../components/footer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const Pay = () => {
  const location = useLocation()
  const { stripeData, products } = location.state || {}

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post('https://e-commerce-backend-8xl7.onrender.com/payment/checkout', {
          tokenId: stripeData.id,
          amount: products.total * 100,
        })
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (stripeData) makeRequest()
  }, [stripeData, products])

  return (
    <Container>
      <Navbar />
      <Announcment />
      <Wrapper>
        <Title>Processing payment...</Title>
        <Button disabled>Processing</Button>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Pay
