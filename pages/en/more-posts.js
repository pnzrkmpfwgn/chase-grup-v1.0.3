import { en_posts_url, base_url } from "../../components/urls";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/posts.module.css";
import Loading from "../../components/Loading";
import date from "../../utils/date";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import Error from "../../components/Error";
import Head from 'next/head';

export default function Posts({ enData }) {
  /* I know this looks extremely stupid and actually it's ¯\_(ツ)_/¯ */
  if (enData.error) {
    return <Error data={enData.data} />;
  }
  const [data, setData] = useState({ items: enData });
  const fetchMore = () => {
    const initial = 4;
    setTimeout(() => {
      setData({
        items: enData.slice(0, initial + 4),
      });
    }, 1500);
  };

  return (
    <div id="more_posts" title="More Posts" className={styles.posts}>
      <Head>
      <title>More News</title>
        <meta name="description" content="Chase Grup stepped into the world of finance in 2019, Chase Grup is a Cryptourrency trading center with high quality service, trust worthy business, and low commisions." />
        <meta name="keywords" content="Chasegrup, chasegrup, ChaseGrup, Cyprus, cyprus, Kyrenia, Nicosia, kyrenia, nicosia,  Crpytocurrency, Cypto, Currency,  bitcoin, ethereum, usdt, Bitcoin, Ethereum, USDT, ada, ADA, cardano, Cardano, cryptocurrency,CryptoCurrency" />
      </Head>
      <h3 className={styles.title}> More News </h3>
      {typeof enData != "undefined" ? (
        <InfiniteScroll
          dataLength={enData.length - 1}
          next={fetchMore}
          hasMore={enData[enData.length] === undefined ? false : true}
          loader={<Loading />}
          endMessage={
            <p
              style={{
                marginTop: "20px",
                color: "#e58c17",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {" "}
              End of entries...{" "}
            </p>
          }
        >
          {enData.map((post) => (
            <div className={styles.post} key={post.id}>
              <div className={styles.image_container}>
                <Link href={`/en/posts/${post.id.toString()}`}>
                  <a title={post.title} className={styles.link}>
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
                <Link href={`/en/posts/${post.id.toString()}`}>
                  <a className={styles.link}>{post.title}</a>
                </Link>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div styles={styles.post_stats}>
                  <i
                    className={"far fa-clock"}
                    style={{ marginRight: "10px", color: "white" }}
                  >
                    {" "}
                    {date(post.created_at, "en")}
                  </i>
                  <i className={"far fa-eye"} style={{ color: "white" }}>
                    {" "}
                    {post.views}
                  </i>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const en_data = await fetch(en_posts_url)
      .then((res) => res.json())
      .then((data) => data);
    return {
      props: { enData: en_data.reverse() },
    };
  } catch (error) {
    const en_data = {
      error: true,
      data: error.toString(),
    };
    return {
      props: { enData: en_data },
    };
  }
};
