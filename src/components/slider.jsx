import React, { useState } from 'react'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { useNavigate } from 'react-router-dom'

const Container = styled.section`
  width: 100%;
  height: 72vh;
  margin: 12px 0 32px;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--border);
`;

const Arrow = styled.button`
  width: 48px;
  height: 48px;
  background: color-mix(in srgb, var(--panel) 90%, transparent);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.direction === 'left' ? '18px' : 'auto')};
  right: ${(props) => (props.direction === 'right' ? '18px' : 'auto')};
  cursor: pointer;
  z-index: 2;
  backdrop-filter: blur(8px);
  transition: all 150ms ease;

  &:hover {
    border-color: rgba(37, 99, 235, 0.4);
    transform: translateY(-50%) scale(1.02);
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateX(${(props) => props.slideindex * -100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: clamp(26px, 4vw, 42px);
  background: linear-gradient(140deg, color-mix(in srgb, var(--panel) 80%, transparent), #${(props) => props.bg});
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 78%;
  max-height: 540px;
  object-fit: contain;
  filter: drop-shadow(0 24px 80px rgba(0, 0, 0, 0.2));
`;

const InfoContainer = styled.div`
  flex: 1;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h1`
  font-size: clamp(32px, 5vw, 52px);
  margin: 0;
`;

const Decs = styled.p`
  margin: 0;
  font-size: 16px;
  color: var(--muted);
  line-height: 1.8;
`;

const Button = styled.button`
  width: fit-content;
  padding: 14px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  color: white;
  background: linear-gradient(130deg, var(--accent), var(--accent-2));
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 16px 36px rgba(37, 99, 235, 0.2);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 22px 60px rgba(37, 99, 235, 0.28);
  }
`;

const Meta = styled.span`
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
`;

const Slider = () => {
  const [slideindex, setSlideIndex] = useState(0)
  const navigate = useNavigate()

  const handleDir = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideindex > 0 ? slideindex - 1 : sliderItems.length - 1)
    } else {
      setSlideIndex(slideindex < sliderItems.length - 1 ? slideindex + 1 : 0)
    }
  }

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleDir('left')}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideindex={slideindex}>
        {sliderItems.map((item) => (
          <Slide key={item.id} bg={item.bg}>
            <InfoContainer>
              <Meta>Drop 0{item.id}</Meta>
              <Title>{item.title}</Title>
              <Decs>{item.desc}</Decs>
              <Button onClick={() => navigate('/products')}>Explore the edit</Button>
            </InfoContainer>
            <ImgContainer>
              <Image src={item.img} alt={item.title} />
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleDir('right')}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  )
}
export default Slider
