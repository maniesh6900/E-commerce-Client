import React, { useEffect, useState } from 'react'
import styled from 'styled-components' 
import Navbar from '../components/Navbar';
import Annoucment from '../components/annoucment';
import NewsLatter from '../components/newsLatter';
import Footer from '../components/footer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { publicRequest } from '../requestMerthod';


const Container = styled.div`

`;
const Wrapper = styled.div`
    display : flex;
    padding: 50px;
`;
const ImgContainter = styled.div`
    flex: 1;
`;

const Image = styled.img`
    height: 400px;
    width:400px;
    margin-left:60px
`;

const InfoContainter = styled.div`
  flex: 1;
  padding : 0px 50px;
`;

const Title = styled.h1`
    font-weight : 200;
`;

const Desc = styled.p`
    font-size: 20px;
`;

const Price = styled.p`
    font-weight : 200;
    font-size: 40px
`;

const FilterContainter = styled.div`
    width: 400px;
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FilterTitle = styled.p`
    font-size : 20px;
    margin-right: 7px;
`;

const FilterColor = styled.p`
    height: 20px;
    width: 20px;
    margin: 0px 5px;
    background-color: ${(props)=> props.color};
    border-radius: 50%;
    cursor: pointer;

`;

const FilterSize = styled.select`
    border: none;
`;

const FitlerSizeOption = styled.option`
    text-align: center;
`;

const AddContainter = styled.div`
    display: flex;
    padding: 20px;
    align-items : center;
    justify-content: space-between;
`;
const AmountContainer = styled.div`
    display: flex ;
    justify-content : center;
    algin-items : center;
    cursor : pointer;
`;
const Amount = styled.span`
    margin : 0px 10px;
    padding: 0px 10px;
    border-radius: 7px;
    border: 2px solid teal;
    display: flex;
    align-items : center;
    justify-content: center;
`;
const Button = styled.button`

  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
    background-color: #f8f4f4;
`;


const product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product , setProduct]  = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
 
    useEffect(()=>{
        const getProduct = async ()=>{
            try {
                const res = await publicRequest.get('/products/find/'+ id) 
                setProduct(res.data)
            } catch (error) {    
            }
        }
        getProduct();
    },[id])

    const handleCount = (type) => {
        if (type =="minus") {
            quantity > 1 && setQuantity((e)=> e - 1)
        }else{
            setQuantity((e)=> e + 1)
        }
    }


    const handleClick = () =>{
        dispatch(
            addProduct({...product, quantity, color, size })
        );
    }


  return (
    <Container>
        <Navbar/>
        <Annoucment/>
        <Wrapper>
        <ImgContainter>
            <Image src={product.img}  />
        </ImgContainter>
        <InfoContainter>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price> INR {product.price} </Price>
        <AddContainter>
            <AmountContainer>
                <RemoveIcon onClick={()=>handleCount("minus")} />
                <Amount>{quantity}</Amount>
                <AddIcon onClick={()=>handleCount("plus")}/>
            </AmountContainer>
            <Button onClick={handleClick}>Add to Cart</Button>
        </AddContainter>


        </InfoContainter>
        </Wrapper>
        <NewsLatter/>
        <Footer/>
    </Container>
  )
}
 
export default product