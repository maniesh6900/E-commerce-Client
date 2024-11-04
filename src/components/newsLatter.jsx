import React from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';

const Container = styled.div`
    height: 350px;
    display: flex;
    
    align-items: center;
    flex-direction: column;
    background-color: teal; 
`;
const Title = styled.h1`
    font-size: 60px;
    
`;
const Desc = styled.h2`
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 40px;
`;
const EmailContainer = styled.div`
    background-color: white;
    height: 40px;
    width: 70vw;
    display:flex;
    justify-content: space-between;
`;
const Input = styled.input`
    flex : 9;
    border: none;
`;
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: pink;
    color: white;
`;

const NewsLatter = () => {
  return (
    <Container>
        <Title>NewsLetter</Title>
        <Desc>Sign Up for New Updates</Desc>
        <EmailContainer>
            <Input />
            <Button>
                <SendIcon />
            </Button>
        </EmailContainer>
    </Container>
  )
}

export default NewsLatter