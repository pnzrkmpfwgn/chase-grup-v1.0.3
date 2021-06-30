import { useEffect, useState } from "react";
import styles from "../../styles/offices.module.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { en_offices_url } from "../../components/urls";
import Head from 'next/head';
export default function Ofislerimiz() {
  const [state, setState] = useState();
  const [error, setError] = useState({
    status: false,
    data: "",
  });
  useEffect(async () => {
    const controller = new AbortController();
    try {
      await fetch(en_offices_url, { method: "GET", signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          setState(data);
        });
    } catch (error) {
      setError({
        status: true,
        data: error,
      });
    }
    return () => {
      controller.abort();
    };
  }, []);
  if (error.status) {
    return <Error data={error.data} />;
  }
  return (
    <div className={styles.container}>
      <Head>
      <title>Our Offices</title>
        <meta name="description" content="Chase Grup stepped into the world of finance in 2019, Chase Grup is a Cryptourrency trading center with high quality service, trust worthy business, and low commisions." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Cyprus, cyprus, Kyrenia, Nicosia, kyrenia, nicosia,  Crpytocurrency, Cypto, Currency,  bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
      </Head>
      {typeof state != "undefined" ? (
        state.map((i) => (
          <div key={i.id}>
            <h3 className={styles.title}> {i.title.toUpperCase()} </h3>
            <address>
              <strong className={styles.address}> Address: </strong>{" "}
              <p> {i.adress} </p>
              <strong> Landphone: </strong> <p> {i.landphone} </p>
              {i.mobile === null ? (
                <div>
                  <br /> <br /> <br />
                </div>
              ) : (
                <div>
                  <strong>Mobile:</strong> <p>{i.mobile}</p>
                </div>
              )}
              <iframe
                className={styles.map}
                loading="lazy"
                style={{ border: "0" }}
                src={i.location}
                width="600"
                height="450"
                allowFullScreen="allowfullscreen"
              ></iframe>
            </address>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}
