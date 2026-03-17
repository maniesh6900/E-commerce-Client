import React, { useState } from 'react'
import styled from 'styled-components'
import Annoucment from '../components/annoucment'
import Navbar from '../components/Navbar'
import Products from '../components/products'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'

const Container = styled.main`
  padding: clamp(18px, 4vw, 30px) clamp(16px, 4vw, 32px) 32px;
`;

const Title = styled.h1`
  margin: 10px 0 6px;
  font-size: clamp(26px, 4vw, 34px);
`;

const Subtitle = styled.p`
  margin: 0 0 24px;
  color: var(--muted);
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FilterText = styled.span`
  font-weight: 600;
  color: var(--muted);
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  const [filters, setFilter] = useState({})
  const [sort, setSort] = useState('newest')

  const handleFilter = (e) => {
    const value = e.target.value
    const name = e.target.name
    setFilter((prev) => ({
      ...prev,
      [name]: value === 'all' ? '' : value,
    }))
  }

  return (
    <Container>
      <Navbar />
      <Annoucment />
      <Title>{cat ? cat.toUpperCase() : 'All products'}</Title>
      <Subtitle>Curated essentials and statement pieces, refined weekly.</Subtitle>

      <FilterContainer>
        <FilterGroup>
          <FilterText>Filter</FilterText>
          <Select name='color' onChange={handleFilter} defaultValue='all'>
            <Option value='all'>Color</Option>
            <Option value='red'>Red</Option>
            <Option value='blue'>Blue</Option>
            <Option value='cyan'>Cyan</Option>
            <Option value='black'>Black</Option>
          </Select>
          <Select name='size' onChange={handleFilter} defaultValue='all'>
            <Option value='all'>Size</Option>
            <Option value='XS'>XS</Option>
            <Option value='S'>S</Option>
            <Option value='M'>M</Option>
            <Option value='L'>L</Option>
            <Option value='XL'>XL</Option>
            <Option value='XXL'>XXL</Option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterText>Sort</FilterText>
          <Select onChange={(e) => setSort(e.target.value)} defaultValue='newest'>
            <Option value='newest'>Newest</Option>
            <Option value='asc'>Price — Low to High</Option>
            <Option value='desc'>Price — High to Low</Option>
          </Select>
        </FilterGroup>
      </FilterContainer>

      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </Container>
  )
}

export default ProductList
