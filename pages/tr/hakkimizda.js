import Image from "next/image";
import { tr_about_url,base_url } from "../../components/urls";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import styles from "../../styles/about.module.css";
import Loading from "../../components/Loading";
import Error from '../../components/Error';
import Head from 'next/head';
export default function HakkimizdaPage() {
  const { state, dispatch } = useContext(Context);
  const [info, setInfo] = useState({
    title: "",
    text: "",
  });
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [logos, setLogos] = useState([]);
  const [error, setError] = useState({
    status: false,
    data:""
  })
  useEffect(async () => {
    try {
      await fetch(tr_about_url)
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          title: data[0].title,
          text: data[0].text,
        });
        setImage1(data[0].image1.url);
        setImage2(data[0].image2.url);
        setLogos(data[0].Logos);
      });
    } catch (error) {
      setError({
        status: true,
        data:error.toString()
      })
    }
  }, []);
  if (error.status) {
    return <Error data={error.data} />
  }
  return (
    <div id="Hakkımızda" className={styles.container}>
      <Head>
      <title>Hakkımızda</title>
        <meta name="description" content="Chase grup şirketi, 2019 yılında açılan ofisleri ile faaliyete geçen, kaliteli, güvenilir ve düşük komisyonlar ile Kıbrısın en iyi kripto para alım-satım merkezidir." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Kıbrıs, Girne, Lefkoşa, kibris, lefkosa, girne, kripto para, kripto, para, bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
      </Head>
      <div className={styles.zigzag}></div>
      <h3 className={styles.title} > {typeof info.title !== "undefined" ? info.title : <Loading />} </h3>

      {typeof image1 != "undefined" && typeof image2 != "undefined" ? (
        <div className={styles.images_container}>
          <div><Image src={base_url + image1} width={500} height={300} /></div>
          <div><Image src={base_url + image2} width={500} height={300} /></div>
        </div>
      ) : (
        <Loading />
      )}
      <p id="hakkimizda" title="Hakkımızda" className={styles.text} > {typeof info.text != "undefined" && info.text} </p>
      <div className={styles.logos} > {typeof logos !="undefined" ? 
          logos.map(i => {
          return <Image key={i.id} src={base_url + i.url} width={190} height={190}/>
          })
       :<Loading />}</div>
    </div>
  );
}
