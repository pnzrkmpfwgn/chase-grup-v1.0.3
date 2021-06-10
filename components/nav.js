import Link from "next/link";
import Image from "next/image";
import styles from "./nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context";

export default function NavSection({ logo, data, visible }) {
  const { state, dispatch } = useContext(Context);
  const [pathLogo, setPathLogo] = useState("");
  const [path, setPath] = useState("");
  const [style, setStyle] = useState({});
  const [logoStyle, setLogoStyle] = useState({});
  useEffect(()=>{
    if (data!== undefined) {
      //Switch case de kafan karışmış tek bi data türü aynı anda 4 farklı slug gösteremez quantum bilgisayar daha icat olmadı
      for (let i = 0; i < data.menu_item.length; i++) {
        switch(data.menu_item[i].title){
          case "Anasayfa":
            setPathLogo("/" + state.language + "/" + data.menu_item[i].page.slug);
            setPath("/" + state.language + "/" + data.menu_item[i].page.slug);
            break;
          case "Main Menu":
            setPathLogo("/" + state.language + "/" + data.menu_item[i].en_page.slug);
            setPath("/" + state.language + "/" + data.menu_item[i].en_page.slug);
            break;
          case "Hakkımızda":
            setPath("/" + state.language + "/" + data.menu_item[i].page.slug);
            break;
          case "About":
            setPath("/" + state.language + "/" + data.menu_item[i].en_page.slug);
            break;
          case "Ofislerimiz":
            setPath("/" + state.language + "/" + data.menu_item[i].page.slug);
            break;
          case "Our Offices":
            setPath("/" + state.language + "/" + data.menu_item[i].en_page.slug);
            break;
          case "İletişim":
            setPath("/" + state.language + "/" + data.menu_item[i].page.slug);
            break;
          case "Contact":
            setPath("/" + state.language + "/" + data.menu_item[i].en_page.slug);
            break;
          default:
            break;
        }
      }
    }
  },[data])

  useEffect(() => {
    if(!visible){
      setStyle({
        padding: "0",
        fontSize: "20px",
      });
      setLogoStyle({
        transform: "scale(0.6)",
        transition: "0.4s",
      });
    }else {
      setStyle({
        padding: "10px 5px",
        fontSize: "24px",
      });
      setLogoStyle({
        transform: "scale(1)",
        transition: "0.4s",
      });
    }
  }, [visible]);
  return (
    <nav style={style} className={styles.navigation}>
      {logo === "" ? (
        <Loading />
      ) : (
        <Link href={pathLogo}>
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
                  <Link href={path}>
                    <a className={styles.link}>{i.title}</a>
                  </Link>
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
