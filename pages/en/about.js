import Image from "next/image";
import { en_about_url,base_url } from "../../components/urls";
import { useEffect, useState} from "react";
import styles from "../../styles/about.module.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Head from 'next/head';
export default function AboutPage() {

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
  });
  useEffect(async () => {
    try {
      await fetch(en_about_url)
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
    <div id="About" className={styles.container}>
      <Head>
      <title>About</title>
        <meta name="description" content="Chase Grup stepped into the world of finance in 2019, Chase Grup is a Cryptourrency trading center with high quality service, trust worthy business, and low commisions." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Cyprus, cyprus, Kyrenia, Nicosia, kyrenia, nicosia,  Crpytocurrency, Cypto, Currency,  bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
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
      <p title="About Us" id="about_us" className={styles.text} > {typeof info.text != "undefined" && info.text} </p>
      <div className={styles.logos} > {typeof logos !="undefined" ? 
          logos.map(i => {
          return <Image key={i.id} src={base_url + i.url} width={190} height={190}/>
          })
       :<Loading />}</div>
    </div>
  );
}
