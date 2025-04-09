import { useEffect, useRef, useState } from 'react'
import './Products.scss'

interface Product {
    img: string;
    desc: string;
    price: number;
}

const Product = (props: Product)=>{

    const [modal,setModal] = useState(false)

    return (
        <>
        {modal == true ?
        <>
        <div className='product_modal_bg' onClick={()=>setModal(false)}></div>
        <div className='product_modal'>
            <img src={props.img} alt={props.desc} />
            <div className='content'>
                <span className='product_name'>{props.desc}</span>
                <span className='product_price'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}</span>
                <span className='product_desc'>Many desktop publishing packages and web page editors now many desktop publishing</span>
                <a href="" className='product_more'>Veja mais detalhes do produto {'>'}</a>
            </div>
            <img src="./close.png" alt="fechar" className='product_close' onClick={()=>setModal(false)}/>
        </div>
        </>
        : <></>}
        <li className='product'>
            <img src={props.img} alt={props.desc} />
            <p className='product_name'>{props.desc}</p>
            <p className='product_price'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price + 200)}</p>
            <p className='product_pricedesc'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}</p>
            <p className='product_parc'>ou 2x de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price/2)} sem juros</p>
            <p className='product_frete'>Frete gratis</p>
            <button onClick={()=>{
                setModal(true)
            }}>Comprar</button>
        </li>
        </>
    )
}

interface Products {
    productslist: Array<Object>;
    types: boolean;
}

export const Products = (props: Products) => {

    const [idatual,setIdatual] = useState(0)
    const [maxid,setMaxid] = useState(0)
    const [productslist, setProductslist] = useState<Array<Object>>([])
    const [width,setWidth] = useState(window.innerWidth)

    const scroll = useRef<HTMLUListElement>(document.createElement("ul"))

    useEffect(()=>{
        setProductslist(props.productslist)
    }, [props.productslist])

    useEffect(()=>{
        setMaxid(productslist.length-4)

    }, [productslist])

    useEffect(()=>{
        scroll.current.scrollTo(idatual * 330, 0)
        if(width < 1400 && width > 1040){
            setMaxid(productslist.length-3)
        }else if(width < 1040 && width > 700){
            setMaxid(productslist.length-2)
        }else if(width < 700 && width > 354){
            setMaxid(productslist.length-1)
        }else if(width < 354){
            setMaxid(productslist.length)
        }
    }, [idatual, width, productslist.length]) // Added dependencies

    useEffect(()=>{
        const handleResize = () => { // Named function for clarity
            setWidth(window.innerWidth)
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial width check

        return () => { // Cleanup function
            window.removeEventListener('resize', handleResize);
        }
    }, []) // Empty dependency array ensures this runs only once on mount and cleans up on unmount

    let i = 0

    return (
        <section className="products">
            <div className='products_line'></div>
            <h1>Combo de produtos</h1>
            {props.types == true ?
            <div className='products_categorias'>
                <ul>
                    <li className='select'>CELULAR</li>
                    <li>ACESSÓRIOS</li>
                    <li>TABLETS</li>
                    <li>NOTEBOOKS</li>
                    <li>TVS</li>
                    <li>VER TODOS</li>
                </ul>
            </div>
            :
            <p>Ver todos</p>
            }
            <div className='products_list'>
                <img src="/arrow.png" alt="arrow esquerda" className='products_arrowleft' style={idatual === 0 ? {visibility: 'hidden'} : {}} onClick={()=>{ // Use strict equality
                    if(idatual > 0){ // Simplified logic
                        setIdatual(idatual-1)
                    }
                }} />
                <ul ref={scroll}>
                    {productslist.map((e: any, index: number)=>{ // Use index as key if no unique id is available
                        return <Product key={index} img={e.photo} desc={e.descriptionShort} price={e.price}></Product>
                    })}
                </ul>
                <img src="/arrow.png" alt="arrow direita" style={idatual >= maxid ? {visibility: 'hidden'} : {}} className='products_arrowright' onClick={()=>{ // Use strict equality and check >=
                    if(idatual < maxid){ // Simplified logic
                        setIdatual(idatual+1)
                    }
                }} />
            </div>
        </section>
    )
}