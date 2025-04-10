import { useEffect, useState } from "react"
import { Banner } from "./components/Banner/Banner"
import { Brands } from "./components/Brands/Brands"
import { Categs } from "./components/Categs/Categs"
import { Departments } from "./components/Departments/Departments"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { Partners } from "./components/Partners/Partners"
import { Products } from "./components/Products/Products"

function App() {

  const [productslist, setProductslist] = useState([])

  useEffect(()=>{
    fetch('https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json').then(async(e)=>{
        const list = await e.json()
        setProductslist(list.products)
    })
    }, [])

  return (
    <>
      <Header></Header>
      <Categs></Categs>
      <Banner></Banner>
      <Departments></Departments>
      <Products types={true} productslist={productslist} targetDate="2025-10-01"></Products>
      <Partners name='Parceiros' desc='Lorem ipsum dolor sit amet, consectetur' button='CONFIRA' type='partner'></Partners>
      <Products types={false} productslist={productslist} targetDate="2025-10-01"></Products >
      <Partners name='Produtos' desc='Lorem ipsum dolor sit amet, consectetur' button='CONFIRA' type='product'></Partners>
      <Brands></Brands>
      <Products types={false} productslist={productslist}></Products>
      <Footer></Footer>
    </>
  )
}

export default App
