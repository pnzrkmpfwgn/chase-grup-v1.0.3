import FooterSection from "./footer";
import Header from "./Header";
import styles from "./layout.module.css";
import {useOnScreen} from '../utils/hooks';

export default function Layout({ children }) {
  const [ref,visible] = useOnScreen({rootMargin:'-100px'});
  return (
    <>
      <div ref={ref} className={styles.content}></div>
      <Header visible={visible} />
      {children}
      <FooterSection />
    </>
  );
}
