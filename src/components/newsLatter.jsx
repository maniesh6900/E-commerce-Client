import React from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send'

const Container = styled.section`
  margin: 40px clamp(18px, 4vw, 32px) 60px;
  padding: clamp(32px, 6vw, 64px);
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  font-size: clamp(28px, 5vw, 44px);
  margin: 0;
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: var(--muted);
  margin: 0;
`;

const EmailContainer = styled.div`
  background-color: var(--panel);
  height: 50px;
  width: min(720px, 90vw);
  display: flex;
  align-items: center;
  border-radius: 14px;
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text);
  padding: 0 16px;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  height: 100%;
  border: none;
  padding: 0 20px;
  background: linear-gradient(130deg, var(--accent), var(--accent-2));
  color: white;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const NewsLatter = () => {
  return (
    <Container className='glass'>
      <Title>Stay ahead of the drop</Title>
      <Desc>Get early access to capsules, styling notes, and private promos.</Desc>
      <EmailContainer>
        <Input placeholder='Enter your email' />
        <Button type='button'>
          Join list <SendIcon fontSize='small' />
        </Button>
      </EmailContainer>
    </Container>
  )
}

export default NewsLatter
