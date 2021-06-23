import {useEffect,useState} from 'react'
import styles from '../../styles/offices.module.css';
import Loading from '../../components/Loading';
import { offices_url } from '../../components/urls'
export default function Ofislerimiz(){
    const [state,setState] = useState();
    useEffect(async()=>{
        const controller = new AbortController();
        await fetch(offices_url,{method:"GET",signal:controller.signal}).then(res => res.json()).then(data=>{
            setState(data);
        })
    },[])
    return <div className={styles.container} >
        {typeof state!="undefined"? 
                state.map(i => <div key={i.id} >
                    <h3 className={styles.title} > {i.title} </h3>
                    <address>
                       <strong className={styles.address} > Adres: </strong> <p> {i.adress.toUpperCase()} </p>
                        <strong> Tel(sabit): </strong> <p> {i.landphone} </p>
                        {i.mobile === null ? <div><br /> <br /> <br /></div> : <div><strong>Tel(Mobil):</strong> <p>{i.mobile}</p></div>}
                        <iframe className={styles.map} loading="lazy" style={{border:"0"}} src={i.location} width="600" height="450" allowFullScreen="allowfullscreen"></iframe>
                    </address>
                </div>) 
        :<Loading  />}
    </div>
}