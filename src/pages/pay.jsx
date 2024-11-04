import { useState, useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import styled from "styled-components";
import axios  from "axios";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
`;
const Button = styled.button`
  height : 90px;
  width: 90px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  color: teal;
  border: none;
`;


const pay = () => {

const KEY = "pk_test_51Q0L4BP8kFU3Mu0OKQ9vEyusLun08mL1l4a0Vr2DissxPA4rUpT9zqes7kVXk64YjrWv9nANjKA6buZ26b3D7zCi00wpdPfhE5"
const navigate = useNavigate();
const [stripeToken, setStripeToken] = useState(null);

const onToken = (token) =>{
  setStripeToken(token)         
}

useEffect(() => {
  const makeRequest = async () =>{
    try {
      const res = await axios.post('http://localhost:4000/payment',
        {
        tokenId: stripeToken.id,
        amount: 2000,
      });
      console.log(res.data);
      navigate('/success')
      } catch (err) {
      console.log(err)
      }};
    stripeToken && makeRequest();
  },[stripeToken]);

  return (
    <Container>
      {stripeToken ? (<span>processing Please wait ...</span>) : (
        <StripeCheckout
        name="THIEF'S"
        image="vite.svg"
        billingAddress
        shippingAddress
        description = "Your total is $20"
        amount = {2000}
        token = {onToken}
        stripeKey={KEY}
        >
        <Button>Pay</Button>
        </StripeCheckout>
      )}
    </Container>
    

  )
}

export default pay