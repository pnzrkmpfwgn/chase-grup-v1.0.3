import Link from 'next/link';
import Image from 'next/image';
import styles from './nav.module.css';
import Loading from './Loading';
import Dropdown from './dropdown';
import {base_url,images_url,nav_url} from './urls';
import {useEffect,useState} from 'react';
export default  function Nav(){
    const [logo,setLogo] = useState("");
    const [items,setItems] = useState([]);
    useEffect(async() => {
        await fetch(images_url).then(res => res.json()).then(data => {
          for(let i = 0;i < data.length;i++){
            if(data[i].Name === "chase_logo"){
              setLogo(data[i].image.url)
            }
          }
        })
        await fetch(nav_url,{method:'GET'}).then(res=>res.json()).then(data=>{
          setItems(data)
        })
    }, [])
    return <nav className={styles.navigation}>
      {logo==="" ? <Loading /> : <Link href="/anasayfa"><a><Image src={base_url+logo} width={400} height={100} ></Image></a></Link>}
    <ul className={styles.links_container}>
      { items.length === 0 ? <Loading /> : items.menu_item.map(i => {
        return <li key={i.id}><Link href={"/"+i.page.slug}><a className={styles.link}>{i.title}</a></Link> </li>
      })}
    </ul>
    <Dropdown />
  </nav>
}
 {/* <li>
        <Link href="/anasayfa">
          <a className={styles.link} >ANASAYFA</a>
        </Link>
      </li>
      <li>
        <Link href="/hakkimizda">
          <a className={styles.link} >HAKKIMIZDA</a>
        </Link>
      </li>
      <li>
        <Link href="/ofislerimiz">
          <a className={styles.link} >OFİSLERİMİZ</a>
        </Link>
      </li>
      <li>
        <Link href="/iletisim">
          <a className={styles.link} >İLETİŞİM</a>
        </Link>
      </li>  */}