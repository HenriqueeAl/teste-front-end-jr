import { useEffect, useRef, useState, useMemo } from 'react'
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

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        let animationFrameId: number;
        const updateTimer = () => {
          setTimeLeft(calculateTimeLeft());
          if (+new Date(targetDate) - +new Date() > 0) {
            animationFrameId = requestAnimationFrame(updateTimer);
          }
        };
        animationFrameId = requestAnimationFrame(updateTimer);


        return () => cancelAnimationFrame(animationFrameId);
    }, [targetDate]);


    const timerComponents: JSX.Element[] = [];

    if (isClient && Object.keys(timeLeft).length) {
        Object.keys(timeLeft).forEach((interval) => {
            const value = timeLeft[interval as keyof TimeLeft];
            if (value !== undefined && !isNaN(value)) {
                 timerComponents.push(
                    <div key={interval} className="countdownTimer__item">
                        <span className="countdownTimer__value">{value < 10 ? `0${value}` : value}</span>
                        <span className="countdownTimer__label">{interval.charAt(0)}</span>
                    </div>
                );
            }
        });
    }


    if (!isClient) {
        return <div className="countdownTimer" style={{ visibility: 'hidden', height: '0', margin: '0' }}></div>;
    }


    return (
        <div className="countdownTimer">
            {timerComponents.length ? timerComponents : <span className="countdownTimer__expired">Oferta Expirada!</span>}
        </div>
    );
};


interface ProductsProps {
    productslist: Array<Object>;
    types: boolean;
    targetDate?: string;
}

export const Products = (props: ProductsProps) => {

    const [idatual,setIdatual] = useState(0)
    const [maxid,setMaxid] = useState(0)
    const [productslist, setProductslist] = useState<Array<Object>>([])
    const [width,setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

    const scroll = useRef<HTMLUListElement>(null);

    useEffect(()=>{
        setProductslist(props.productslist)
    }, [props.productslist])

    useEffect(()=>{
        if (!scroll.current || productslist.length === 0) {
            setMaxid(0);
            return;
        };

        const listWidth = scroll.current.offsetWidth;
        const firstItem = scroll.current.querySelector('li');
        const itemWidth = firstItem ? firstItem.offsetWidth : 330;
        const gap = firstItem ? parseFloat(window.getComputedStyle(firstItem).marginRight) : 16; // Assuming gap is marginRight
        const effectiveItemWidth = itemWidth + gap;

        const itemsVisible = Math.max(1, Math.floor((listWidth + gap) / effectiveItemWidth));

        const newMaxId = Math.max(0, productslist.length - itemsVisible);
        setMaxid(newMaxId);

        if(idatual > newMaxId) {
            setIdatual(newMaxId);
        }

    }, [productslist, width, idatual, scroll.current]);


    useEffect(() => {
      if (scroll.current) {
        const firstItem = scroll.current.querySelector('li');
        const itemWidth = firstItem ? firstItem.offsetWidth : 330;
        const gap = firstItem ? parseFloat(window.getComputedStyle(firstItem).marginRight) : 16;
        const effectiveItemWidth = itemWidth + gap;
        scroll.current.scrollTo({ left: idatual * effectiveItemWidth, behavior: 'smooth' });
      }
    }, [idatual]);


    useEffect(()=>{
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setWidth(window.innerWidth)
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const productComponents = useMemo(() => (
        productslist.map((e: any, index: number)=>{
            const key = e.productId ? `product-${e.productId}` : `product-index-${index}`;
            return <Product key={key} img={e.photo} desc={e.descriptionShort} price={e.price}></Product>
        })
    ), [productslist]);

    return (
        <section className="products">
            <div className='products_line'></div>
            <h1>Combo de produtos selecionados</h1>
            {props.targetDate && <CountdownTimer targetDate={props.targetDate} />}

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
                <button
                    aria-label="Anterior"
                    className='products_arrowleft'
                    style={idatual === 0 ? {visibility: 'hidden', cursor: 'default'} : {}}
                    onClick={()=>{
                       setIdatual(prevId => Math.max(0, prevId - 1));
                    }}
                    disabled={idatual === 0}
                >
                  <img src="/arrow.png" alt="" />
                </button>
                <ul ref={scroll}>
                   {productComponents}
                </ul>
                <button
                    aria-label="Próximo"
                    className='products_arrowright'
                    style={idatual >= maxid ? {visibility: 'hidden', cursor: 'default'} : {}}
                    onClick={()=>{
                        setIdatual(prevId => Math.min(maxid, prevId + 1));
                    }}
                     disabled={idatual >= maxid}
                >
                  <img src="/arrow.png" alt="" />
                </button>
            </div>
        </section>
    )
}