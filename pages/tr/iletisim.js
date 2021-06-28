import styles from '../../styles/contact.module.css';
import Loading from '../../components/Loading';
import { contact_url } from "../../components/urls";
import { useEffect,useState } from "react";
export default function ContactPage(){
    const [state, setState] = useState();
    const [error, setError] = useState({
        status: false,
        data:""
    })
    useEffect(async()=>{
        const controller = new AbortController();
        try {
            await fetch(contact_url,{method:"GET",signal:controller.signal}).then(res=>res.json()).then(data=>{
                setState(data)
            })
        } catch (error) {
            setError({
                status:true,
                data:error.toString()
            })
        }
        return ()=>{
            controller.abort();
        }
    }, [])
    if (error.status) {
        return <Error data={error.data} />
    }
    return <div className={styles.container}>
        {typeof state !="undefined" ?
        <div>
            <h2 className={styles.title}>{state[0].title}</h2>
            <hr  />
            <address>
                <strong>Girne Adres :</strong><p>{state[0].address1}</p>
                <strong>Tel(sabit) :</strong><p>{state[0].landphone1}</p>
                <strong>Tel(mobil) :</strong><p>{state[0].mobile1}</p>
                <strong>Tel(mobil) :</strong><p>{state[0].mobile2}</p>
            </address>
            
            <address style={{marginTop:"25px"}} >
            <hr/>   
            <strong>Lefkoşa Adres :</strong><p>{state[0].address2}</p>
            <strong>Tel(sabit) :</strong><p>{state[0].landphone2}</p>
            </address>
        </div>
        : <Loading/>}
    </div>
}