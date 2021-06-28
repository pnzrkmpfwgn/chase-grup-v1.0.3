import styles from '../../styles/contact.module.css';
import Loading from '../../components/Loading';
import { en_contact_url } from "../../components/urls";
import { useEffect, useState } from "react";
import Error from '../../components/Error';
export default function ContactPage(){
    const [state, setState] = useState();
    const [error, setError] = useState({
        status: false,
        data:""
    })
    useEffect(async()=>{
        const controller = new AbortController();
        try {
            await fetch(en_contact_url,{method:"GET",signal:controller.signal}).then(res=>res.json()).then(data=>{
                setState(data)
            })
        } catch (error) {
            setError({
                status: false,
                data:error
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
            <h2 className={styles.title}>{state[0].title.toUpperCase()}</h2>
            <hr  />
            <address>
                <strong>Kyrenia Address :</strong><p>{state[0].address1}</p>
                <strong>Landphone :</strong><p>{state[0].landphone1}</p>
                <strong>Mobile :</strong><p>{state[0].mobile1}</p>
                <strong>Mobile :</strong><p>{state[0].mobile2}</p>
            </address>
            
            <address style={{marginTop:"25px"}} >
            <hr/>   
            <strong>Nicosia Address :</strong><p>{state[0].address2}</p>
            <strong>Landphone :</strong><p>{state[0].landphone2}</p>
            </address>
        </div>
        : <Loading/>}
    </div>
}