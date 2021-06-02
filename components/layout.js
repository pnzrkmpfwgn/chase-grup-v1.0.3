import Coin from "./coin_info";
import Nav from "./nav";
import Footer from "./footer";
import Head from "next/head";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    // <div>
    //   <div>
    //     <ul className={styles.marquee}>
    //       <div> Logo - powered by coin market cap </div>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_1</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_2</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_3</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_4</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_5</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_6</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_7</li>
    //       <hr className={styles.vertical_line} />
    //       <li>coin_8</li>
    //       <hr className={styles.vertical_line} />
    //     </ul>
    //   </div>
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
          crossorigin="anonymous"
        ></link>
      </Head>
      <Coin />
      <Nav />
      {/* <Deneme /> */}
      {children}
      <Footer />
    </>
    // </div>
  );
}
