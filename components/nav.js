import Link from "next/link";
import Image from "next/image";
import styles from "./nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { base_url, images_url, nav_url, en_nav_url } from "./urls";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context";
export default function Nav() {
  const { state, dispatch } = useContext(Context);
  const [style, setStyle] = useState({});
  const [logo, setLogo] = useState("");
  const [items, setItems] = useState([]);
  useEffect(async () => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        await fetch(images_url, { method: "GET", signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].Name === "chase_logo") {
                setLogo(data[i].image.url);
              }
            }
          });
        if (state.language === "TR") {
          await fetch(nav_url, { method: "GET", signal: controller.signal })
            .then((res) => res.json())
            .then((data) => {
              setItems(data);
            });
        } else {
          await fetch(en_nav_url, { method: "GET", signal: controller.signal })
            .then((res) => res.json())
            .then((data) => {
              setItems(data);
            });
        }
      } catch (e) {
        console.log("Failed, Error: ", e);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [state.language]);

  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setStyle({
        padding: "0",
      });
    } else {
      setStyle({
        padding: "50px 10px",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav style={style} className={styles.navigation}>
      {logo === "" ? (
        <Loading />
      ) : (
        <Link href="/anasayfa">
          <a>
            <Image src={base_url + logo} width={400} height={100}></Image>
          </a>
        </Link>
      )}
      
        <div>
          <ul className={styles.links_container}>
            {items.length === 0 ? (
              <Loading />
            ) : (
              items.menu_item.map((i) => {
                return (
                  <li key={i.id}>
                    <Link href={"/" + i.page.slug}>
                      <a  className={styles.link}>{i.title}</a>
                    </Link>{" "}
                  </li>
                );
              })
            )}
          </ul>
          
        </div>
    
      <Dropdown />
    </nav>
  );
}
