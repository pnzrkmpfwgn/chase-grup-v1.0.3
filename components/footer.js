import Link from "next/link";
import Image from "next/image";
import Loading from "./Loading";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context";
import {
  base_url,
  social_media_url,
  en_summary_url,
  tr_summary_url,
  en_adresses_url,
  tr_adresses_url,
  tr_posts_url,
  en_posts_url,
} from "./urls";
import styles from "./footer.module.css";


export default function FooterSection() {
  const { state, dispatch } = useContext(Context);
  const [socialLinks, setSocialLinks] = useState();
  const [trPost, setTrPost] = useState();
  const [enPost, setEnPost] = useState();
  const [data, setData] = useState();
  const [adress, setAdress] = useState();

  useEffect(async () => {
    const controller = new AbortController();

    await fetch(tr_posts_url, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setTrPost(data.slice(0, 3));
      });

    await fetch(en_posts_url, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setEnPost(data.slice(0, 3));
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(async () => {
    await fetch(social_media_url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSocialLinks(data));
    if (state.language === "tr") {
      await fetch(tr_summary_url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setData(data));
      await fetch(tr_adresses_url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setAdress(data));
    } else {
      await fetch(en_summary_url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setData(data));
      await fetch(en_adresses_url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setAdress(data));
    }
  }, [state.language]);
  return (
    <div className={styles.container}>
      {data === undefined ||
      adress === undefined ||
      socialLinks === undefined ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        <div className={styles.row}>
          <div className={styles.summary} title="Özet Kısmı" id="özet_kismi">
            <Image
              src={base_url + data[0].logo[0].url}
              width={310}
              height={90}
            ></Image>
            <p className={styles.text}>
              {" "}
              {data.map((i) => {
                return i.info;
              })}{" "}
            </p>
          </div>

          <div title="Son Yazılar" className={styles.last_entries}>
            <hr style={{ opacity: 0.3 }}></hr>
            <h3> {state.language === "tr" ? "Son Yazılar" : "Last Posts"} </h3>
            {typeof trPost == "undefined" && typeof enPost == "undefined" ? (
              <Loading />
            ) : (
              <ul className={styles.links} >
                {state.language === "tr"
                  ? trPost.map((post) => (
                      <li key={post.id}>
                        {" "}
                        <Link href={`/tr/posts/${post.id}`}>
                          <a>{post.title}</a>
                        </Link>{" "}
                      </li>
                    ))
                  : enPost.map((post) => (
                      <li key={post.id}>
                        <Link href={`/en/posts/${post.id}`}>
                          <a>{post.title}</a>
                        </Link>
                      </li>
                    ))}
              </ul>
            )}
          </div>
          <div className={styles.contact} title="İletişim">
            <hr style={{ minWidth: "210px", opacity: 0.3 }}></hr>
            <h3>{state.language === "tr" ? "İletişim" : "Contact"}</h3>
            <address>
              {adress.map((i) => {
                return (
                  <div key={i.id}>
                    <strong> {i.communication}:</strong> <p> {i.info} </p>
                  </div>
                );
              })}
            </address>
            <div>
              <a href={socialLinks[0].Facebook}>
                <i
                  className={
                    styles.social_links + " fab fa-facebook-square fa-lg"
                  }
                ></i>
              </a>
              <a href={socialLinks[0].Instagram}>
                <i
                  className={
                    styles.social_links + " fab fa-instagram-square fa-lg"
                  }
                ></i>
              </a>
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
