import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from 'next/image';
import Loading from "../../components/Loading";
import Next from "../../components/nextArrow";
import Previous from "../../components/prevArrow";
import Slider from 'react-slick';
import { en_rss_url } from "../../components/urls";
import { useEffect, useState } from "react";
export default function MainMenuPage() {
  const [state, setState] = useState();
  const imageArr = ["slider_1.png","slider_2.png","slider_3.png"];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:8000,
    pauseOnHover:false,
    cssEase:"linear",
    fade:true,
    dots:false,
    arrows:true,
    prevArrow:<Previous />,
    nextArrow:<Next />
  };
  useEffect(async () => {
    const controller = new AbortController();
    await fetch(en_rss_url, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });

    return () => {
      controller.abort();
    };
  }, []);
  console.log(state);
  return (
   <div className={styles.container}>
      <main>
      <Slider {...settings} >
        {imageArr.map(i=><Image width={1920} height={500} src={"/images/"+ i} />)}
      </Slider>
      </main>
      <div className={styles.container2}>
        <div className={styles.posts}>
          <h1 style={{color:"white"}}> POSTS </h1>
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
        <hr style={{ width: "100%", opacity: "0.3" }} />
        <div className={styles.rss_content}>
          {" "}
          <hr style={{ width: "1px", height: "100%", opacity: "0.3",marginRight:"20px" }} />{" "}
          {typeof state != "undefined" ? (
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
                <Link href={state.link}>
                  <a>
                    <h5 className={styles.rss_title}>{state.title}</h5>
                  </a>
                </Link>
              </div>
              <ul>
                {state.items.map((i) => (
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
