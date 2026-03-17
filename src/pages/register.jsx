import { useState, useEffect } from 'react'
import styled from 'styled-components'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/apiCalls'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(18px, 4vw, 30px);
  background: var(--bg);
`;

const Card = styled.div`
  width: min(720px, 95vw);
  padding: clamp(26px, 5vw, 40px);
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  margin: 0 0 10px;
`;

const Subtitle = styled.p`
  margin: 0 0 16px;
  color: var(--muted);
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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

  &:focus {
    outline: none;
  }
`;

const Toggle = styled.span`
  padding: 0 12px;
  color: var(--muted);
  cursor: pointer;
`;

const ButtonRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 6px;
`;

const Button = styled.button`
  padding: 12px 18px;
  border-radius: 12px;
  background: linear-gradient(130deg, var(--accent), var(--accent-2));
  color: white;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const LinkText = styled.p`
  text-decoration: underline;
  cursor: pointer;
  color: var(--muted);
`;

const ErrorText = styled.span`
  color: var(--accent-2);
  font-size: 14px;
`;

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser, isFetching, error } = useSelector((state) => state.user)

  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  })

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.username.trim()) nextErrors.username = 'Username required'
    if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email'
    if (form.password.length < 5) nextErrors.password = 'Min 5 characters'
    if (form.password !== form.confirm) nextErrors.confirm = 'Passwords must match'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      try {
        await registerUser(dispatch, {
          username: form.username,
          email: form.email,
          password: form.password,
        })
      } catch (err) {
        setErrors({ api: 'Signup failed. Try again.' })
      }
    }
  }

  return (
    <Container>
      <Card className='glass'>
        <Title>Create account</Title>
        <Subtitle>Save your details for quicker checkout and early access.</Subtitle>
        <Form>
          <Field>
            <Input type='text' placeholder='Username' name='username' value={form.username} onChange={handleChange} />
          </Field>
          <Field>
            <Input type='email' placeholder='Email' name='email' value={form.email} onChange={handleChange} />
          </Field>
          <Field>
            <Input
              type={showPass ? 'text' : 'password'}
              autoComplete='new-password'
              placeholder='Password'
              name='password'
              value={form.password}
              onChange={handleChange}
            />
            <Toggle onClick={() => setShowPass((p) => !p)}>
              {showPass ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </Toggle>
          </Field>
          <Field>
            <Input
              type={showConfirm ? 'text' : 'password'}
              autoComplete='new-password'
              placeholder='Repeat password'
              name='confirm'
              value={form.confirm}
              onChange={handleChange}
            />
            <Toggle onClick={() => setShowConfirm((p) => !p)}>
              {showConfirm ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </Toggle>
          </Field>

          <ButtonRow>
            <Button onClick={handleSubmit} disabled={isFetching}>
              {isFetching ? 'Creating…' : 'Create account'}
            </Button>
            <LinkText onClick={() => navigate('../login')}>Already have an account?</LinkText>
          </ButtonRow>

          <ErrorText>{errors.username || errors.email || errors.password || errors.confirm || errors.api || (error && 'Signup failed. Try again.') || ''}</ErrorText>
        </Form>
      </Card>
    </Container>
  )
}

export default Register
