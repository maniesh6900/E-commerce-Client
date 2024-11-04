import { useState } from 'react';
import styled from 'styled-components'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

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

`;
    
    
const PassConstainer  = styled.div`
    flex: 1;    
    border: 3px solid teal;
    margin: 10px 0px;
    border-radius: 4px;
    min-width: 95.5%;
    display: flex;
    justify-content: center;
    align-items: center;
   
    
`;

const Input = styled.input`
    flex: 1;
    padding: 13px;
    border: none;
    width: 94.5%;
    border: 3px solid teal;
    margin-bottom: 15px;
    border-radius: 4px;
    
    &:focus{
    outline: none;
    }

`; 
const InputPass = styled.input`
    flex: 1;
    padding: 13px;
    border: none;

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
`; 

const Link = styled.a`
    margin : 8px 0px;
    text-decoration: underline;
    cursor: pointer;
`; 

const register = () => {
const [password, setPassword] = useState("")
const [password2, setPassword2] = useState("")
const [value, setValue] = useState({mail:"",password: "",})
const [erorrs , setEorrs]  = useState({mail: false, password: false,})
const navigate = useNavigate();

const handleLogin = () => {
    setPassword(!password)
}
const handleLogin2 = () => {
    setPassword2(!password2)
}



const handlechange =(e) => {
    setValue(e = {...value,
        [e.target.name]: e.target.value
    })

}


const PrintValues = (e)=>{
    e.preventDefault();
 
    const user_mail = value.mail;
    const user_pass = value.password;

    if (user_mail <5) {
        setEorrs((e) => ({
            ...e,
            mail: true,
        }))
    }
    
    if (user_pass < 5) {
        setEorrs((e)=> ({
            ...e,
            password: true,
        }))
    }

    console.log(value);
    
  
}


  return (
    <Container>
        <Wrapper>
            <Title>Sign Up</Title>
            <Form>
            <UserContainer>
            <Input type='text' placeholder="Full Name" />
            <Input type='number' placeholder="Number" />
            <Input type='number' placeholder="age" />
            <Input type='text' placeholder="Gmail" name='mail' onChange={handlechange} />
            <span>{erorrs.mail && "invailid mail"} </span>
            </UserContainer>   
            <PassConstainer>
                <InputPass type={password ? "text" : "password"} autoComplete='false' placeholder="Password" name='password' onChange={handlechange} />
                <Span onClick={handleLogin}>{password ? <VisibilityOffIcon/> : <RemoveRedEyeIcon/> }</Span>
            </PassConstainer>
            <PassConstainer>
                <InputPass type={password2 ? "text" : "password"} autoComplete='false' placeholder="Repeat Password" name='password' onChange={handlechange} />
                <Span onClick={handleLogin2}>{password2 ? <VisibilityOffIcon/> : <RemoveRedEyeIcon/> }</Span> 
            </PassConstainer>
            <Link onClick={()=>navigate('../login')}>Alreary Have Account</Link>
            </Form>
            <Button onClick={PrintValues}>Login</Button>

        </Wrapper>
    </Container>
  )
}

export default register