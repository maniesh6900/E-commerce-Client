import styled from 'styled-components'
import ProductCard from './productsList'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Grid = styled.section`
  padding: 12px clamp(18px, 4vw, 32px) 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
`;

const Products = ({ cat, filters, sort }) => {
  const [items, setItems] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://e-commerce-backend-8xl7.onrender.com/products?categories=${cat}`
            : "https://e-commerce-backend-8xl7.onrender.com/products"
        )
        setItems(res.data)
      } catch (error) {
        console.error('Unable to fetch products', error)
      }
    }
    getProducts()
  }, [cat])

  useEffect(() => {
    if (cat) {
      setFiltered(
        items.filter((item) =>
          Object.entries(filters || {}).every(([key, value]) =>
            value ? item[key]?.includes?.(value) : true
          )
        )
      )
    } else {
      setFiltered(items)
    }
  }, [items, cat, filters])

  useEffect(() => {
    if (!filtered.length) return
    const sortKey = sort || 'newest'
    setFiltered((prev) => {
      const sorted = [...prev]
      if (sortKey === 'newest') {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (sortKey === 'asc') {
        sorted.sort((a, b) => a.price - b.price)
      } else if (sortKey === 'desc') {
        sorted.sort((a, b) => b.price - a.price)
      }
      return sorted
    })
  }, [sort, filtered.length])

  const list = cat ? filtered : items.slice(0, 8)

  return (
    <Grid>
      {list.map((item) => (
        <ProductCard item={item} key={item._id} />
      ))}
    </Grid>
  )
}

export default Products
