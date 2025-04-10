import { useEffect, useRef, useState } from 'react'
import './Brands.scss'

const Vtex = ()=>{
    return (
        <li className='vtex-list-item-0-x-item--brand'>
            <img className='vtex-store-components-3-x-imageElement--brand-logo' src="/vtexlogo.png" alt="logo vtex" />
        </li>
    )
}

export const Brands = ()=>{

    const [idatual,setIdatual] = useState(0)
    const [width,setWidth] = useState<number>(window.innerWidth)
    const [maxid,setMaxid] = useState(7-3)

    const scroll = useRef<HTMLUListElement>(document.createElement("ul"))

    useEffect(()=>{
        const itemWidth = 250; // Largura de cada item da marca
        scroll.current.scrollTo({ left: idatual * itemWidth, behavior: 'smooth' });

        let itemsVisible = 4; // Padrão para telas maiores que 1400
        if(width < 1400 && width >= 1088){
            itemsVisible = 3;
        }else if(width < 1088 && width >= 800){
            itemsVisible = 2;
        }else if(width < 800 && width >= 520){
            itemsVisible = 1;
        }else if(width < 520){
            itemsVisible = 1; // Ou ajuste conforme necessário para telas muito pequenas
        }
        // Assumindo 8 itens no total (index 0 a 7)
        const totalItems = 8;
        setMaxid(totalItems - itemsVisible);

    }, [idatual, width]) // Adicionar width como dependência

    useEffect(()=>{
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // Chamar handleResize inicialmente para definir o maxid correto
        handleResize();

        // Limpar o event listener ao desmontar o componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []) // Remover width das dependências aqui para evitar loop

    const totalItems = 8; // Número total de itens Vtex

    return (
        <section className='vtex-flex-layout-0-x-flexRow--brands-container'>
            <h4 className='vtex-rich-text-0-x-heading--brands-title'>Navegue por marcas</h4>
            <div className='vtex-slider-layout-0-x-sliderLayoutContainer--brands'>
                <ul ref={scroll} className='vtex-list-0-x-list--brands vtex-slider-layout-0-x-sliderTrack--brands'>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                    <Vtex></Vtex>
                </ul>
            </div>
            <div className='vtex-flex-layout-0-x-flexRow--brand-arrows'>
                {idatual > 0 && (
                    <div className='vtex-slider-layout-0-x-arrow--left' onClick={()=>{
                        setIdatual(prevId => Math.max(0, prevId - 1));
                    }}>
                        <img className='vtex-store-components-3-x-imageElement--arrow' src="./arrow-brand.png" alt="arrow esquerda" />
                    </div>
                )}
                {idatual < maxid && (
                    <div className='vtex-slider-layout-0-x-arrow--right' onClick={()=>{
                         // Verifica se o próximo id não excede o número total de itens menos os visíveis
                        setIdatual(prevId => Math.min(maxid, prevId + 1));
                    }}>
                        <img className='vtex-store-components-3-x-imageElement--arrow' src="./arrow-brand.png" alt="arrow direita" />
                    </div>
                )}
            </div>
        </section>
    )
}