import React from 'react'
import styled from "styled-components"
import Annoucment from '../components/annoucment';
import Navbar from '../components/Navbar';
import Products from '../components/products';
import NewsLatter from '../components/newsLatter';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Category } from '../data';


const Container = styled.div`
    
`;

const Title = styled.h1`
    margin: 20px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
`;
const Filter = styled.div`
    
`;

const FilterText = styled.span`
    
`;
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    border: none;
`;
const Option = styled.option`
   
`;



const productList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilter] = useState({})
    const [sort, setSort] = useState({})
    
    const handleFilter =(e)=>{
        setFilter({...filters,
            [e.target.name]: e.target.value
        })
    }
  

  return (
      <Container>
        <Navbar />
        <Annoucment />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Fitler Product: </FilterText>
                <Select name="color" onChange={handleFilter}>
                    <Option>Color</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>cyan</Option>
                    <Option>black</Option>
                </Select>
                <Select name="size" onChange={handleFilter}>
                    <Option>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                    <Option>XXL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Procduct: </FilterText>
                <Select onChange={(e)=> setSort(e.target.value)}>
                    <Option value="">FILTER</Option>
                    <Option value="Newest" >Newest</Option>
                    <Option value="acd" >High to Low</Option>
                    <Option value="des" >Low to High</Option>
                </Select> 
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <NewsLatter />
        <Footer />
    </Container>
  )
}

export default productList
     