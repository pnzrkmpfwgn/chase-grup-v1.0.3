import ReactMarkdown from "react-markdown";
import { base_url, tr_posts_url, en_posts_url } from "../../../components/urls";
import styles from "../../../styles/single_post.module.css";
import date from "../../../utils/date";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../../../context";
export default function Post({ post, errorInfo }) {
  let postDate = "";
  //console.log(post.error);
  console.log(errorInfo)

  if (errorInfo.status) {
    return <Error data={post.data} />;
  } else {
    if (post.created_at) {
      postDate = date(post.created_at, "en");
    }

    return (
      <>
        <div className={styles.container}>
          <h1 className={styles.title}> {post.title} </h1>
          <div className={styles.stats_info}>
            <i style={{ marginRight: "10px" }} className="far fa-clock">
              {" "}
              {postDate}, {post.author} tarafından{" "}
            </i>
            <i className="far fa-eye"> {post.views}</i>
          </div>
          <Image
            src={base_url + post.image.url}
            layout="responsive"
            width={400}
            height={300}
          ></Image>
          <article className={styles.article}>
            <ReactMarkdown>{post.Article}</ReactMarkdown>
          </article>
        </div>
      </>
    );
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await fetch(tr_posts_url + "/" + params.id)
      .then((res) => res.json())
      .then((data) => data);
    const errorInfo = {
      status: false,
      data: "",
    };

    return { props: { post, errorInfo } };
  } catch (error) {
    const post = {
      id: 0,
      Article: "",
      slug: "",
      author: "",
      excerpt: "",
      views: 0,
      category: "",
      published_at: "",
      created_by: {
        id: 1,
        firstname: "",
        lastname: "",
        username: null,
        email: "",
        password: "",
        resetPasswordToken: null,
        registrationToken: null,
        isActive: true,
        blocked: null,
        preferedLanguage: null,
      },
      updated_by: {
        id: 1,
        firstname: "",
        lastname: "",
        username: null,
        email: "",
        password: "",
        resetPasswordToken: null,
        registrationToken: null,
        isActive: true,
        blocked: null,
        preferedLanguage: null,
      },
      created_at: "",
      updated_at: "",
      image: {
        id: 0,
        name: "",
        alternativeText: "",
        caption: "",
        width: 0,
        height: 0,
        formats: {
          thumbnail: {
            name: "",
            hash: "",
            ext: "",
            mime: "",
            width: 0,
            height: 0,
            size: 0,
            path: null,
            url: "",
          },
          large: {
            name: "",
            hash: "",
            ext: "",
            mime: "",
            width: 0,
            height: 0,
            size: 0,
            path: null,
            url: "",
          },
          medium: {
            name: "",
            hash: "",
            ext: "",
            mime: "",
            width: 0,
            height: 0,
            size: 0,
            path: null,
            url: "",
          },
          small: {
            name: "",
            hash: "",
            ext: "",
            mime: "",
            width: 0,
            height: 0,
            size: 0,
            path: null,
            url: "",
          },
        },
        hash: "",
        ext: "",
        mime: "",
        size: 0,
        url: "",
        previewUrl: null,
        provider: "",
        provider_metadata: null,
        created_by: 1,
        updated_by: 1,
        created_at: "",
        updated_at: "",
      },
    };
    const errorInfo = {
      status: true,
      data: error.toString,
    };
    return { props: { post, errorInfo } };
  }
}

export async function getStaticPaths() {
  try {
    const posts = await fetch(tr_posts_url)
      .then((res) => res.json())
      .then((data) => data);

    const paths = posts.map((post) => ({
      params: { id: post.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (error) {
    const paths = [
      {
        params: { id: "17" },
      },
    ];
    return { paths, fallback: true };
  }
}
