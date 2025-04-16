import { useEffect, useRef, useState } from 'react'
import './Brands.scss'

const Vtex = ()=>{
    return (
        <li className='brand'>
            <img src="/vtexlogo.png" alt="logo vtex" />
        </li>
    )
}

export const Brands = ()=>{

    const [idatual,setIdatual] = useState(0)
    const [width,setWidth] = useState<number>(window.innerWidth)
    const [maxid,setMaxid] = useState(7-3)

    const scroll = useRef<HTMLUListElement>(document.createElement("ul"))

    useEffect(()=>{
        scroll.current.scrollTo({ left: idatual * 250, behavior: 'smooth' })
        if(width < 1400 && width > 1088){
            setMaxid(7-2)
        }else if(width < 1088 && width > 800){
            setMaxid(7-1)
        }else if(width < 800 && width > 520){
            setMaxid(7)
        }else if(width < 520){
            setMaxid(7+1)
        }
    }, [idatual])

    useEffect(()=>{
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <section className='brands'>
            <h4>Navegue por marcas</h4>
            <ul ref={scroll} className='brands_list'>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <Vtex></Vtex>
                <li className='brand'>
                    <img src="/wake.png" alt="wake" />
                </li>
            </ul>
            <div className='brand_arrows'>
                {idatual != 0 ? 
                <div className='brand_arrow_left' onClick={()=>{
                    if(idatual > 0){
                        setIdatual(idatual-1)
                    }
                }}>
                    <img src="./arrow-brand.png" alt="arrow esquerda" />
                </div>
                :
                <div></div>
                }
                {idatual+1 < maxid ? 
                <div className='brand_arrow_rigth' onClick={()=>{
                    if(idatual+1 < maxid){
                        setIdatual(idatual+1)
                    }
                }}>
                    <img src="./arrow-brand.png" alt="arrow direita" />
                </div>
                :
                <div></div>
                }
            </div>
        </section>
    )
}