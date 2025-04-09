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
    const [isClient, setIsClient] = useState(false); // Avoid hydration mismatch

    useEffect(() => {
        setIsClient(true); // Component did mount on client
        // Use requestAnimationFrame for smoother updates, falling back to setTimeout
        let animationFrameId: number;
        const updateTimer = () => {
          setTimeLeft(calculateTimeLeft());
          if (+new Date(targetDate) - +new Date() > 0) {
            animationFrameId = requestAnimationFrame(updateTimer);
          }
        };
        animationFrameId = requestAnimationFrame(updateTimer);


        // Clear animation frame on unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, [targetDate]); // Re-run effect if targetDate changes


    const timerComponents: JSX.Element[] = [];

    // Ensure timeLeft is populated and we are on the client before rendering
    if (isClient && Object.keys(timeLeft).length) {
        Object.keys(timeLeft).forEach((interval) => {
            const value = timeLeft[interval as keyof TimeLeft];
            // Check if value is defined and not NaN before rendering
            if (value !== undefined && !isNaN(value)) {
                 timerComponents.push(
                    <div key={interval} className="countdownTimer__item">
                        <span className="countdownTimer__value">{value < 10 ? `0${value}` : value}</span>
                        <span className="countdownTimer__label">{interval.charAt(0)}</span> {/* d, h, m, s */}
                    </div>
                );
            }
        });
    }


    if (!isClient) {
        // Render placeholder or null on the server/initial render
        // You could render a static version or a placeholder here
        return <div className="countdownTimer"></div>; // Render an empty container server-side
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
    targetDate?: string; // Make targetDate optional
}

export const Products = (props: ProductsProps) => {

    const [idatual,setIdatual] = useState(0)
    const [maxid,setMaxid] = useState(0)
    const [productslist, setProductslist] = useState<Array<Object>>([])
    const [width,setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0) // Initial width check

    const scroll = useRef<HTMLUListElement>(null); // Initialize with null

    useEffect(()=>{
        setProductslist(props.productslist)
    }, [props.productslist])

    useEffect(()=>{
        // Recalculate maxid based on current width and product list
        if (!scroll.current || productslist.length === 0) {
            setMaxid(0);
            return;
        };

        const listWidth = scroll.current.offsetWidth;
        // Assuming all items have roughly the same width, get the first item's width
        const firstItem = scroll.current.querySelector('li');
        const itemWidth = firstItem ? firstItem.offsetWidth : 330; // Default width if no items

        // Calculate how many items fit fully within the container
        const itemsVisible = Math.max(1, Math.floor(listWidth / itemWidth));

        const newMaxId = Math.max(0, productslist.length - itemsVisible);
        setMaxid(newMaxId);

        // Reset idatual if it's out of bounds after resize or list change
        if(idatual > newMaxId) {
            setIdatual(newMaxId);
        }

    }, [productslist, width, idatual, scroll.current]); // Add scroll.current as dependency


    useEffect(() => {
      if (scroll.current) {
        const firstItem = scroll.current.querySelector('li');
        const itemWidth = firstItem ? firstItem.offsetWidth : 330; // Use actual item width if possible
        scroll.current.scrollTo({ left: idatual * itemWidth, behavior: 'smooth' });
      }
    }, [idatual]); // Scroll effect only depends on idatual


    useEffect(()=>{
        // Ensure this runs only on the client
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setWidth(window.innerWidth)
        };
        window.addEventListener('resize', handleResize);
        // No need for handleResize() here, initial width is set in useState

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []) // Empty dependency array ensures this runs only once on mount

    // Memoize product list mapping to avoid unnecessary re-renders
    const productComponents = useMemo(() => (
        productslist.map((e: any, index: number)=>{
             // Ensure key is unique and stable, prefer productId
            const key = e.productId ? `product-${e.productId}` : `product-index-${index}`;
            return <Product key={key} img={e.photo} desc={e.descriptionShort} price={e.price}></Product>
        })
    ), [productslist]);

    return (
        <section className="products">
            <div className='products_line'></div>
            <h1>Combo de produtos selecionados</h1>
            {/* Conditionally render the Countdown Timer only if targetDate is provided */}
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
                       // Use functional update to ensure state consistency
                       setIdatual(prevId => Math.max(0, prevId - 1));
                    }}
                    disabled={idatual === 0} // Disable button when at start
                >
                  <img src="/arrow.png" alt="" /> {/* Alt can be empty for decorative icons inside buttons */}
                </button>
                <ul ref={scroll}>
                   {productComponents}
                </ul>
                <button
                    aria-label="Próximo"
                    className='products_arrowright'
                    style={idatual >= maxid ? {visibility: 'hidden', cursor: 'default'} : {}}
                    onClick={()=>{
                        // Use functional update
                        setIdatual(prevId => Math.min(maxid, prevId + 1));
                    }}
                     disabled={idatual >= maxid} // Disable button when at end
                >
                  <img src="/arrow.png" alt="" /> {/* Alt can be empty */}
                </button>
            </div>
        </section>
    )
}