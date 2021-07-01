import styles from '../../styles/contact.module.css';
import Loading from '../../components/Loading';
import { contact_url } from "../../components/urls";
import { useEffect, useState } from "react";
import Head from 'next/head';
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
        <Head>
        <title>İletişim</title>
        <meta name="description" content="Chase grup şirketi, 2019 yılında açılan ofisleri ile faaliyete geçen, kaliteli, güvenilir ve düşük komisyonlar ile Kıbrısın en iyi kripto para alım-satım merkezidir." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Kıbrıs, Girne, Lefkoşa, kibris, lefkosa, girne, kripto para, kripto, para, bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
        </Head>
        {typeof state !="undefined" ?
        <div>
            <h2 className={styles.title}>{state[0].title}</h2>
            <hr  />
            <address id="iletisim" title="İletişim">
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