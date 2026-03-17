import { useState, useEffect } from 'react'
import styled from 'styled-components'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/apiCalls'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(18px, 4vw, 30px);
  background: var(--bg);
`;

const Card = styled.div`
  width: min(520px, 92vw);
  padding: clamp(24px, 5vw, 36px);
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  margin: 0 0 6px;
`;

const Subtitle = styled.p`
  margin: 0 0 18px;
  color: var(--muted);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Field = styled.div`
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  background: var(--panel);
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const Toggle = styled.span`
  padding: 0 12px;
  color: var(--muted);
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 6px;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(130deg, var(--accent), var(--accent-2));
  color: white;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: transform 150ms ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  margin: 6px 0;
  text-decoration: underline;
  cursor: pointer;
  color: var(--muted);
`;

const ErrorText = styled.span`
  color: var(--accent-2);
`;

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isFetching, error, currentUser } = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password: passwordValue }).catch(() => {})
  }

  return (
    <Container>
      <Card className='glass'>
        <Title>Welcome back</Title>
        <Subtitle>Sign in to access your saved looks and faster checkout.</Subtitle>
        <Form>
          <Field>
            <Input
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <Field>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <Toggle onClick={() => setShowPassword((p) => !p)}>
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </Toggle>
          </Field>

          <Button onClick={handleClick} disabled={isFetching}>
            {isFetching ? 'Signing in...' : 'Login'}
          </Button>
          {error && <ErrorText>Invalid credentials. Try again.</ErrorText>}
          <LinkText onClick={() => navigate('../register')}>Create new account</LinkText>
        </Form>
      </Card>
    </Container>
  )
}

export default Login
