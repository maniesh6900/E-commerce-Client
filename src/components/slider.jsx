import React, { useState } from 'react'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import styled from 'styled-components';
import {sliderItems} from '../data'

const Container = styled.div`
    width: 100%;
    height: 90vh;
    display:flex;
    position: relative;
    overflow: hidden; 
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === 'left' && '10px' };
    right: ${props=> props.direction === 'right' && '10px' };
    margin: auto;
    cursor : pointer;
    opacity: 0.7;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease-in-out;
    transform: translateX(${(props)=> props.slideindex * -100}vw);
    

`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props)=> props.bg}
`;
const ImgContainer = styled.div`
    height: 100%
    flex: 1;
    
`;

const Image = styled.img`
    height: 80%;
   
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;

const  Title = styled.h1`
    font-size: 70px;
`;
const  Decs = styled.p`
    margin: 50xp  0px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 3px


`;
const  Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer; 
`;


const slider = () => {

const [slideindex, setSlideIndex] = useState(0);

const handleDir = (direction) => {
    if(direction === "left"){
        
        setSlideIndex(slideindex > 0 ? slideindex -1 : 2)   
    }else {
       setSlideIndex(slideindex < 2 ? slideindex +1 : 0 )   
    }
}

  return (
    <Container>
       <Arrow direction='left' onClick={()=>handleDir("left")} >
            <ArrowLeftOutlinedIcon  />
       </Arrow>
       <Wrapper  slideindex={slideindex}  >
            {sliderItems.map((item)=> (
                <Slide key={item.id}  bg={item.bg}>
                <ImgContainer>
                    <Image src={item.img} />                    
                </ImgContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Decs>{item.desc}</Decs>
                    <Button>Shop now</Button>
                </InfoContainer>
                </Slide>
        ))}
       </Wrapper>
       <Arrow direction='right' onClick={()=>handleDir("right")}>
            <ArrowRightOutlinedIcon />
       </Arrow  >
    </Container>
  )
}
export default slider