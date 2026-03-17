import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Annoucment from '../components/annoucment'
import Footer from '../components/footer'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useLocation } from 'react-router-dom'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'
import { publicRequest } from '../requestMerthod'

const Container = styled.main`
  padding: clamp(18px, 4vw, 30px) clamp(16px, 4vw, 32px) 36px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 34px;
  align-items: center;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: clamp(24px, 4vw, 38px);
  box-shadow: var(--shadow);
`;

const ImgContainter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: clamp(260px, 42vw, 420px);
  object-fit: contain;
  width: 100%;
`;

const InfoContainter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
`;

const Desc = styled.p`
  font-size: 16px;
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
`;

const Price = styled.p`
  font-weight: 700;
  font-size: 28px;
  margin: 6px 0 12px;
  color: var(--accent);
`;

const FilterContainter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterTitle = styled.span`
  font-size: 14px;
  color: var(--muted);
  letter-spacing: 0.04em;
`;

const ColorSwatch = styled.button`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  border: ${(props) => (props.active ? '2px solid var(--accent)' : '1px solid var(--border)')};
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const FilterSize = styled.select`
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
`;

const FitlerSizeOption = styled.option``;

const AddContainter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px 10px;
`;

const Amount = styled.span`
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: linear-gradient(130deg, var(--accent), var(--accent-2));
  color: white;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 16px 38px rgba(37, 99, 235, 0.2);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 60px rgba(37, 99, 235, 0.28);
  }
`;

const product = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id)
        setProduct(res.data)
      } catch (error) {
        console.error('Failed to load product', error)
      }
    }
    getProduct()
  }, [id])

  useEffect(() => {
    if (product?.color?.length && !color) {
      setColor(product.color[0])
    }
    if (product?.size?.length && !size) {
      setSize(product.size[0])
    }
  }, [product, color, size])

  const priceValue = useMemo(() => Number(product?.price), [product])
  const hasPrice = Number.isFinite(priceValue)

  const handleCount = (type) => {
    if (type === 'minus') {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    } else {
      setQuantity((prev) => prev + 1)
    }
  }

  const handleClick = () => {
    if (!product) return
    const normalizedPrice = hasPrice ? priceValue : 0
    dispatch(addProduct({ ...product, price: normalizedPrice, quantity, color, size }))
  }

  return (
    <Container>
      <Navbar />
      <Annoucment />
      <Wrapper className='glass'>
        <ImgContainter>
          <Image src={product?.img} alt={product?.title || 'Product image'} />
        </ImgContainter>
        <InfoContainter>
          <Title>{product?.title || 'Loading product...'}</Title>
          <Desc>{product?.desc || 'Discover tailored comfort and sharp details.'}</Desc>
          <Price>{hasPrice ? `$ ${priceValue.toFixed(2)}` : 'New arrival'}</Price>

          <FilterContainter>
            {product?.color?.length ? (
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color.map((c) => (
                  <ColorSwatch key={c} color={c} active={c === color} onClick={() => setColor(c)} />
                ))}
              </Filter>
            ) : null}

            {product?.size?.length ? (
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize value={size} onChange={(e) => setSize(e.target.value)}>
                  {product.size.map((s) => (
                    <FitlerSizeOption key={s} value={s}>
                      {s}
                    </FitlerSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            ) : null}
          </FilterContainter>

          <AddContainter>
            <AmountContainer>
              <RemoveIcon onClick={() => handleCount('minus')} style={{ cursor: 'pointer' }} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleCount('plus')} style={{ cursor: 'pointer' }} />
            </AmountContainer>
            <Button onClick={handleClick} disabled={!product}>
              Add to cart
            </Button>
          </AddContainter>
        </InfoContainter>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default product
