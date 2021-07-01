import ReactMarkdown from "react-markdown";
import { base_url,en_posts_url } from "../../../components/urls";
import styles from '../../../styles/single_post.module.css';
import date from '../../../utils/date';
import Image from 'next/image'
import Head from 'next/head'

export default function Post({post}){
   const postDate = date(post.created_at,"en")
  return <>
    <Head>
      <title>{post.title}</title>
        <meta name="description" content="Chase Grup stepped into the world of finance in 2019, Chase Grup is a Cryptourrency trading center with high quality service, trust worthy business, and low commisions." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Cyprus, cyprus, Kyrenia, Nicosia, kyrenia, nicosia,  Crpytocurrency, Cypto, Currency,  bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
      </Head>
    <div className={styles.container}>
    <h1 className={styles.title}> {post.title} </h1>
    <div className={styles.stats_info}>
      <i  style={{marginRight:"10px"}} className="far fa-clock" > {postDate}, by {post.author}  </i>
      <i className="far fa-eye"> {post.views}</i>
    </div>
    <Image src={base_url + post.image.url} layout="responsive" width={400} height={300}></Image>
    <article id="article" title="Article" className={styles.article}>
    <ReactMarkdown>
      {post.Article}
    </ReactMarkdown>
    </article>
    </div>
    </>
}

export async function getStaticProps({params}) {
const post = await fetch(en_posts_url + "/" + params.id).then(res => res.json()).then(data => data);

    return{props:{post}}
}

export async function getStaticPaths() {
  const posts = await fetch(en_posts_url).then(res => res.json()).then(data => data);

  const paths =posts.map(post =>({
    params:{id:post.id.toString()}
  }))

  return {paths,fallback:false}
}