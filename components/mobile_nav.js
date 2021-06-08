import Link from "next/link";
import Image from "next/image";
import styles from "./mobile_nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState, useContext } from "react";
import { base_url, nav_url, en_nav_url, images_url } from "./urls";
import { Context } from "../context";


export default function Mobile() {
  const { state, dispatch } = useContext(Context);
  const [show,setShow] = useState(false);
  const [logo, setLogo] = useState("");
  const [data, setData] = useState();
  const [window, setWindow] = useState(document.body.clientWidth);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = () => {
      setWindow(document.body.clientWidth);
    };
    addEventListener("resize", onResize);

    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (window < 769 && window > 425) {
      setDimensions({
        width: 300,
        height: 100,
      });
    }

    if (window < 425) {
      setDimensions({
        width: 200,
        height: 50,
      });
    }
  }, [window]);
  useEffect(async () => {
    const controller = new AbortController();
    await fetch(images_url, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].Name === "chase_logo") {
            setLogo(base_url + data[i].image.url);
          }
        }
      });

    if (state.language === "TR") {
      await fetch(nav_url, { method: "GET", signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setData(data));
    } else {
      await fetch(en_nav_url, { method: "GET", signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    return () => controller.abort();
  }, [state.language]);
  return (
    <>
      <div className={styles.topnav}>
        <div className={styles.logo_icon_dropdown_container}>
          {logo === "" ? (
            <Loading />
          ) : (
            <Link href="/"><a ><Image
            src={logo}
            width={dimensions.width}
            height={dimensions.height}
          /></a></Link>
            
          )}
          <div>
            <i onClick={()=>setShow(!show)} className={styles.icon + " fa fa-bars fa-lg" }></i>
            <Dropdown />
          </div>
        </div>
        <ul>
          {data === undefined ? (
            <Loading />
          ) : (
            data.menu_item.map((i) => {
              return (
                <li className={show ? styles.link + " " + styles.link_open : styles.link} key={i.id}>
                  {i.title}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
