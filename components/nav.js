import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/router'
import styles from "./nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState, useContext,useRef } from "react";
import { Context } from "../context";

export default function NavSection({ logo, data, visible }) {
  const { state, dispatch } = useContext(Context);
  const [pathLogo, setPathLogo] = useState("");
  const [path, setPath] = useState([]);
  const [style, setStyle] = useState({});
  const [logoStyle, setLogoStyle] = useState({});
  const router = useRouter();

 /*use previous'su burada kullan redirect'ti buradanda trigerlayabiliriz */

  useEffect(()=>{
    setPath([]);
    if (data!== undefined) {
      for (let i = 0; i < data.menu_item.length; i++) {
        if(state.language==="tr"){
          setPath(slugs => [...slugs,data.menu_item[i].page.slug])
        }else{
          setPath(slugs => [...slugs,data.menu_item[i].en_page.slug] )
        }
        if(data.menu_item[i].title === "Anasayfa" ||  data.menu_item[i].title==="Main Menu"){
          if(state.language==="tr"){
            setPathLogo("/" + state.language + "/" + data.menu_item[i].page.slug);
          }else{
            setPathLogo("/" + state.language + "/" + data.menu_item[i].en_page.slug);
          }
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
            data.menu_item.map((i,index) => {
              return (
                <li key={i.id}>
                  <Link href={"/" + state.language + "/" + path[index]}>
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