import './Departments.scss'

interface Departament {
    class?: string;
    img: string;
    alt: string;
    classp?: string ;
    text: string;

}

const Departament = (props: Departament)=>{
    return(
    <div className='departments_box'>
        <div className={'departments_box_img ' + props.class}>
            <img src={props.img} alt={props.alt} />
        </div>
        <p className={props.classp}>{props.text}</p>
    </div>
    )
}

export const Departments = ()=>{
    return (
        <section className='departments'>
            <Departament class='select' img='/departaments/tec.png' alt='tecnologia' classp='select_p' text='Tecnologia'></Departament>
            <Departament img='/departaments/market.png' alt='supermercado' text='Supermercado'></Departament>
            <Departament img='/departaments/whiskey.png' alt='bebidas' text='Bebidas'></Departament>
            <Departament img='/departaments/ferramentas.png' alt='ferramentas' text='Ferramentas'></Departament>
            <Departament img='/departaments/saude.png' alt='saude' text='Saúde'></Departament>
            <Departament img='/departaments/corrida.png' alt='Esportes e Fitness' text='Esportes e Fitness'></Departament>
            <Departament img='/departaments/moda.png' alt='moda' text='Moda'></Departament>
        </section>
    )
}