import Link from "next/link";
import Image from "next/image";
import styles from "./nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";


export default function NavSection({ visible, logo,trData,trPath,enData,enPath}) {
  const { state, dispatch } = useContext(Context);
  const [style, setStyle] = useState({});
  const [index, setIndex] = useState();
  const [logoStyle, setLogoStyle] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!visible) {
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
  }, [visible]);
  useEffect(()=>{
    if(trData !== undefined || enData !== undefined){
      if(typeof index === "undefined"){
        return;
      }
      if(state.language==="tr"){
        router.push("/tr/" + trData.menu_item[index].page.slug)
      }else{
        router.push("/en/" + enData.menu_item[index].en_page.slug)
      }
    }
  },[state.language])
  return (
    <div style={style} className={styles.navigation}>
      {logo === "" ? (
        <Loading />
      ) : (
        <Link href={state.language === "tr" ? trPath : enPath}>
          <a style={logoStyle}>
            <Image src={logo} width={400} height={100} />
          </a>
        </Link>
      )}
      <div>
        <ul className={styles.links_container}>
          {trData === undefined || enData === undefined ? (
            <Loading />
          ) : state.language === "tr" ? (
            trData.menu_item.map((i, index) => {
              return (
                <li key={i.id}>
                  <Link href={"/" + state.language + "/" + i.page.slug}>
                    <a onClick={()=>setIndex(index)} className={styles.link}>{i.title}</a>
                  </Link>
                </li>
              );
            })
          ) : (
            enData.menu_item.map((i, index) => {
              return (
                <li key={i.id}>
                <Link href={"/" + state.language + "/" + i.en_page.slug}>
                  <a onClick={()=>setIndex(index)} className={styles.link}>{i.title}</a>
                </Link>
              </li> 
              );
            })
          )}
        </ul>
      </div>
      <Dropdown />
    </div>
  );
}
