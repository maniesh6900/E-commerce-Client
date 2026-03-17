import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcment from '../components/annoucment'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMerthod'

const Container = styled.div``
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h1`
  font-weight: 600;
  margin: 0;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GhostButton = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font-weight: 600;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div`
  border: 1px solid var(--border);
  background: var(--panel);
  border-radius: 14px;
  padding: 14px 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.04em;
`;

const Value = styled.span`
  font-weight: 600;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--accent);
  border: 1px solid rgba(37, 99, 235, 0.3);
  width: fit-content;
`;

const Empty = styled.div`
  padding: 24px;
  border: 1px dashed var(--border);
  border-radius: 12px;
  text-align: center;
  color: var(--muted);
`;

const ErrorText = styled.div`
  padding: 12px;
  border: 1px solid #ef4444;
  color: #b91c1c;
  border-radius: 10px;
  background: #fef2f2;
`;

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
      return
    }

    const fetchOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${user._id}`)
        setOrders(res.data || [])
      } catch (err) {
        setError('Could not load your orders right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, navigate])

  const formatDate = (date) => new Date(date).toLocaleDateString()
  const formatMoney = (val) => `$ ${(Number(val) || 0).toFixed(2)}`

  return (
    <Container>
      <Navbar />
      <Announcment />
      <Wrapper>
        <TopBar>
          <Title>Your Orders</Title>
          <GhostButton onClick={() => navigate('/products')}>Continue shopping</GhostButton>
        </TopBar>

        {loading && <Empty>Loading your orders…</Empty>}
        {error && <ErrorText>{error}</ErrorText>}
        {!loading && !error && orders.length === 0 && <Empty>No orders yet.</Empty>}

        <List>
          {orders.map((order) => (
            <Card key={order._id}>
              <Row>
                <Label>Order ID</Label>
                <Value>{order._id}</Value>
              </Row>
              <Row>
                <Label>Date</Label>
                <Value>{formatDate(order.createdAt)}</Value>
              </Row>
              <Row>
                <Label>Status</Label>
                <Tag>{order.status || 'pending'}</Tag>
              </Row>
              <Row>
                <Label>Total</Label>
                <Value>{formatMoney(order.amount)}</Value>
              </Row>
              <Row>
                <Label>Items</Label>
                <Value>{order.products?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0}</Value>
              </Row>
            </Card>
          ))}
        </List>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Orders
