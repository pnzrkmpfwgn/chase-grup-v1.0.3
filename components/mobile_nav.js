import Link from "next/link";
import Image from "next/image";
import styles from "./mobile_nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState,useContext } from "react";
import {Context} from '../context';


export default function Mobile({data,logo}) {
  const {state,dispatch} = useContext(Context)
  const [path,setPath] = useState([]);
  const [pathLogo, setPathLogo] = useState("");
  const [show,setShow] = useState(false);
  const [window, setWindow] = useState(document.body.clientWidth);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(()=>{
    setPath([]);
    if(data!== undefined){
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
  return (
    <>
      <div className={styles.topnav}>
        <div className={styles.logo_icon_dropdown_container}>
          {logo === "" ? (
            <Loading />
          ) : (
            <Link href={pathLogo}><a ><Image
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
            data.menu_item.map((i,index) => {
              return (
                <li className={show ? styles.link + " " + styles.link_open : styles.link} key={i.id}>
                  <Link href={"/" + state.language + "/" + path[index]}><a onClick={()=>setShow(!show)} >{i.title}</a></Link>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
