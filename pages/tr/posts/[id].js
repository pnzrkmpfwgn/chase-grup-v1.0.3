import ReactMarkdown from "react-markdown";
import { base_url,tr_posts_url,en_posts_url } from "../../../components/urls";
import styles from '../../../styles/single_post.module.css';
import date from '../../../utils/date';
import Image from 'next/image'
export default function Post({post}){
   const postDate = date(post.created_at,"tr")
    return <>
    <div className={styles.container}>
    <h1 className={styles.title}> {post.title} </h1>
    <div className={styles.stats_info}>
      <i  style={{marginRight:"10px"}} className="far fa-clock" > {postDate},  {post.author} tarafından </i>
      <i className="far fa-eye"> {post.views}</i>
    </div>
    <Image src={base_url + post.image.url} layout="responsive" width={400} height={300}></Image>
    <article className={styles.article}>
    <ReactMarkdown>
      {post.Article}
    </ReactMarkdown>
    </article>
    </div>
    </>
}

export async function getStaticProps({params}) {
const post = await fetch(tr_posts_url + "/" + params.id).then(res => res.json()).then(data => data);

    return{props:{post}}
}

export async function getStaticPaths() {
  const posts = await fetch(tr_posts_url).then(res => res.json()).then(data => data);

  const paths =posts.map(post =>({
    params:{id:post.id.toString()}
  }))

  return {paths,fallback:false}
}