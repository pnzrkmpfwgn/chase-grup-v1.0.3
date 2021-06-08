import Link from "next/link";
import Image from "next/image";
import styles from "./nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState} from "react";

export default function Nav({ logo, data }) {
  const [style, setStyle] = useState({});
  const [logoStyle, setLogoStyle] = useState({});

  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setStyle({
        padding: "0",
        fontSize: "20px",
      });
      setLogoStyle({
        transform: "scale(0.6)",
        transition: "0.4s",
      });
    } else {
      setStyle({
        padding: "10px 5px",
        fontSize: "24px",
      });
      setLogoStyle({
        transform: "scale(1)",
        transition: "0.4s",
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
          <a style={logoStyle}>
            <Image src={logo} width={400} height={100}></Image>
          </a>
        </Link>
      )}

      <div>
        <ul className={styles.links_container}>
          {data === undefined ? (
            <Loading />
          ) : (
            data.menu_item.map((i) => {
              return (
                <li key={i.id}>
                  <Link href={"/" + i.page.slug}>
                    <a className={styles.link}>{i.title}</a>
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
