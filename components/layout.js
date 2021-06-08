import Footer from "./footer";
import Header from "./Header";
import styles from "./layout.module.css";


export default function Layout({ children }) {
  return (
    <>
      <div className={styles.content}></div>
      <Header />
      {children}
      <Footer />
    </>
  );
}
