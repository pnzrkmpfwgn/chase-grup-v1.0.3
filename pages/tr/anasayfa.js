import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../components/Loading";
import Next from "../../components/nextArrow";
import Previous from "../../components/prevArrow";
import Slider from "react-slick";
import date from '../../utils/date';
import {
  base_url,
  tr_post_url_limited,
  tr_rss_url,
  tr_slides_url,
} from "../../components/urls";
import { useEffect, useState } from "react";

export default function MainMenuPage({ trData }) {
  const [rssData, setRssData] = useState();
  const [slides, setSlides] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    fade: true,
    dots: false,
    arrows: true,
    prevArrow: <Previous />,
    nextArrow: <Next />,
    responsive: [
      {
        breakpoint: 425,
      },
    ],
  };
  useEffect(async () => {
    const controller = new AbortController();
    await fetch(tr_rss_url, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setRssData(data);
      });
    await fetch(tr_slides_url, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setSlides(data[0].sliders);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className={styles.container}>
      <main>
        {typeof slides != undefined ? (
          <Slider className={styles.slider} {...settings}>
            {slides.map((i) => (
              <img
                className={styles.slides}
                key={i.id}
                src={base_url + i.url}
              />
            ))}
          </Slider>
        ) : (
          <Loading />
        )}
      </main>
      <div className={styles.container2}>
        <div className={styles.posts_container}>
          <div>
            <h1
              className={styles.title}
              style={{ color: "white", fontWeight: "bold" }}
            >
              {" "}
              {"KRİPTO PARA HABERLERİ"}{" "}
            </h1>
          </div>
          <div style={{ color: "white" }} className={styles.posts}>
            {typeof trData != "undefined" ? (
              trData.map((post) => (
                <div className={styles.post} key={post.id}>
                  <Link href={`/tr/posts/${post.id}`}>
                    <a className={styles.link}>
                      <Image
                        className={styles.image}
                        src={
                          post.image.formats.medium === undefined
                            ? base_url + post.image.url
                            : base_url + post.image.formats.medium.url
                        }
                        width={400}
                        height={300}
                      ></Image>
                      {post.title}
                    </a>
                  </Link>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div styles={styles.post_stats}>
                    <i className={"far fa-clock"}style={{ marginRight: "10px" }}> {date(post.created_at,"tr")}</i>
                    <i className={"far fa-eye"}> {post.views}</i>
                  </div>
                </div>
              ))
            ) : (
              <Loading />
            )}
          <Link href="/tr/dahafazlaposta"><a className={styles.more_posts} >Daha fazla haber</a></Link>

          </div>
        </div>

        <aside className={styles.aside_content}>
          <div
            className={styles.coin_table + " coinmarketcap-currency-widget"}
            data-currencyid="1"
            data-base="USD"
            data-secondary=""
            data-ticker="true"
            data-rank="true"
            data-marketcap="true"
            data-volume="true"
            data-statsticker="true"
            data-stats="USD"
          ></div>
          
          <div className={styles.rss_content}>
            {" "}
            <hr
              style={{
                width: "1px",
                height: "100%",
                opacity: "0.3",
                marginRight: "20px",
              }}
            />{" "}
            {typeof rssData != "undefined" ? (
              <div>
                <div
                  style={{
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/rss.png"
                    width={14}
                    height={14}
                    alt="rss icon"
                  />{" "}
                  <Link href={rssData.link}>
                    <a>
                      <h5 className={styles.rss_title}>{rssData.title}</h5>
                    </a>
                  </Link>
                </div>
                <ul className={styles.rss_body}>
                  {rssData.items.map((i) => (
                    <li className={styles.item_link} key={i.title}>
                      <Link href={i.url}>
                        <a> {i.title} </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const tr_data = await fetch(tr_post_url_limited)
    .then((res) => res.json())
    .then((data) => data.reverse());

  return {
    props: { trData: tr_data },
  };
};
