import React, { createContext, useEffect, useMemo, useState } from 'react'
import Home from './pages/home'
import ProductList from './pages/productList'
import Product from './pages/product'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/cart'
import Pay from './pages/pay'
import Success from './pages/success'
import Error from './pages/Error'
import Orders from './pages/orders'
import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

function App() {
  const user = useSelector((state) => state.user.currentUser)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme])

  return (
    <ThemeContext.Provider value={themeValue}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='*' element={<Error />} />
          <Route path='/pay' element={<Pay />} />
          <Route path='/sucsess' element={<Success />} />
          <Route path='/login' element={user ? <Navigate to='/' replace /> : <Login />} />
          <Route path='/register' element={user ? <Navigate to='/' replace /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
