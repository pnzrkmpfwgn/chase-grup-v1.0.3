import Link from "next/link";
import Image from "next/image";
import styles from "./mobile_nav.module.css";
import Loading from "./Loading";
import Dropdown from "./dropdown";
import { useEffect, useState,useContext } from "react";
import {Context} from '../context';


export default function Mobile({data,logo}) {
  const {state,dispatch} = useContext(Context)
  const [path,setPath] = useState("");
  const [show,setShow] = useState(false);
  const [window, setWindow] = useState(document.body.clientWidth);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(()=>{
    if(data!==undefined){
      for(let i = 0 ; i < data.menu_item.length;i++){
        if(data.menu_item[i].title === "Anasayfa" || data.menu_item[i].title === "Main Menu"){
          setPath("/"+state.language+"/"+data.menu_item[i].page.slug);
        }
      }
    }
  },[state.language])
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
            <Link href={path}><a ><Image
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
                  <Link href={"/"+state.language+"/"+i.page.slug}><a onClick={()=>setShow(!show)} >{i.title}</a></Link>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
