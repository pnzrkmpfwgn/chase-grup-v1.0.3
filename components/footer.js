import Link from "next/link";
import Image from "next/image";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { base_url, summary_url, social_media_url, adresses_url } from "./urls";
import styles from "./footer.module.css";

export default function Footer() {
  const [data, setData] = useState();
  const [socialLinks, setSocialLinks] = useState();
  const [adress, setAdress] = useState();
  useEffect(async () => {
    await fetch(summary_url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    await fetch(adresses_url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAdress(data);
      });
    await fetch(social_media_url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSocialLinks(data);
      });
  }, []);
  console.log(socialLinks[0].Facebook)
  return (
    <div className={styles.container}>
      {data === undefined ||
      adress === undefined ||
      socialLinks === undefined ? (
        <Loading />
      ) : (
        <div className={styles.row}>
          <div className={styles.summary} title="Özet Kısmı" id="özet_kismi">
            <Image
              src={base_url + data[0].logo[0].url}
              width={310}
              height={90}
            ></Image>
            <p className={styles.text}> {data[0].text} </p>
          </div>

          <div title="Son Yazılar" className={styles.last_entries}>
            <hr style={{ opacity: 0.3 }}></hr>
            <h3> Son Yazılar </h3>
            <ul className={styles.links}>
              <li>
                <Link href="/">
                  <a>lorem ipsum dolor sit amet</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>lorem</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>lorem</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.contact} title="İletişim">
            <hr style={{ minWidth: "210px", opacity: 0.3 }}></hr>
            <h3>İletişim</h3>
            <address>
              {adress.map((i) => {
                return (
                  <div>
                    <strong> {i.communication}:</strong> <p> {i.info} </p>
                  </div>
                );
              })}
            </address>
            <div>
              <a href={socialLinks[0].Facebook} ><i className={styles.social_links + " fab fa-facebook-square fa-lg"} ></i></a>
              <a href={socialLinks[0].Instagram}><i className={styles.social_links + " fab fa-instagram-square fa-lg"} ></i></a>
            </div>
          </div>
        </div>
      )}

      <hr style={{ width: "80%", opacity: 0.3 }} />
      <footer title="Footer" id="footer" className={styles.footer_section}>
        <small style={{ padding: "15px" }} title="Chase Crypto Exchange">
          Copyright &copy; {new Date().getFullYear()} Chase Crypto Exchange{" "}
        </small>
      </footer>
    </div>
  );
}
