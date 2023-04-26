import './Partners.scss'

interface Partner{
    type: string;
    name: string;
    desc: string;
    button: string;
}

const Partner = (props: Partner) => {
    return(
    <div className={props.type == 'partner' ? 'partner' : 'partner product_partner'}>
        <h4>{props.name}</h4>
        <p>{props.desc}</p>
        <button>{props.button}</button>
    </div>
    )
}

export const Partners = (props: Partner)=>{
    return(
        <section className='partners'>
            <Partner name={props.name} desc={props.desc} button={props.button} type={props.type}></Partner>
            <Partner name={props.name} desc={props.desc} button={props.button} type={props.type}></Partner>
        </section>
    )
} 