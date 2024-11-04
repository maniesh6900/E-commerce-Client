import React from 'react'
import Navbar from '../components/Navbar'
import Annoucment from '../components/annoucment'
import Slider from '../components/slider'
import Categories from '../components/categories'
import Product from '../components/products'
import NewsLatter from '../components/newsLatter'
import Footer from '../components/footer'


const home = () => {
  return (
    <div>
        <Annoucment />
        <Navbar />
        <Slider />
        <Categories />
        <Product />
        <NewsLatter />
        <Footer />
    </div>
  )
}

export default home