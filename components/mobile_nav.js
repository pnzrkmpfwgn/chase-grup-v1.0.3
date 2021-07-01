import Link from "next/link";
import Loading from "./Loading";
import Image from "next/image";
import Dropdown from "./dropdown";
import styles from "./mobile_nav.module.css";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import { motion } from "framer-motion";
/* array veya objeyi map ile renderlarken onClick kullanan zavallı ruha sesleniyorum başka bir fonsksiyona ata onu onClick ile execute et */
/* To poor soul who is rendering with map and using onClick and changing state with it just form another function and execute it on onClick via arrow function */

export default function Mobile({ logo, trData, enData, trPath, enPath }) {
  const { state, dispatch } = useContext(Context);
  const [index, setIndex] = useState();
  const [show, setShow] = useState(false);
  const [window, setWindow] = useState(document.body.clientWidth);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (trData !== undefined || enData !== undefined) {
      if (typeof index === "undefined") {
        return;
      }
      if (state.language === "tr") {
        router.push("/tr/" + trData.menu_item[index].page.slug);
      }
      if (state.language === "en") {
        router.push("/en/" + enData.menu_item[index].en_page.slug);
      }
    }
  }, [state.language]);

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

  const onClickHandler = (e) => {
    setShow(!open);
    setIndex(e);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <div className={styles.topnav}>
        <div className={styles.logo_icon_dropdown_container}>
          {logo === "" ? (
            <Loading />
          ) : (
            <Link href={state.language === "tr" ? trPath : enPath}>
              <a>
                <Image
                  src={logo}
                  width={dimensions.width}
                    height={dimensions.height}
                    alt="Logo"
                    id="Logo"
                    title="Logo"
                ></Image>
              </a>
            </Link>
          )}
          <div>
            <i
              onClick={() => setShow(!show)}
              className={styles.icon + " fa fa-bars fa-lg"}
            ></i>
            <Dropdown />
          </div>
        </div>
        <ul>
          {trData === undefined && enData === undefined ? (
            <Loading />
          ) : state.language === "tr" ? (
            trData.menu_item.map((i, index) => {
              return show ? (
                <li
                  className={
                    show ? styles.link + " " + styles.link_open : styles.link
                  }
                  key={i.id}
                >
                  <Link href={"/" + state.language + "/" + i.page.slug}>
                    <a id={i.title} title={i.title} onClick={() => onClickHandler(index)}>{i.title}</a>
                  </Link>
                </li>
              ) : null;
            })
          ) : (
            enData.menu_item.map((i, index) => {
              return show ? (
                <li
                  className={
                    show ? styles.link + " " + styles.link_open : styles.link
                  }
                  key={i.id}
                >
                  <Link href={"/" + state.language + "/" + i.en_page.slug}>
                    <a id={i.title} title={i.title} onClick={() => onClickHandler(index)}>{i.title}</a>
                  </Link>
                </li>
              ) : null;
            })
          )}
        </ul>
      </div>
    </motion.div>
  );
}
