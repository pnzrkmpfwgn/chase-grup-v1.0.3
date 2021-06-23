import { tr_posts_url,base_url } from "../../components/urls";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/posts.module.css';
import Loading from '../../components/Loading';
import date from '../../utils/date';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function Posts({trData}) {
/* I know this looks extremely stupid and actually it's ¯\_(ツ)_/¯ */
  const [data,setData]=useState({items:trData.slice(0,4)})
const fetchMore=()=>{
  const initial=4
  setTimeout(()=>{
    setData({
      items:trData.slice(0,initial+4)
    })
  },1500)
}
  return <div className={styles.posts}>
    <h3 className={styles.title} > Daha Fazla Haber </h3>
   {typeof trData != "undefined" ? (
              <InfiniteScroll dataLength={trData.length - 1} next={fetchMore} hasMore={trData[trData.length]===undefined ? false :true } loader={<Loading/>} endMessage={<p style={{marginTop:"20px",color:"#e58c17",fontSize:"24px",fontWeight:"bold"}}> Gönderilerin sonu... </p>} >
                {trData.map((post) => (
                <div className={styles.post} key={post.id}>
                  <div className={styles.image_container}>
                  <Link href={post.slug}>
                    <a className={styles.link} href={post.slug}>
                      <Image
                        className={styles.image}
                        src={
                          post.image.formats.medium === undefined
                            ? base_url + post.image.url
                            : base_url + post.image.formats.medium.url
                        }
                        width={400}
                        height={300}
                      ></Image>
                      
                    </a>
                  </Link>
                  </div>
                  <div className={styles.info_container}>
                    <Link href={post.slug}><a className={styles.link} >{post.title}</a></Link>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div styles={styles.post_stats}>
                    <i className={"far fa-clock"}style={{ marginRight: "10px",color:"white" }}> {date(post.created_at,"tr")}</i>
                    <i className={"far fa-eye"} style={{color:"white"}} > {post.views}</i>
                  </div>
                  </div>
                </div>
              ))}
              </InfiniteScroll>
            ) : (
              <Loading />
            )}
  </div>
}

export const getStaticProps=async()=>{
  const tr_data = await fetch(tr_posts_url).then(res => res.json()).then(data=>data)

  return {
    props:{trData:tr_data.reverse()}
  }
}