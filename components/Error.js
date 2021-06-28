import styles from "./error.module.css";
import { useContext } from "react";
import { Context } from "../context";
export default function Error({ data }) {
    const { state, dispatch } = useContext(Context);
    console.log(data);
  return (
    <div className={styles.full_screen}>
      <div className={styles.container}>
        <span className={styles.error_num}>5</span>
        <div className={styles.eye}></div>
        <div className={styles.eye}></div>
        <p className={styles.sub_text}>
          {state.language === "tr"
            ? "Oops, bir şeyler yanlış gitti"
            : "Oh eyeballs! Something went wrong. We're to see what happened."}
        </p>
        <p>{data}</p>
      </div>
    </div>
  );
}
