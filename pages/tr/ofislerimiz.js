import { useEffect, useState } from "react";
import styles from "../../styles/offices.module.css";
import Loading from "../../components/Loading";
import { offices_url } from "../../components/urls";
import Error from "../../components/Error";
import Head from "next/head";
export default function Ofislerimiz() {
  const [state, setState] = useState();
  const [error, setError] = useState({
    status: false,
    data: "",
  });
  useEffect(async () => {
    const controller = new AbortController();
    try {
      await fetch(offices_url, { method: "GET", signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          setState(data);
        });
    } catch (error) {
      setError({
        status: true,
        data: error.toString(),
      });
    }
  }, []);
  if (error.status) {
    return <Error data={error.data} />;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Ofislerimiz</title>
        <meta
          name="description"
          content="Chase grup şirketi, 2019 yılında açılan ofisleri ile faaliyete geçen, kaliteli, güvenilir ve düşük komisyonlar ile Kıbrısın en iyi kripto para alım-satım merkezidir."
        />
        <meta
          name="keywords"
          content="Chasegrup, chasegrup, ChaseGrup, Kıbrıs, Girne, Lefkoşa, kibris, lefkosa, girne, kripto para, kripto, para, bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency"
        />
      </Head>
      {typeof state != "undefined" ? (
        state.map((i) => (
          <div key={i.id}>
            <h3 className={styles.title}> {i.title} </h3>
            <address>
              <strong className={styles.address}> Adres: </strong>{" "}
              <p> {i.adress.toUpperCase()} </p>
              <strong> Tel(sabit): </strong> <p> {i.landphone} </p>
              {i.mobile === null ? (
                <div>
                  <br /> <br /> <br />
                </div>
              ) : (
                <div>
                  <strong>Tel(Mobil):</strong> <p>{i.mobile}</p>
                </div>
              )}
              <iframe
                className={styles.map}
                loading="lazy"
                style={{ border: "0" }}
                src={`https://www.google.com/maps/embed?pb=!${i.location}`}
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
