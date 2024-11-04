import { useState } from 'react';
import styled from 'styled-components'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {login} from "../redux/apiCalls"

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`; 

const Wrapper = styled.div`
    width: 40%;
    padding : 20px;
`; 

const Title = styled.h1``; 

const Form = styled.form`
    display: flex; 
    flex-direction: column;
`; 

const UserContainer  = styled.div`
    border: 3px solid teal;
    margin: 10px 0px;
    border-radius: 4px;
    
`;
    
    
const PassConstainer  = styled.div`
    border: 3px solid teal;
    margin: 15px 0px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
   
    
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: none;
    width: 96.2%;
    
    
    &:focus{
    outline: none;
    }

`; 
const Span = styled.span`
    padding: 0px 5px;
    color: teal;
`;

const Button = styled.button`
    padding : 10px;
    font-size: 14px;
    background-color: teal;
    width: 40%;
    cursor: pointer;
    color: white;
    font-weight: 700;

    &:disabled{
    cursor: not-allowed;
    }
`; 

const Link = styled.p`
    margin : 8px 0px;
    text-decoration: underline;
    cursor: pointer;
`; 

const Login = () => {

const navigate = useNavigate()
const [password, setPassword] = useState("")
const [username, setUsername] = useState("")
const dispatch = useDispatch(); 
const {isFatching, error} = useSelector((state)=>state.user)

const HandleLogin = () => {
    setPassword(!password)
}

const handleClick =  (e) => {
    e.preventDefault();
    console.log("hello")
    login(dispatch, {username, password }); 
}

  return (
    <Container>
        <Wrapper>
            <Title>Login</Title>
            <Form>
            <UserContainer>
            <Input placeholder="UserName"
             onChange={(e)=>setUsername(e.target.value)}
            />
            </UserContainer>   
            <PassConstainer>
                <Input type={password ? "text" : "password"} 
                placeholder="Password" 
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Span 
                onClick={HandleLogin}>
                {password ? <VisibilityOffIcon/> 
                : <RemoveRedEyeIcon/> }
                </Span> 
            </PassConstainer>

            <Button 
            onClick={handleClick} 
            disabled={isFatching}
            >
            Login</Button>
            {error && <span style={{color: "red"}}>Something went wrong..</span> }
            <Link>Don't remember Password</Link>
            <Link 
            onClick={()=>navigate('../register')}
            >
            Create New Account</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login