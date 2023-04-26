import { useState } from 'react'
import './Header.scss'

interface Cardsinfos {
    img: string
    alt: string
    calsstextl: string
    textl: string
    calsstextr: string
    textr: string

}

const Cardsinfos = (props: Cardsinfos)=>{
    return(
        <div className='header_infos'>
            <img src={props.img} alt={props.alt} />
            <p className={props.calsstextl}>{props.textl} <span className={props.calsstextr}>{props.textr}</span></p>
        </div>
    )
}

export const Header = ()=>{
    const [menu,setMenu] = useState<Boolean | null>(null);

    return (
        <header>
            <div className='header_top'>
                <Cardsinfos 
                img="/header/safebuy.png"
                alt="safebuy" 
                calsstextl='header_span_gray' textl='Compra' 
                calsstextr='header_span_pink' textr='100% Segura' 
                />
                <Cardsinfos 
                img='/header/free.png'
                alt='free' 
                calsstextl='header_span_pink' textl='Frete gratis' 
                calsstextr='header_span_gray' textr='acima de R$ 200' 
                />
                <Cardsinfos 
                img='/header/credit.png'
                alt='credit' 
                calsstextl='header_span_pink' textl='Parcele' 
                calsstextr='header_span_gray' textr='suas compras' 
                />
            </div>
            <div className='header_bottom'>
                <img src="/vtexlogo.png" alt="vtex logo" />
                <input type="text" placeholder='O que você está buscando?'/>
                <div className='header_bottom_icons'>
                    <ul>
                        <li className='header_storage'><img src="/header/storage.png" alt="estoque"/></li>
                        <li className='header_heart'><img src="/header/heart.png" alt="coração"/></li>
                        <li><img src="/header/profile.png" alt="perfil"/></li>
                        <li><img src="/header/shooping.png" alt="carrinho"/></li>
                    </ul>
                </div>
                <div className='header_mobile'>
                    <img src="/header/menu.png" alt="menu" onClick={()=>{
                        setMenu(true)
                    }}/>
                </div>
            </div>
            
            
            <div className={`header_menu ${menu == true ? "open" : ""} ${menu == false ? "close": ""}`}>
                <img src="close.png" alt="fechar" className='header_close' onClick={()=>{
                    setMenu(false)
                    console.log(menu)
                }}/>
                <div className='header_mobile_icons'>
                    <ul>
                        <li><img src="/header/profile.png" alt="perfil"/></li>
                        <li><img src="/header/shooping.png" alt="carrinho"/></li>
                        <li><img src="/header/heart.png" alt="coração"/></li>
                        <li><img src="/header/storage.png" alt="estoque"/></li>
                    </ul>
                    <input type="text" placeholder='O que você está buscando?'/>
                    <nav className='header_mobile_categs'>
                        <ul>
                            <li><a href='#'>TODAS CATEGORIAS</a></li>
                            <li><a href='#'>SUPERMERCADO</a></li>
                            <li><a href='#'>LIVROS</a></li>
                            <li><a href='#'>MODA</a></li>
                            <li><a href='#'>LANÇAMENTOS</a></li>
                            <li><a href='#' className='select'>OFERTAS DO DIA</a></li>
                            <li><a href='#'><img src="/crow.png" alt="coroa"/> ASSINATURA</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}