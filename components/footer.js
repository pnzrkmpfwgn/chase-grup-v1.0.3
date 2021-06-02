import Link from "next/link";
import Image from "next/image";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { base_url, summary_url } from "./urls";
import styles from "./footer.module.css";

export default function Footer() {
  const [data, setData] = useState();
  useEffect(async () => {
    await fetch(summary_url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      {data === undefined ? (
        <Loading />
      ) : (
        <div
          title="Özet Kısmı"
          id="özet_kismi"
        >
          <Image
            src={base_url + data[0].logo[0].url}
            width={310}
            height={90}
          ></Image>
          <p className={styles.text}> {data[0].text} </p>
        </div>
      )}

      <hr style={{ opacity:0.3,width: "30%" }}></hr>
      <div title="Son Yazılar" className={styles.last_entries}>
        <Link href="/">
          <a>lorem</a>
        </Link>
        <Link href="/">
          <a>lorem</a>
        </Link>
        <Link href="/">
          <a>lorem</a>
        </Link>
        <hr style={{opacity:0.3, width: "30%" }}></hr>
      </div>
      <div title="İletişim">
        <address></address>
      </div>
      <hr style={{ width: "80%", opacity: 0.3 }} />
      <footer title="Footer" id="footer" className={styles.footer_section}>
        <small style={{ padding: "15px" }} title="Chase Crypto Exchange">
          Copyright &copy; {new Date().getFullYear()} Chase Crypto Exchange{" "}
        </small>
      </footer>
    </div>
  );
}
