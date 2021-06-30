import { tr_posts_url,base_url } from "../../components/urls";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/posts.module.css';
import Loading from '../../components/Loading';
import date from '../../utils/date';
import InfiniteScroll from "react-infinite-scroll-component";
import Error from "../../components/Error";
import { useState } from "react";
import Head from 'next/head';

export default function Posts({trData}) {
/* I know this looks extremely stupid and actually it's ¯\_(ツ)_/¯ */
  const [data,setData]=useState({items:trData})
const fetchMore=()=>{
  const initial=4
  setTimeout(()=>{
    setData({
      items:trData.slice(0,initial+4)
    })
  },1500)
  }
  if (trData.error) {
    return <Error data={trData.data} />
  }
  return <div className={styles.posts}>
    <Head>
    <title>Daha fazla Haber</title>
        <meta name="description" content="Chase grup şirketi, 2019 yılında açılan ofisleri ile faaliyete geçen, kaliteli, güvenilir ve düşük komisyonlar ile Kıbrısın en iyi kripto para alım-satım merkezidir." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Kıbrıs, Girne, Lefkoşa, kibris, lefkosa, girne, kripto para, kripto, para, bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
    </Head>
    <h3 className={styles.title} > Daha Fazla Haber </h3>
   {typeof trData != "undefined" ? (
      <div>
          <InfiniteScroll  dataLength={trData.length - 1} next={fetchMore} hasMore={trData[trData.length] === undefined ? false : true} loader={<Loading />} endMessage={<p style={{ marginTop: "20px", color: "#e58c17", fontSize: "24px", fontWeight: "bold" }}> Gönderilerin sonu... </p>} >
              {trData.map((post) => (
              <div className={styles.post} key={post.id}>
                <div className={styles.image_container}>
                <Link href={`/tr/posts/${post.id.toString()}`}>
                  <a className={styles.link} >
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
                  <Link href={`/tr/posts/${post.id}`}><a className={styles.link} >{post.title}</a></Link>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div styles={styles.post_stats}>
                  <i className={"far fa-clock"}style={{ marginRight: "10px",color:"white" }}> {date(post.created_at,"tr")}</i>
                  <i className={"far fa-eye"} style={{color:"white"}} > {post.views}</i>
                </div>
                </div>
              </div>
            ))}
            </InfiniteScroll></div>
            ) : (
              <Loading />
            )}
  </div>
}

export const getStaticProps = async () => {
  try {
    const tr_data = await fetch(tr_posts_url).then(res => res.json()).then(data => data)
    
    return {
      props:{trData:tr_data.reverse()}
    }
  } catch (error) {
    const tr_data = {
      error: true,
      data:error.toString()
    }
    return {
      props:{trData:tr_data}
    }
  }
 
}